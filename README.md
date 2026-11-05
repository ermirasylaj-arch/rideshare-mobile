# Rruga — Udhëtime për në AAB

Një demonstrim mësimor i rrjedhës së bashkudhëtimit, i ndërtuar me Next.js App Router dhe TypeScript. Të dhënat janë fiktive; aplikacioni nuk ruan rezervime, nuk kontakton shoferë dhe nuk përpunon pagesa.

## Kërkesat

- Node.js 20.9 ose më i ri
- npm

## Nisja lokale

Krijo `.env.local` pranë `package.json` dhe vendos adresën e Neon-it dhe vlerat e GitHub OAuth:

```env
DATABASE_URL="connection-string-i-i-databazës-Neon"
GITHUB_ID="Client-ID-i-OAuth-App"
GITHUB_SECRET="Client-secret-i-OAuth-App"
NEXTAUTH_SECRET="sekret-i-rastësishëm-i-sesionit"
NEXTAUTH_URL="http://localhost:3000"
```

Në GitHub krijo një OAuth App me homepage `http://localhost:3000` dhe callback `http://localhost:3000/api/auth/callback/github`. Gjenero `NEXTAUTH_SECRET` lokalisht me:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Ekzekuto fillimisht [`schema.sql`](./schema.sql), pastaj [`schema-java05.sql`](./schema-java05.sql) në Neon SQL Editor. Skema e Javës 5 shton profilin dhe pronarin pa fshirë udhëtimet. Mos i publiko vlerat e `.env.local`; skedari përjashtuar është `.env*`.

Në terminal, nga dosja kryesore e projektit:

```bash
npm install
npm run dev
```

Hap adresën që shfaq terminali, zakonisht [http://localhost:3000](http://localhost:3000). Për të ndalur serverin, shtyp `Ctrl+C`.

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

Struktura e faqeve ndjek adresat `/`, `/udhetimi/[id]` dhe `/udhetimi/[id]/kerkesa`. Të dhënat e udhëtimeve gjenden te `src/lib/udhetimet.ts`; lista përdor komponentin `src/components/KartaUdhetimi.tsx`.

Java 5 shton hyrjen me GitHub dhe panelin `/panel`. Pas hyrjes, përdor ID-në e shfaqur në panel për t'i caktuar vetes rolin `shofer` dhe udhëtimin ID 2 në Neon SQL Editor:

```sql
UPDATE profilet SET roli = 'shofer' WHERE github_id = 'ID_GITHUB';
UPDATE udhetimet SET shofer_id = 'ID_GITHUB' WHERE id = '2';
SELECT id, ora, shofer_id FROM udhetimet ORDER BY id;
```

Zëvendëso `ID_GITHUB` me ID-në numerike të llogarisë tënde. Mos e vendos ID-në ose rolin në formular; serveri i verifikon nga sesioni dhe databaza.

## Raportet

- Raporti Java 3: [`java-03.md`](./java-03.md)
- Raporti Java 4: [`java-04.md`](./java-04.md)
- Raporti Java 5: [`java-05.md`](./java-05.md)
