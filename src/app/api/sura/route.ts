import { NextRequest } from "next/server";
import { askSura } from "@/utils/aiAgent";

function validateApiKey(request: NextRequest) {
  const clientKey =
    request.headers.get("X_CLIENT_KEY") || request.headers.get("x-client-key");
  const expectedKey = process.env.X_CLIENT_KEY;

  if (!expectedKey) {
    throw new Error("X_CLIENT_KEY tidak ditemukan di environment variables");
  }

  if (!clientKey) {
    return {
      valid: false,
      error: "X_CLIENT_KEY header wajib disertakan",
    };
  }

  if (clientKey !== expectedKey) {
    return {
      valid: false,
      error: "X_CLIENT_KEY tidak valid",
    };
  }

  return { valid: true };
}

export async function POST(req: NextRequest) {
  const keyValidation = validateApiKey(req);

  if (!keyValidation.valid) {
    return new Response(
      JSON.stringify({
        error: keyValidation.error,
        status: "Unauthorized",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  let question: string;
  try {
    const body = await req.json();
    question = body.question;
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (!question || question.trim() === "") {
    return new Response(JSON.stringify({ error: "Pertanyaan wajib diisi." }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const answer = await askSura(question);
    return new Response(
      JSON.stringify({
        answer,
        status: "success",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Error calling askSura:", error);
    return new Response(
      JSON.stringify({
        error: "Terjadi kesalahan internal server",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
