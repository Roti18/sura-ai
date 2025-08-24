import OpenAI from "openai";

export const lunosClient = new OpenAI({
  apiKey: process.env.LUNOS_API_KEY!,
  baseURL: "https://api.lunos.tech/v1",
});

export const unliClient = new OpenAI({
  apiKey: process.env.UNLI_API_KEY!,
  baseURL: "https://api.unli.dev/v1",
});

export async function callAI(messages: any[]) {
  try {
    return await lunosClient.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      temperature: 0.8,
    });
  } catch (err) {
    console.error("❌ Lunos gagal, fallback ke Unli:", err);
    return await unliClient.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      temperature: 0.8,
      max_tokens: 500,
    });
  }
}
