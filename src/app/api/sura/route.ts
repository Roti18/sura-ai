import { NextRequest } from "next/server";
import { askSura } from "@/utils/aiAgent";

export async function POST(req: NextRequest) {
  const clientKey = req.headers.get("x-client-key");
  if (clientKey !== process.env.SURA_API_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
    });
  }

  const { question } = await req.json();
  if (!question) {
    return new Response(JSON.stringify({ error: "Pertanyaan wajib diisi." }), {
      status: 400,
    });
  }

  try {
    const answer = await askSura(question);
    return new Response(JSON.stringify({ answer }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
