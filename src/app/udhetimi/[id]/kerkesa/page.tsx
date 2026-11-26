import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";
import KerkesaKlienti from "@/components/KerkesaKlienti";

export const dynamic = "force-dynamic";

export default async function Kerkesa({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let udhetim;
  try {
    udhetim = await gjejUdhetimin(id);
  } catch (error) {
    console.error("Nuk u lexua udhëtimi nga databaza.", error);
    return (
      <main className="page-shell page-shell--detail">
        <section className="request-panel">
          <h1>RideShare</h1>
          <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
          <Link className="button button--wide" href="/">← Kthehu te lista</Link>
        </section>
      </main>
    );
  }

  if (!udhetim) {
    notFound();
  }

  return (
    <main className="page-shell page-shell--detail">
      <Link className="back-link" href={`/udhetimi/${id}`}>← Kthehu te detajet</Link>
      <section className="request-panel">
        {udhetim.vende > 0 ? (
          <KerkesaKlienti
            udhetimId={id}
            nisja={udhetim.nisja}
            destinacioni={udhetim.destinacioni}
          />
        ) : (
          <>
            <span className="request-icon request-icon--quiet" aria-hidden="true">!</span>
            <p className="eyebrow">NUK KA VENDE</p>
            <h1>Udhëtimi është plot</h1>
            <p>Nuk mund të kërkosh vend në këtë udhëtim.</p>
          </>
        )}
        <Link className="button button--wide button--outline" href={`/udhetimi/${id}`}>
          Kthehu te detajet
        </Link>
      </section>
    </main>
  );
}
