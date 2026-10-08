import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import { udhetimet } from "@/lib/udhetimet";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="intro">
        <p className="eyebrow">PËRDITSHMËRIA, MË E THJESHTË</p>
        <h1>Gjej rrugën<br />për në kampus.</h1>
        <p className="intro__copy">
          Udhëtime të përbashkëta drejt AAB-së. Zgjidh nisjen që të përshtatet
          dhe shiko hollësitë para se të kërkosh vend.
        </p>
        <div className="intro__meta">
          <span className="live-dot" aria-hidden="true" />
          <span>{udhetimet.length} udhëtime të planifikuara</span>
        </div>
      </section>

      <section className="rides" aria-labelledby="rides-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">E MËRKURË · 7 TETOR</p>
            <h2 id="rides-heading">Nisjet e ardhshme</h2>
          </div>
          <span className="section-heading__count">03 / 03</span>
        </div>
        <div className="trip-list">
          {udhetimet.map((udhetim) => (
            <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
          ))}
        </div>
        <p className="demo-note">
          Kërkesat në këtë demonstrim nuk krijojnë rezervime të vërteta.
        </p>
      </section>
    </main>
  );
}
