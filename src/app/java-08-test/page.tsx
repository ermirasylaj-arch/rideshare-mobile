import Link from "next/link";
import { ZgjedhVendtakimin } from "@/components/VendtakimiLokale";

export default function Java08Test() {
  return (
    <main className="page-shell page-shell--detail">
      <Link className="back-link" href="/">
        ← Të gjitha nisjet
      </Link>
      <section className="detail-panel">
        <p className="eyebrow">JAVA 8 · TË DHËNA FIKTIVE</p>
        <h1>
          Ferizaj<span className="route-arrow"> → </span>AAB
        </h1>
        <p className="detail-panel__intro">Arta · udhëtimi i Dritonit · ID 2</p>
        <dl className="detail-list">
          <div>
            <dt>Ora e nisjes</dt>
            <dd>08:15</dd>
          </div>
          <div>
            <dt>Destinacioni</dt>
            <dd>AAB</dd>
          </div>
        </dl>
        <ZgjedhVendtakimin />
      </section>
      <p className="demo-note demo-note--detail">
        Faqe prove lokale; nuk përdor login, databazë ose shërbim të jashtëm.
        Koordinatat nuk ruhen dhe nuk dërgohen.
      </p>
    </main>
  );
}
