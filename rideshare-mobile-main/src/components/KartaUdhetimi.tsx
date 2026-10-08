import Link from "next/link";
import type { Udhetim } from "@/lib/udhetimet";

export function KartaUdhetimi({ udhetim }: { udhetim: Udhetim }) {
  const paVende = udhetim.vende === 0;

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
          {paVende ? (
            <button className="button button--muted" disabled>
              Nuk ka vende
            </button>
          ) : (
            <Link className="button button--small" href={`/udhetimi/${udhetim.id}`}>
              Shiko udhëtimin
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
