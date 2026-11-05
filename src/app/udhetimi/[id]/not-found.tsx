import Link from "next/link";

export default function UdhetimiNukUGjet() {
  return (
    <main className="page-shell page-shell--detail">
      <section className="request-panel">
        <span className="request-icon request-icon--quiet" aria-hidden="true">?</span>
        <p className="eyebrow">ADRESË E PAVLEFSHME</p>
        <h1>Udhëtimi nuk u gjet</h1>
        <p>Kjo lidhje nuk përputhet me një udhëtim të publikuar.</p>
        <Link className="button button--wide" href="/">Kthehu te lista</Link>
      </section>
    </main>
  );
}
