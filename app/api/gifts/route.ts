import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const question = form.get("question") as string;
    const message = form.get("message") as string;
    const name = form.get("name") as string;

    console.log("POST recibido");
    console.log({
      question,
      message,
      name,
    });

    // Generar token único
    const token = crypto.randomBytes(8).toString("hex");

    const site =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    return NextResponse.json({
      shareUrl: `${site}/g/${token}`,
    });
  } catch (err: any) {
    console.error("ERROR API:", err);
    return NextResponse.json(
      { error: err?.message || "Error interno" },
      { status: 500 }
    );
  }
}
