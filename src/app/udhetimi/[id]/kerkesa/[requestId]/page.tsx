import Link from "next/link";
import { notFound } from "next/navigation";
import { profiliIm } from "@/lib/lejet";
import { gjejKerkesenIme } from "@/lib/kerkesat";
import { gjejUdhetimin } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

export default async function DetajetENjoftuar({
  params,
}: {
  params: Promise<{ id: string; requestId: string }>;
}) {
  const { id, requestId } = await params;
  const profile = await profiliIm();
  if (!profile) notFound();

  const [ride, request] = await Promise.all([
    gjejUdhetimin(id),
    gjejKerkesenIme(requestId, id, profile.id),
  ]);

  if (!ride || !request) notFound();

  return (
    <main className="page-shell page-shell--detail">
      <Link className="back-link" href="/panel">← Kthehu te njoftimet</Link>
      <section className="detail-panel">
        <p className="eyebrow">DETAJET · K-{request.id}</p>
        <h1>Kërkesa e {profile.emri}</h1>
        <dl className="detail-list">
          <div><dt>Udëtimi</dt><dd>{ride.nisja} → {ride.destinacioni}</dd></div>
          <div><dt>Ora</dt><dd>{ride.ora}</dd></div>
          <div><dt>Statusi</dt><dd>{request.statusi === "pranuar" ? "U pranua" : "Në pritje"}</dd></div>
          <div><dt>Vende të lira</dt><dd>{ride.vende}</dd></div>
        </dl>
        <p role="status">Njoftimi u shënua si i lexuar në server.</p>
      </section>
    </main>
  );
}
