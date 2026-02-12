export const dynamic = "force-dynamic";
"use client";

import { useSearchParams } from "next/navigation";

export default function CreatedPage() {
  const searchParams = useSearchParams();
  const link = searchParams.get("link");

  return (
    <>
      <div className="vbg">
        <video
          src="/videos/valentine.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <div className="vshade" />

      <div className="centerStage">
        <div className="overlayBox">
          <h1 className="bigTitle">🎉 Link creado</h1>

          <div className="input" style={{ marginTop: 20 }}>
            {link}
          </div>

          <button
            className="btn btnYes"
            onClick={() => {
              navigator.clipboard.writeText(link || "");
              alert("Link copiado 💖");
            }}
          >
            Copiar link 📋
          </button>

          <a
            href={link || "#"}
            target="_blank"
            className="btn btnYes"
            style={{ marginTop: 10 }}
          >
            Abrir link 💌
          </a>
        </div>
      </div>
    </>
  );
}
