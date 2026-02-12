"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";

export default function CreatedPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f48fb1"
    }}>
      <div style={{
        background: "rgba(0,0,0,0.6)",
        padding: 30,
        borderRadius: 20,
        color: "white",
        textAlign: "center"
      }}>
        <h1>💖 Link creado 💖</h1>

        {url && (
          <>
            <p style={{ marginTop: 20 }}>{url}</p>
            <button
              style={{
                marginTop: 20,
                padding: "10px 20px",
                borderRadius: 10,
                background: "#ff4d88",
                color: "white",
                border: "none"
              }}
              onClick={() => navigator.clipboard.writeText(url)}
            >
              Copiar link
            </button>
          </>
        )}
      </div>
    </div>
  );
}
