import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request, { params }: { params: { token: string } }) {
  const token = params.token;
  const { answer } = await req.json();

  if (answer !== "yes" && answer !== "no") {
    return NextResponse.json({ error: "answer inválido" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("gifts")
    .update({ answered: answer, answered_at: new Date().toISOString() })
    .eq("token", token);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
