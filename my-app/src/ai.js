// // This file uses the Google Gemini API for text generation, 
// // which avoids the "process is not defined" error as it relies on 
// // standard browser fetch and uses an environment-provided key.

// const SYSTEM_PROMPT = `
// You are an expert chef assistant. You receive a list of ingredients that a user has and must suggest a recipe they could make with some or all of those ingredients. The recipe can include additional, common pantry ingredients if necessary, but keep the core focus on the user's list. Format your response in clear, easy-to-read markdown with a title, ingredients list, and instructions.
// `;

// const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

// /**
//  * Runs the Gemini inference for recipe generation and logs the result to the console.
//  * @param {string} userIngredients - A string of ingredients provided by the user.
//  */
// export async function runInference(userIngredients) {
//   // The API key is left as an empty string; the environment provides it at runtime.
//   const apiKey = ""; 
//   const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

//   const payload = {
//       contents: [{ 
//           parts: [{ text: `Generate a recipe using these ingredients: ${userIngredients}` }] 
//       }],
//       systemInstruction: {
//           parts: [{ text: SYSTEM_PROMPT }]
//       },
//   };

//   try {
//     console.log("--- Sending Request to Gemini API... ---");
    
//     // Implement exponential backoff for resilience (not fully implemented here, 
//     // but recommended for robust apps)

//     const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
    
//     if (!response.ok) {
//         // --- IMPROVED ERROR HANDLING ---
//         // Read the response body to find the exact reason for the 403 error.
//         const errorText = await response.text();
//         console.error(`Gemini API Error Response Body (${response.status}):`, errorText);
//         throw new Error(`HTTP error! status: ${response.status}. Check the console logs for the detailed API response error text.`);
//         // -------------------------------
//     }

//     const result = await response.json();
//     const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (generatedText) {
//         // ✅ SUCCESS: Log the model's generated content to the console
//         console.log("--- Gemini API Recipe Result ---");
//         console.log(generatedText);
//         console.log("--------------------------------");
//     } else {
//         console.error("Gemini API Error: No text content found in response.", result);
//     }

//   } catch (error) {
//     // ❌ ERROR: Log the full error details
//     console.error("Inference API Request Failed (Gemini):", error.message);
//   }
// }

// This file uses the Google Gemini API for text generation, 
// which avoids the "process is not defined" error as it relies on 
// standard browser fetch and uses an environment-provided key.

const SYSTEM_PROMPT = `
You are an expert chef assistant. You receive a list of ingredients that a user has and must suggest a recipe they could make with some or all of those ingredients. The recipe can include additional, common pantry ingredients if necessary, but keep the core focus on the user's list. Format your response in clear, easy-to-read markdown with a title, ingredients list, and instructions.
`;

const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

/**
 * Exponential backoff fetch utility to handle transient API errors (e.g., rate limiting).
 * It throws an error if max retries are reached or returns a response object immediately 
 * for persistent errors (like 400/403).
 * * @param {string} url - The API URL.
 * @param {object} options - Fetch options (method, headers, body).
 * @param {number} maxRetries - Maximum number of retries.
 * @returns {Promise<Response>} The successful fetch response.
 */
const exponentialBackoffFetch = async (url, options, maxRetries = 5) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            // If response is successful, or it's a client error (4xx) that won't resolve 
            // with retries (like a 403), return it immediately to be handled downstream.
            if (response.ok || (response.status >= 400 && response.status < 500 && response.status !== 408)) {
                return response;
            }
            console.error(`Attempt ${i + 1} failed with status: ${response.status}. Retrying...`);
        } catch (error) {
            console.error(`Attempt ${i + 1} failed with network error:`, error);
        }

        if (i < maxRetries - 1) {
            // Delay increases exponentially (2s, 4s, 8s...) plus jitter
            const delay = Math.pow(2, i) * 1000 + Math.random() * 500;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error(`Gemini API Failed: Max retries reached after ${maxRetries} attempts.`);
};


/**
 * Runs the Gemini inference for recipe generation and logs the result to the console.
 * Includes the CRITICAL API key fix and exponential backoff for resilience.
 * @param {string} userIngredients - A string of ingredients provided by the user.
 * @returns {Promise<string | null>} The generated recipe text, or null on failure.
 */
export async function runInference(userIngredients) {
  // The API key is left as an empty string; the environment provides it at runtime.
  const apiKey = ""; 
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const payload = {
      contents: [{ 
          parts: [{ text: `Generate a recipe using these ingredients: ${userIngredients}` }] 
      }],
      systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
      },
  };

  try {
    console.log("--- Sending Request to Gemini API... ---");
    
    // --- FIX: Using exponentialBackoffFetch for resilience ---
    const response = await exponentialBackoffFetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    // --------------------------------------------------------
    
    if (!response.ok) {
        // --- IMPROVED ERROR HANDLING (Handles persistent errors like 403) ---
        // Read the response body to find the exact reason for the failure.
        const errorText = await response.text();
        console.error(`Gemini API Error Response Body (${response.status}):`, errorText);
        throw new Error(`HTTP error! status: ${response.status}. Check the console logs for the detailed API response error text.`);
        // -------------------------------------------------------------------
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
        console.error("Gemini API Error: No text content found in response.", result);
        return null;
    }

  } catch (error) {
    // ❌ ERROR: Log the full error details
    console.error("Inference API Request Failed (Gemini):", error.message);
    return null;
  }
}