import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, htmlBody, plainBody } = await req.json();

    if (!to?.trim() || !subject?.trim() || (!htmlBody && !plainBody)) {
      return NextResponse.json(
        { error: "Email tujuan, subject, dan body wajib diisi." },
        { status: 400 }
      );
    }

    const emailId = process.env.MAILRY_EMAIL_ID;
    if (!emailId) {
      return NextResponse.json(
        { error: "MAILRY_EMAIL_ID belum diset di .env" },
        { status: 500 }
      );
    }

    const sendRes = await fetch("https://api.mailry.co/ext/inbox/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAILRY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailId, to, subject, htmlBody, plainBody }),
    });

    const sendData = await sendRes.json();
    return NextResponse.json({ status: "success", emailData: sendData });
  } catch (err: any) {
    console.error("❌ Error sending email via Mailry:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
