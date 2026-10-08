import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";

export default async function Detajet({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const udhetim = gjejUdhetimin(id);

  if (!udhetim) {
    notFound();
  }

  const paVende = udhetim.vende === 0;

  return (
    <main className="page-shell page-shell--detail">
      <Link className="back-link" href="/">← Të gjitha nisjet</Link>
      <section className="detail-panel">
        <p className="eyebrow">DETAJET E UDHËTIMIT</p>
        <h1>{udhetim.nisja}<span className="route-arrow"> → </span>{udhetim.destinacioni}</h1>
        <p className="detail-panel__intro">
          Një rrugë e përbashkët, më pak makina në rrugë.
        </p>
        <dl className="detail-list">
          <div>
            <dt>Ora e nisjes</dt>
            <dd>{udhetim.ora}</dd>
          </div>
          <div>
            <dt>Vendtakimi</dt>
            <dd>{udhetim.vendtakimi}</dd>
          </div>
          <div>
            <dt>Udhëton me</dt>
            <dd>{udhetim.shoferi} · {udhetim.vetura}</dd>
          </div>
          <div>
            <dt>Vende të lira</dt>
            <dd>{udhetim.vende}</dd>
          </div>
        </dl>
        {paVende ? (
          <button className="button button--muted button--wide" disabled>
            Nuk ka vende të lira
          </button>
        ) : (
          <Link className="button button--wide" href={`/udhetimi/${id}/kerkesa`}>
            Kërko vend <span aria-hidden="true">→</span>
          </Link>
        )}
      </section>
      <p className="demo-note demo-note--detail">
        Ky është një shembull mësimor. Nuk dërgohet kërkesë reale.
      </p>
    </main>
  );
}
