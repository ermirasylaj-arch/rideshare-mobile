"use client";

import Link from "next/link";
import type { Udhetim } from "@/lib/udhetimet";

export function KartaUdhetimi({
  udhetim,
  eshteKycur,
  eshtePreferuar,
  eshteNePritje,
  gabimi,
  uRuajtTani,
  ruajtjaNukEshteGati,
  ruaj,
}: {
  udhetim: Udhetim;
  eshteKycur: boolean;
  eshtePreferuar: boolean;
  eshteNePritje: boolean;
  gabimi?: string;
  uRuajtTani: boolean;
  ruajtjaNukEshteGati: boolean;
  ruaj: (id: string) => Promise<void>;
}) {
  const paVende = udhetim.vende === 0;
  const etiketaPreferimit = eshteNePritje
    ? "★ Po ruhet…"
    : eshtePreferuar
      ? "★ I ruajtur"
      : gabimi
        ? "☆ Provo përsëri"
        : "☆ Ruaj udhëtimin";

  return (
    <article className="trip-card">
      <div className="trip-card__time" aria-label={`Nisja në ${udhetim.ora}`}>
        <span className="trip-card__time-label">NISJA</span>
        <strong>{udhetim.ora}</strong>
      </div>
      <div className="trip-card__body">
        <p className="trip-card__route">
          {udhetim.nisja} <span aria-hidden="true">→</span>{" "}
          {udhetim.destinacioni}
        </p>
        <p className="trip-card__meetup">Takimi: {udhetim.vendtakimi}</p>
        <div className="trip-card__footer">
          <span className={paVende ? "seat-status seat-status--full" : "seat-status"}>
            {paVende
              ? "Plot"
              : udhetim.vende === 1
                ? "1 vend i lirë"
                : `${udhetim.vende} vende të lira`}
          </span>
          <Link className="button button--small" href={`/udhetimi/${udhetim.id}`}>
            Shiko udhëtimin
          </Link>
        </div>
        <div className="favorite-control">
          {eshteKycur ? (
            <button
              className="favorite-button"
              type="button"
              onClick={() => void ruaj(udhetim.id)}
              disabled={
                eshtePreferuar || eshteNePritje || ruajtjaNukEshteGati
              }
              aria-label={etiketaPreferimit}
            >
              {etiketaPreferimit}
            </button>
          ) : (
            <Link className="favorite-login" href="/panel">
              Hyr me GitHub për të ruajtur
            </Link>
          )}
          <p
            className={gabimi ? "favorite-message favorite-message--error" : "favorite-message"}
            aria-live="polite"
          >
            {eshteNePritje
              ? "Po presim konfirmimin e serverit."
              : gabimi ||
                (eshtePreferuar
                  ? uRuajtTani
                    ? "U ruajt te të preferuarat."
                    : "Preferimet u lexuan nga serveri."
                  : "Preferim personal · jo rezervim")}
          </p>
        </div>
      </div>
    </article>
  );
}
