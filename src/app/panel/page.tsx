import Link from "next/link";
import Hyrja from "@/components/Hyrja";
import KerkesatShoferit from "@/components/KerkesatShoferit";
import Njoftimet from "@/components/Njoftimet";
import { profiliIm, type Profil } from "@/lib/lejet";
import { gjejUdhetimin } from "@/lib/udhetimet";
import { ruajOren } from "./actions";

export const dynamic = "force-dynamic";

const mesazhet: Record<string, string> = {
  hyr: "Hyr në llogari para se të ndryshosh udhëtimin.",
  ndaluar: "Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.",
  fushe: "Shkruaj një orë të vlefshme, p.sh. 08:25. ID duhet të jetë 1, 2 ose 3.",
  ruajtur: "Ora u ruajt me sukses. Kontrollo listën dhe detajet.",
  databaza: "Nuk u lidhëm me databazën. Kontrollo Neon dhe provo përsëri.",
};

export default async function Panel({
  searchParams,
}: {
  searchParams: Promise<{ m?: string }>;
}) {
  const { m } = await searchParams;
  let profile: Profil | null;
  let oraAktuale: string | null = null;

  try {
    profile = await profiliIm();
    if (profile?.roli === "shofer") {
      oraAktuale = (await gjejUdhetimin("2"))?.ora ?? null;
    }
  } catch (error) {
    console.error("Nuk u lexuan të dhënat e panelit nga databaza.", error);
    return (
      <main className="account-shell">
        <h1>Paneli im</h1>
        <p role="alert">{mesazhet.databaza}</p>
        <p><Link className="button" href="/panel">Provo përsëri</Link></p>
      </main>
    );
  }

  return (
    <main className="account-shell">
      <h1>Paneli im</h1>
      {m && mesazhet[m] && <p role="status">{mesazhet[m]}</p>}
      {!profile ? (
        <p>Lista është publike. Për panelin hyr me llogarinë tënde GitHub.</p>
      ) : (
        <>
          <p>
            Përshëndetje, {profile.emri}. Roli: <strong>{profile.roli}</strong>.
          </p>
          <p>ID ime GitHub: <code>{profile.id}</code></p>
        </>
      )}
      <Hyrja brenda={Boolean(profile)} />
      {profile?.roli === "shofer" ? (
        <>
          {oraAktuale ? (
            <form action={ruajOren}>
              <h2>Ndrysho orën e udhëtimit tim</h2>
              <input type="hidden" name="id" value="2" />
              <label htmlFor="ora">Ora e re</label>
              <input id="ora" name="ora" type="time" defaultValue={oraAktuale} required />
              <button className="button" type="submit">Ruaj orën</button>
              <p>
                Formulari i laboratorit provon ID 2. Serveri verifikon pronarin edhe
                nëse ID ndryshohet.
              </p>
            </form>
          ) : (
            <p role="status">Udhëtimi i provës me ID 2 nuk u gjet.</p>
          )}
          <KerkesatShoferit />
        </>
      ) : (
        profile && (
          <>
            <p>Si udhëtar mund të shohësh udhëtimet; nuk mund të ndryshosh orën e shoferit.</p>
            <Njoftimet />
          </>
        )
      )}
      <p><Link href="/">Kthehu te udhëtimet</Link></p>
    </main>
  );
}
