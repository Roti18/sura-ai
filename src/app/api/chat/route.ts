import { NextRequest, NextResponse } from "next/server";
import { askSura } from "@/utils/aiAgent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question?.trim()) {
      return NextResponse.json(
        { error: "Pertanyaan wajib diisi." },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email || "guest";

    // Panggil AI
    const answer = await askSura(userEmail, question);

    return NextResponse.json({
      answer,
      status: "success",
    });
  } catch (err: any) {
    console.error("❌ Error in chat API:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
