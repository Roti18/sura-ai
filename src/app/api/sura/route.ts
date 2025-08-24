import { NextRequest, NextResponse } from "next/server";
import { askSura } from "@/utils/aiAgent";

function validateApiKey(req: NextRequest) {
  const clientKey =
    req.headers.get("X_CLIENT_KEY") || req.headers.get("x-client-key");
  const expectedKey = process.env.X_CLIENT_KEY;

  if (!expectedKey) throw new Error("X_CLIENT_KEY tidak ditemukan di env");

  if (!clientKey)
    return { valid: false, error: "X_CLIENT_KEY header wajib disertakan" };
  if (clientKey !== expectedKey)
    return { valid: false, error: "X_CLIENT_KEY tidak valid" };

  return { valid: true };
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const keyValidation = validateApiKey(req);
    if (!keyValidation.valid) {
      return NextResponse.json(
        { error: keyValidation.error, status: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const question = body.question;
    const userEmail = body.email || "anon@example.com";

    if (!question || question.trim() === "") {
      return NextResponse.json(
        { error: "Pertanyaan wajib diisi." },
        { status: 400 }
      );
    }

    const answer = await askSura(userEmail, question);

    return NextResponse.json({ answer, status: "success" }, { status: 200 });
  } catch (error: any) {
    console.error("Error calling askSura:", error);
    return NextResponse.json(
      {
        error: "Terjadi kesalahan internal server",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
