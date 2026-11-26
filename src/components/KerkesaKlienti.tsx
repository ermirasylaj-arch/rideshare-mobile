"use client";

import { useState } from "react";

type Props = {
  udhetimId: string;
  nisja: string;
  destinacioni: string;
};

export default function KerkesaKlienti({ udhetimId, nisja, destinacioni }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function sendRequest() {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/udhetimi/${udhetimId}/kerkesa`, {
        method: "POST",
        cache: "no-store",
      });
      const result = await response.json() as { error?: string; created?: boolean; existing?: boolean };
      if (!response.ok) {
        setMessage(result.error ?? "Kërkesa nuk u ruajt.");
        return;
      }
      setSaved(true);
      setMessage(result.existing ? "Kërkesa është në pritje tashmë." : "Kërkesa u dërgua te shoferi.");
    } catch {
      setMessage("Nuk mund të ruhet kërkesa tani.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <span className="request-icon" aria-hidden="true">{saved ? "✓" : "?"}</span>
      <p className="eyebrow">KËRKESË PËR UDHTËTIM</p>
      <h1>{nisja} → {destinacioni}</h1>
      {message ? (
        <p role="status">{message}</p>
      ) : (
        <p>Kërko një vend në këtë udhëtim. Serveri kontrollon llogarinë dhe vendet e lira.</p>
      )}
      <button
        type="button"
        className="button button--wide"
        disabled={loading || saved}
        onClick={() => void sendRequest()}
      >
        {loading ? "Po ruhet…" : saved ? "Kërkesa u ruajt" : "Dërgo kërkesën"}
      </button>
    </>
  );
}
