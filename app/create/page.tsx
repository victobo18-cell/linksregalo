"use client";

import { useState } from "react";

export default function CreatePage() {
  const [question, setQuestion] = useState("¿Quieres ser mi Valentín? 💘");
  const [message, setMessage] = useState("Me gustas mucho 💖");
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [shareUrl, setShareUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function createGift() {
    setLoading(true);
    setShareUrl("");

    try {
      const fd = new FormData();
      fd.append("question", question);
      fd.append("message", message);
      fd.append("name", name);
      if (file) fd.append("file", file);

      const res = await fetch("/api/gifts", {
        method: "POST",
        body: fd,
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        alert(data?.error || `Error API status ${res.status}`);
        return;
      }

      setShareUrl(data.shareUrl);
    } catch (e: any) {
      alert("fetch failed: " + (e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="vbg">
        <video src="/videos/valentine.mp4" autoPlay loop muted playsInline />
      </div>

      <div className="vshade" />

      <div className="centerStage">
        <div className="overlayBox">
          <h1 className="bigTitle">Crear link 💌</h1>

          <label className="label">Pregunta</label>
          <input
            className="input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <label className="label">Archivo (foto o video)</label>
          <input
            className="input"
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <label className="label">Mensaje lindo</label>
          <textarea
            className="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <label className="label">Tu nombre</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Victor"
          />

          <div className="btnRow">
            <button
              className="btn btnYes"
              onClick={createGift}
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear link ✨"}
            </button>
          </div>

          {shareUrl && (
            <div className="linkBox">
              <b>Tu link:</b>
              <div style={{ marginTop: 8 }}>{shareUrl}</div>
              <div style={{ marginTop: 8 }}>
                <a
                  href={shareUrl}
                  target="_blank"
                  style={{ color: "#ffd1ea", fontWeight: 800 }}
                >
                  Abrir →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
