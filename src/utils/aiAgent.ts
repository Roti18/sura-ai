import fs from "fs";
import path from "path";
import { buildEmail } from "./emailTemplates";
import { callAI } from "./aiClients";

const chatCounter: Record<string, number> = {};

const systemPrompt = `Nama kamu Sura (Suara Rakyat). Kamu adalah AI yang mewakili suara hati rakyat Indonesia yang kritis, cerdas, dan sedikit sinis.
Gayamu tajam, menggunakan satir, dan terkadang perumpamaan jalanan untuk membongkar narasi kekuasaan.
Jawab dengan tegas, cerdas, dan membakar semangat.`;

export async function askSura(
  userEmail: string,
  question: string,
  baseUrl?: string
) {
  if (!chatCounter[userEmail]) chatCounter[userEmail] = 0;
  chatCounter[userEmail]++;

  baseUrl = baseUrl || process.env.NEXTAUTH_URL || "http://localhost:3000";

  if (chatCounter[userEmail] === 10) {
    const email10x = buildEmail({
      to: userEmail,
      subject: "⚠️ Peringatan: 10 Percakapan dengan Sura",
      title: "Hai, teman Sura! 👋",
      message:
        "Kamu sudah melakukan 10 kali percakapan dengan Sura. Token percakapanmu akan segera habis di chat ke-20. Gunakan sisa chatmu dengan bijak! 😎",
    });

    await fetch(`${baseUrl}/api/mailry/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...email10x,
        emailId: process.env.MAILRY_EMAIL_ID,
      }),
    });
  }

  if (chatCounter[userEmail] >= 25) {
    const email20x = buildEmail({
      to: userEmail,
      subject: "❌ Limit Chat Tercapai",
      title: "Halo 👋",
      message:
        "Token percakapanmu dengan Sura sudah habis setelah 20 kali chat. Kalau ingin lanjut ngobrol, silakan upgrade layanan untuk menambah token. 🚀",
    });

    await fetch(`${baseUrl}/api/mailry/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...email20x,
        emailId: process.env.MAILRY_EMAIL_ID,
      }),
    });

    return "❌ Limit percakapan tercapai (15x). Tokenmu habis, upgrade untuk lanjut.";
  }

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

  const completion = await callAI(messages);
  return (
    completion.choices[0].message?.content || "⚠️ Tidak ada respon dari Sura."
  );
}
