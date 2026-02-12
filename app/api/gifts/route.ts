import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const question = formData.get("question");
    const message = formData.get("message");
    const name = formData.get("name");
    const file = formData.get("file");

    console.log("Datos recibidos:", {
      question,
      message,
      name,
      file,
    });

    const token = Math.random().toString(36).substring(2, 10);

    return NextResponse.json({
      ok: true,
      shareUrl: `/g/${token}`,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating gift" },
      { status: 500 }
    );
  }
}
