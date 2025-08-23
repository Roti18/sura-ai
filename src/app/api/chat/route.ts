import { NextRequest, NextResponse } from "next/server";
import { askSura } from "@/utils/aiAgent";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || question.trim() === "") {
      return NextResponse.json(
        { error: "Pertanyaan wajib diisi." },
        { status: 400 }
      );
    }

    const answer = await askSura(question);

    return NextResponse.json({
      answer,
      status: "success",
    });
  } catch (error: any) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      {
        error: "Terjadi kesalahan internal server",
      },
      { status: 500 }
    );
  }
}
