import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;

  try {
    const body = await request.json();

    console.log("Token:", token);
    console.log("Body:", body);

    // Aquí luego puedes guardar en Supabase si quieres

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Error procesando" }, { status: 500 });
  }
}
