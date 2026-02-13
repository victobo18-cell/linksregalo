"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreatedPage() {
  const searchParams = useSearchParams();
  const [link, setLink] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setLink(`${window.location.origin}/g/${token}`);
    }
  }, [searchParams]);

  if (!link) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        Cargando...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f48fb1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1 style={{ color: "white" }}>💖 Tu link está listo</h1>

      <input
        value={link}
        readOnly
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: "none",
        }}
      />

      <button
        onClick={() => {
          navigator.clipboard.writeText(link);
          alert("Link copiado 💕");
        }}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          background: "#ff4081",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Copiar link
      </button>
    </div>
  );
}
