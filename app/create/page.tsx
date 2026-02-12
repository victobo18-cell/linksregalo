"use client";

import { useState } from "react";

export default function CreatePage() {
  const [question, setQuestion] = useState("¿Quieres ser mi Valentín? 💘");
  const [message, setMessage] = useState("Me gustas mucho 💖");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  async function createGift() {
    setLoading(true);
    setShareUrl("");

    try {
     const res = await fetch("/api/gifts", {
  method: "POST",
  body: fd,
});
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error");
        return;
      }

      setShareUrl(data.shareUrl);
    } catch (e: any) {
      alert("Error creando link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#e678a3",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "serif",
      color: "white"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1>💌 Crear link</h1>

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ display: "block", margin: "10px auto", padding: 8 }}
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ display: "block", margin: "10px auto", padding: 8 }}
        />

        <input
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", margin: "10px auto", padding: 8 }}
        />

        <button
          onClick={createGift}
          disabled={loading}
          style={{
            marginTop: 10,
            padding: "10px 20px",
            background: "#ff4fa3",
            border: "none",
            borderRadius: 8,
            color: "white",
            cursor: "pointer"
          }}
        >
          {loading ? "Creando..." : "Crear link ✨"}
        </button>

        {shareUrl && (
          <div style={{ marginTop: 20 }}>
            <p>Tu link:</p>
            <a href={shareUrl} target="_blank">{shareUrl}</a>
          </div>
        )}
      </div>
    </div>
  );
}
