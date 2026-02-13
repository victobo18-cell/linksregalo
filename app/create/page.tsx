"use client";

import { useState } from "react";

export default function CreatePage() {
  const [question, setQuestion] = useState("¿Quieres ser mi Valentín? 💘");
  const [message, setMessage] = useState("Me gustas mucho 💖");
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [createdLink, setCreatedLink] = useState("");

  async function createGift() {
    setLoading(true);
    setCreatedLink("");

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

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error creando link");
        return;
      }

      const fullLink = `${window.location.origin}${data.shareUrl}`;
      setCreatedLink(fullLink);

    } catch (error) {
      alert("Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* VIDEO DE FONDO */}
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
          <h1 className="bigTitle">Crear link 💌</h1>

          <label className="label">Pregunta</label>
          <input
            className="input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <label className="label">Mensaje</label>
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

          <label className="label">Foto o video</label>
          <input
            className="input"
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button
            className="btn btnYes"
            onClick={createGift}
            disabled={loading}
            style={{ marginTop: 15 }}
          >
            {loading ? "Creando..." : "Crear link ✨"}
          </button>

          {createdLink && (
            <div className="linkBox">
              <p style={{ marginTop: 20 }}>💖 Tu link está listo:</p>

              <input
                className="input"
                value={createdLink}
                readOnly
              />

              <button
                className="btn btnYes"
                style={{ marginTop: 10 }}
                onClick={() => {
                  navigator.clipboard.writeText(createdLink);
                  alert("Link copiado 💕");
                }}
              >
                Copiar link 📋
              </button>

              <a
                href={createdLink}
                target="_blank"
                className="btn btnYes"
                style={{ marginTop: 10 }}
              >
                Abrir regalo 💌
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
