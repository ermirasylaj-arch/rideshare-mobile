# Rruga — Udhëtime për në AAB

Një demonstrim mësimor i rrjedhës së bashkudhëtimit, i ndërtuar me Next.js App Router dhe TypeScript. Të dhënat janë fiktive; aplikacioni nuk ruan rezervime, nuk kontakton shoferë dhe nuk përpunon pagesa.

## Kërkesat

- Node.js 20.9 ose më i ri
- npm
- Një databazë Neon PostgreSQL me tabelën nga [`schema.sql`](./schema.sql)

## Nisja lokale

Krijo `.env.local` pranë `package.json` dhe vendos connection string-un e Neon:

```env
DATABASE_URL="connection-string-i-i-databazës-Neon"
```

Mos e publiko këtë vlerë. Skedari `.env.local` është i përjashtuar nga Git. Ekzekuto [`schema.sql`](./schema.sql) në Neon SQL Editor për të krijuar tabelën dhe të dhënat provuese.

Në terminal, nga dosja kryesore e projektit:

```bash
npm install
npm run dev
```

Hap adresën që shfaq terminali, zakonisht [http://localhost:3000](http://localhost:3000). Për të ndalur serverin, shtyp `Ctrl+C`.
Nëse databaza nuk është konfiguruar ose lidhja dështon, faqet shfaqin mesazh gabimi; lista pa rreshta shfaq një mesazh të veçantë.

## Si ta testojë profesori

1. Në faqen kryesore, kontrollo që shfaqen saktësisht tri udhëtime.
2. Hape faqen në pamjen mobile të shfletuesit (p.sh. gjerësi 375 px); kontrollo që kartat dhe butonat duken dhe nuk ka lëvizje horizontale.
3. Kliko **Shiko udhëtimin** te karta e dytë. URL-ja duhet të përfundojë me `/udhetimi/2` dhe detajet duhet të tregojnë vendtakimin **Stacioni i trenit**.
4. Në detaje, provo udhëtimin e tretë përmes URL-së `/udhetimi/3`; butoni **Nuk ka vende të lira** duhet të jetë i çaktivizuar.
5. Hape `/udhetimi/99`; duhet të shfaqet **Udhëtimi nuk u gjet** dhe lidhja **Kthehu te lista**.
6. Kthehu te `/udhetimi/2` dhe kliko **Kërko vend**. Duhet të shfaqet **Simulim: Në pritje**. Përdor lidhjen e kthimit për t'u kthyer te detajet; nga aty kthehu te lista.

## Kontrolli teknik

```bash
npm run build
```

Struktura e faqeve ndjek adresat `/`, `/udhetimi/[id]` dhe `/udhetimi/[id]/kerkesa`. Të dhënat e udhëtimeve lexohen nga Neon në `src/lib/udhetimet.ts`; lidhja private krijohet në `src/lib/db.ts`. Lista përdor komponentin `src/components/KartaUdhetimi.tsx`.

## Raportet

- Raporti i Javës 3: [`java-03.md`](./java-03.md)
- Raporti i Javës 4: [`java-04.md`](../java-04.md)
