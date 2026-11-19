"use client";

import { useEffect, useRef, useState } from "react";

type Kerkesa = {
  id: string;
  udhetimId: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  udhetari: string;
  statusi: "ne pritje" | "pranuar";
  vende: number;
};

type PergjigjjaKerkesave = {
  requests?: Kerkesa[];
  error?: string;
};

export default function KerkesatShoferit() {
  const [kerkesat, setKerkesat] = useState<Kerkesa[]>([]);
  const [poRilidhemi, setPoRilidhemi] = useState(true);
  const [kerkesaNePritje, setKerkesaNePritje] = useState<string | null>(null);
  const [mesazhi, setMesazhi] = useState<string | null>(null);
  const rifreskoRef = useRef<() => void>(() => {});

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;
    let dukeLexuar = false;
    let rifreskoPasLeximit = false;
    let ndaluar = false;

    const lexo = async () => {
      if (ndaluar || dukeLexuar) return;
      dukeLexuar = true;
      controller = new AbortController();

      try {
        if (!navigator.onLine) {
          setPoRilidhemi(true);
          return;
        }

        const response = await fetch("/api/shofer/kerkesat", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json() as PergjigjjaKerkesave;
        if (!response.ok || !Array.isArray(result.requests)) {
          throw new Error(result.error ?? "Kërkesat nuk mund të lexohen.");
        }

        setKerkesat(result.requests);
        setPoRilidhemi(false);
      } catch {
        if (!controller.signal.aborted) {
          setPoRilidhemi(true);
        }
      } finally {
        dukeLexuar = false;
        if (ndaluar) return;
        const vonesa = rifreskoPasLeximit ? 0 : 5000;
        rifreskoPasLeximit = false;
        timer = setTimeout(() => void lexo(), vonesa);
      }
    };

    const rifresko = () => {
      if (dukeLexuar) {
        rifreskoPasLeximit = true;
        return;
      }
      if (timer) clearTimeout(timer);
      void lexo();
    };

    const kurRikthehetLidhja = () => {
      if (dukeLexuar) {
        rifreskoPasLeximit = true;
        controller?.abort();
      } else {
        rifresko();
      }
    };
    const kurHumbetLidhja = () => setPoRilidhemi(true);

    rifreskoRef.current = rifresko;
    window.addEventListener("online", kurRikthehetLidhja);
    window.addEventListener("offline", kurHumbetLidhja);
    void lexo();

    return () => {
      ndaluar = true;
      if (timer) clearTimeout(timer);
      controller?.abort();
      window.removeEventListener("online", kurRikthehetLidhja);
      window.removeEventListener("offline", kurHumbetLidhja);
      rifreskoRef.current = () => {};
    };
  }, []);

  async function prano(kerkesaId: string) {
    setKerkesaNePritje(kerkesaId);
    setMesazhi(null);

    try {
      const response = await fetch("/api/shofer/kerkesat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: kerkesaId }),
      });
      const result = await response.json() as { error?: string };

      if (!response.ok) {
        setMesazhi(result.error ?? "Kërkesa nuk u pranua. Provo përsëri.");
        rifreskoRef.current();
        return;
      }

      setMesazhi("Kërkesa u pranua. Gjendja po rifreskohet.");
      rifreskoRef.current();
    } catch {
      setMesazhi("Nuk mund ta konfirmojmë veprimin. Po sinkronizojmë përsëri.");
      rifreskoRef.current();
    } finally {
      setKerkesaNePritje(null);
    }
  }

  return (
    <section className="driver-requests" aria-labelledby="driver-requests-title">
      <div className="driver-requests__heading">
        <div>
          <p className="eyebrow">PANELI I SHOFERIT</p>
          <h2 id="driver-requests-title">Kërkesat për udhëtimet e mia</h2>
        </div>
        <span className="driver-requests__refresh">Përditësim çdo 5 sekonda</span>
      </div>

      {poRilidhemi && (
        <p className="driver-requests__connection" role="status">
          Po rilidhemi. Kërkesat e fundit ruhen në ekran.
        </p>
      )}
      {mesazhi && <p role="status">{mesazhi}</p>}

      {kerkesat.length === 0 ? (
        <p className="driver-requests__empty">
          {poRilidhemi ? "Po ngarkohen kërkesat…" : "Nuk ka kërkesa për udhëtimet e tua."}
        </p>
      ) : (
        <ul className="driver-requests__list">
          {kerkesat.map((kerkesa) => {
            const pranuar = kerkesa.statusi === "pranuar";
            const paVende = kerkesa.vende === 0;
            const dukePranuar = kerkesaNePritje === kerkesa.id;

            return (
              <li className="driver-request" key={kerkesa.id}>
                <div>
                  <p className="driver-request__route">
                    {kerkesa.nisja} → {kerkesa.destinacioni}
                  </p>
                  <p className="driver-request__details">
                    {kerkesa.udhetari} · ora {kerkesa.ora} · {kerkesa.vende}{" "}
                    {kerkesa.vende === 1 ? "vend i lirë" : "vende të lira"}
                  </p>
                  <p className="driver-request__status">
                    Gjendja: {pranuar ? "U pranua" : "Në pritje"}
                  </p>
                </div>
                {pranuar ? (
                  <button className="button button--muted button--small" disabled>
                    U pranua
                  </button>
                ) : (
                  <button
                    className={paVende ? "button button--muted button--small" : "button button--small"}
                    type="button"
                    disabled={paVende || poRilidhemi || kerkesaNePritje !== null}
                    onClick={() => void prano(kerkesa.id)}
                  >
                    {dukePranuar ? "Po ruhet…" : paVende ? "Pa vende" : "Prano"}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
