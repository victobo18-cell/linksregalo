"use client";

import { useEffect, useState } from "react";

function isVideo(url: string) {
  return /\.(mp4|webm|mov)$/i.test(url);
}

export default function GiftPage({ params }: { params: { token: string } }) {
  const token = params.token;
  const [data, setData] = useState<any>(null);

  async function load() {
    const res = await fetch(`/api/gifts/${token}`);
    const json = await res.json();
    setData(json);
  }

  useEffect(() => { load(); }, []);

  async function answer(ans: "yes" | "no") {
    await fetch(`/api/gifts/${token}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: ans }),
    });
    await load();
  }

  if (!data) return <div style={{ padding: 20 }}>Cargando...</div>;
  if (data.error) return <div style={{ padding: 20 }}>No encontrado</div>;

  return (
    <>
      <div className="vbg">
        <video src="/videos/valentine.mp4" autoPlay loop muted playsInline />
      </div>
      <div className="vshade" />

      <div className="centerStage">
        <div className="overlayBox">
          <h1 className="bigTitle">{data.question}</h1>

          {data.answered !== "yes" && (
            <div className="btnRow">
              <button className="btn btnYes" onClick={() => answer("yes")}>Sí 💖</button>
              <button className="btn btnNo" onClick={() => answer("no")}>No 🙈</button>
            </div>
          )}

          {data.answered === "no" && (
            <p className="smallText" style={{ marginTop: 12 }}>Ok 😅</p>
          )}

          {data.answered === "yes" && (
            <div style={{ marginTop: 12, textAlign: "left" }}>
              {data.fileUrl && (
                isVideo(data.fileUrl) ? (
                  <video src={data.fileUrl} controls style={{ width: "100%", borderRadius: 14, marginBottom: 12 }} />
                ) : (
                  <img src={data.fileUrl} alt="archivo" style={{ width: "100%", borderRadius: 14, marginBottom: 12 }} />
                )
              )}

              <p className="smallText" style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                {data.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
