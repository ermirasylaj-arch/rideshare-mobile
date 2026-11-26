import { getServerSession } from "next-auth";
import { ListaUdhetimesh } from "@/components/ListaUdhetimesh";
import { authOptions } from "@/lib/auth";
import { lexoPreferimet } from "@/lib/preferimet";
import { lexoUdhetimet, type Udhetim } from "@/lib/udhetimet";
import Link from "next/link";

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
          <p className="intro__account">
            <Link className="button" href="/panel">Hyr / Paneli im</Link>
          </p>
          <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
          <a className="button" href="/">Provo përsëri</a>
        </section>
      </main>
    );
  }

  let eshteKycur = false;
  let preferimet: string[] = [];
  let gabimNeLexim = false;

  try {
    const session = await getServerSession(authOptions);
    const githubId = session?.user?.id;
    if (githubId && /^\d+$/.test(githubId)) {
      eshteKycur = true;
      try {
        preferimet = await lexoPreferimet(githubId);
      } catch (error) {
        console.error("Nuk u lexuan preferimet nga databaza.", error);
        gabimNeLexim = true;
      }
    }
  } catch (error) {
    console.error("Nuk u verifikua sesioni i përdoruesit.", error);
    gabimNeLexim = true;
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
        <p className="intro__account">
          <Link className="button" href="/panel">Hyr / Paneli im</Link>
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
          <ListaUdhetimesh
            udhetimet={udhetimet}
            preferimetFillestare={preferimet}
            eshteKycur={eshteKycur}
            gabimNeLexim={gabimNeLexim}
          />
        )}
        <p className="demo-note">
          Kërkesat ruhen me llogarinë tuaj dhe mund të sjellin njoftime personale.
        </p>
      </section>
    </main>
  );
}
