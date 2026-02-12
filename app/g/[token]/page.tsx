import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function GiftPage({ params }: Props) {
  const { token } = await params;

  if (!token) return notFound();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#ff9ecb,#ff6fa5)",
        color: "white",
        textAlign: "center",
        padding: 20,
      }}
    >
      <div>
        <h1 style={{ fontSize: 36, fontWeight: 800 }}>
          💖 ¡Te enviaron un regalo!
        </h1>

        <p style={{ marginTop: 20, fontSize: 20 }}>
          Token recibido:
        </p>

        <p style={{ marginTop: 10, fontSize: 18 }}>
          {token}
        </p>

        <p style={{ marginTop: 30 }}>
          Aquí después mostraremos la foto y el mensaje.
        </p>
      </div>
    </div>
  );
}
