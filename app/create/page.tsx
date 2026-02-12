"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  const [question, setQuestion] = useState("¿Quieres ser mi Valentín? 💘");
  const [message, setMessage] = useState("Me gustas mucho 💖");
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function createGift() {
    setLoading(true);

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
        alert(data.error || "Error al crear link");
        return;
      }

      // 🔥 REDIRECCIÓN A NUEVA PÁGINA
      router.push(`/created?link=${data.shareUrl}`);
    } catch (error) {
      alert("Error creando link");
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

          <input
            className="input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <textarea
            className="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
          />

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
          >
            {loading ? "Creando..." : "Crear link ✨"}
          </button>
        </div>
      </div>
    </>
  );
}
