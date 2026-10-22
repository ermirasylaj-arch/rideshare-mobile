import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import { lexoUdhetimet, type Udhetim } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

export default async function Home() {
  let udhetimet: Udhetim[];
  try {
    udhetimet = await lexoUdhetimet();
  } catch (error) {
    console.error("Nuk u lexuan udhëtimet nga databaza.", error);
    return (
      <main className="page-shell">
        <section className="intro">
          <p className="eyebrow">PËRDITSHMËRIA, MË E THJESHTË</p>
          <h1>Gjej rrugën<br />për në kampus.</h1>
          <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
          <a className="button" href="/">Provo përsëri</a>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="intro">
        <p className="eyebrow">PËRDITSHMËRIA, MË E THJESHTË</p>
        <h1>Gjej rrugën<br />për në kampus.</h1>
        <p className="intro__copy">
          Udhëtime të përbashkëta drejt AAB-së. Zgjidh nisjen që të përshtatet
          dhe shiko hollësitë para se të kërkosh vend.
        </p>
        <p className="intro__copy">Burimi: Neon · të dhëna fiktive për ushtrime</p>
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
          <span className="section-heading__count">
            {String(udhetimet.length).padStart(2, "0")} /{" "}
            {String(udhetimet.length).padStart(2, "0")}
          </span>
        </div>
        {udhetimet.length === 0 ? (
          <p>Nuk ka udhëtime për momentin.</p>
        ) : (
          <div className="trip-list">
            {udhetimet.map((udhetim) => (
              <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
            ))}
          </div>
        )}
        <p className="demo-note">
          Kërkesat në këtë demonstrim nuk krijojnë rezervime të vërteta.
        </p>
      </section>
    </main>
  );
}
