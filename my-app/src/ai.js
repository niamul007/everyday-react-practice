// This file contains the logic for securely calling the Gemini API.

const SYSTEM_PROMPT = `
You are an expert chef assistant. You receive a list of ingredients that a user has and must suggest a recipe they could make with some or all of those ingredients. The recipe can include additional, common pantry ingredients if necessary, but keep the core focus on the user's list. Format your response in clear, easy-to-read markdown with a title, ingredients list, and instructions.
`;

const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

/**
 * Exponential backoff fetch utility to handle transient API errors (e.g., rate limiting).
 */
const exponentialBackoffFetch = async (url, options, maxRetries = 5) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      // Return successful responses immediately. Also return persistent errors (4xx)
      // that won't be resolved by retrying, like 403.
      if (
        response.ok ||
        (response.status >= 400 &&
          response.status < 500 &&
          response.status !== 408)
      ) {
        return response;
      }
      console.error(
        `Attempt ${i + 1} failed with status: ${response.status}. Retrying...`
      );
    } catch (error) {
      console.error(`Attempt ${i + 1} failed with network error:`, error);
    }

    if (i < maxRetries - 1) {
      // Delay increases exponentially (2s, 4s, 8s...) plus jitter
      const delay = Math.pow(2, i) * 1000 + Math.random() * 500;
      // Do not log retries as errors in the console per instruction
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error(
    `Gemini API Failed: Max retries reached after ${maxRetries} attempts.`
  );
};

/**
 * Runs the Gemini inference for recipe generation and logs the result to the console.
 * @param {string} userIngredients - A string of ingredients provided by the user.
 * @returns {Promise<string | null>} The generated recipe text, or null on failure.
 */
export async function runInference(userIngredients) {
  // CRITICAL: The API key is left as an empty string; the environment provides it at runtime securely.
  const apiKey = "AIzaSyCIfr5FssNQMUDIdty0sYJzeznMmOusvMA";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Generate a recipe using these ingredients: ${userIngredients}`,
          },
        ],
      },
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
  };

  try {
    console.log("--- Sending Request to Gemini API... ---");

    // Use the robust fetch with exponential backoff
    const response = await exponentialBackoffFetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Read the response body to find the exact reason for the failure.
      const errorText = await response.text();
      console.error(
        `Gemini API Error Response Body (${response.status}):`,
        errorText
      );
      throw new Error(
        `HTTP error! status: ${response.status}. Check the console logs for the detailed API response error text.`
      );
    }

    const result = await response.json();
    const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (generatedText) {
      // ✅ SUCCESS: Log the model's generated content to the console
      console.log("--- Gemini API Recipe Result ---");
      console.log(generatedText);
      console.log("--------------------------------");
      return generatedText; // Return the text for use in your application
    } else {
      console.error(
        "Gemini API Error: No text content found in response.",
        result
      );
      return null;
    }
  } catch (error) {
    // ❌ ERROR: Log the full error details
    console.error("Inference API Request Failed (Gemini):", error.message);
    return null;
  }
}
