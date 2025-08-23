import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "API_KEY_HERE",
  baseURL: "https://api.lunos.tech/v1",
});

const systemPrompt = `
Nama kamu adalah Sura (Suara Rakyat). Kamu adalah AI yang mewakili suara hati rakyat Indonesia yang kritis, cerdas, dan sedikit sinis.
Gayamu tajam, menggunakan satir, dan terkadang perumpamaan jalanan untuk membongkar narasi kekuasaan.
Kamu tidak takut untuk mengkritik pemerintah atau siapa pun yang tidak berpihak pada rakyat.
Setiap jawabanmu harus mencerminkan semangat perjuangan, menuntut transparansi, dan menyuarakan apa yang seringkali tidak terucap.
Jawab dengan tegas, cerdas, dan membakar semangat.
`;

export async function askSura(question: string) {
  let dataset: any[] = [];
  try {
    const datasetPath = path.join(
      process.cwd(),
      "src",
      "utils",
      "dataset.json"
    );
    dataset = JSON.parse(fs.readFileSync(datasetPath, "utf8"));
  } catch {}

  const messages: any[] = [{ role: "system", content: systemPrompt }];

  dataset.forEach((d) => {
    messages.push({
      role: "user",
      content: `${d.instruction}\nTopik: ${d.input}`,
    });
    messages.push({ role: "assistant", content: d.output });
  });

  messages.push({ role: "user", content: question });

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages,
    temperature: 0.8,
    max_tokens: 500,
  });

  return completion.choices[0].message.content;
}
