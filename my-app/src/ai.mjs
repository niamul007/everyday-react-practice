import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv"; // <-- Add this
dotenv.config(); // <-- Add this

// Use the React-friendly variable name
const client = new InferenceClient(process.env.REACT_APP_HF_TOKEN); 

async function runInference() {
  if (!process.env.REACT_APP_HF_TOKEN) {
    console.error("ERROR: REACT_APP_HF_TOKEN not found in environment variables.");
    return;
  }
  
  try {
    const chatCompletion = await client.chatCompletion({
      model: "moonshotai/Kimi-K2-Thinking:novita",
      messages: [
        {
          role: "user",
          content: "Tell me your name?",
        },
      ],
    });
    
    console.log(chatCompletion.choices[0].message);

  } catch (error) {
    console.error("Inference API Error:", error.message);
  }
}

runInference();