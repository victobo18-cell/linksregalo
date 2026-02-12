"use client";

import { useState } from "react";

export default function CreatePage() {
  const [question, setQuestion] = useState("¿Quieres ser mi Valentín? 💘");
  const [message, setMessage] = useState("Me gustas mucho 💖");
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function createGift() {
    setLoading(true);

    try {
      // ✅ AQUÍ SE CREA EL FORMDATA (esto faltaba)
      const fd = new FormData();
      fd.append("question", question);
      fd.append("message", message);
      fd.append("name", name);
      if (file) {
        fd.append("file", file);
      }

      const res = await fetch("/api/gifts", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al crear link");
        return;
      }

      alert("Link creado correctamente 💖");
      console.log(data);

    } catch (error) {
      alert("Error inesperado");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#e678a8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        fontFamily: "serif",
      }}
    >
      <h1>💌 Crear link</h1>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Pregunta"
        style={{ margin: 8, padding: 10 }}
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Mensaje"
        style={{ margin: 8, padding: 10 }}
      />

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
        style={{ margin: 8, padding: 10 }}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ margin: 8 }}
      />

      <button
        onClick={createGift}
        disabled={loading}
        style={{
          marginTop: 15,
          padding: 10,
          background: "#ff4f8b",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        {loading ? "Creando..." : "Crear link"}
      </button>
    </div>
  );
}
