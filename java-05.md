# RideShare — Java 5 · Hyrja dhe lejet

## Çfarë ndërtova

Hyrja me GitHub verifikon identitetin dhe ruan ID-në e llogarisë në sesionin server-side. Roli lexohet veçmas nga tabela `profilet` në Neon; profili i ri merr rolin `udhetar`. Pronësia ruhet te `udhetimet.shofer_id`. Veprimi i ruajtjes kontrollon sesionin, rolin, formatin e fushave dhe pronësinë në server, për çdo kërkesë.

## Provat që bëra

### Prova 1: Hyrja, rifreskimi dhe dalja

`npm run build` përfundoi me sukses, përfshirë kontrollin TypeScript. Prova manuale e OAuth-it nuk u ekzekutua këtu, sepse kërkon OAuth App dhe sekretet personale në `.env.local`. Pas konfigurimit, provo `/panel` pa hyrje, hyrjen me GitHub, rifreskimin dhe daljen.

### Prova 2: Shoferi ndryshon udhëtimin e vet

Prova manuale kundër Neon nuk u ekzekutua këtu. Paneli përgatit formularin për udhëtimin ID 2. Pas caktimit të rolit dhe pronarit në Neon, provo 08:25 dhe riktheje në 08:15; kontrollo panelin, listën, detajet dhe SQL Editor.

### Prova 3: Veprimi pa leje refuzohet

Prova manuale kundër Neon nuk u ekzekutua këtu. Kur OAuth dhe databaza të jenë konfiguruar, provo ID 1 nga formulari i hapur dhe verifiko mesazhin e refuzimit dhe orën 08:00 në Neon.

## Ku gjendet puna

- Skema e Javës 5: `rideshare-mobile-main/schema-java05.sql`
- Hyrja, lejet dhe profili: `rideshare-mobile-main/src/lib/auth.ts`, `rideshare-mobile-main/src/lib/lejet.ts`
- Rruga e autentikimit: `rideshare-mobile-main/src/app/api/auth/[...nextauth]/route.ts`
- Paneli dhe ruajtja: `rideshare-mobile-main/src/app/panel/page.tsx`, `rideshare-mobile-main/src/app/panel/actions.ts`
- Repository: https://github.com/ermirasylaj-arch/rideshare-mobile

Sekretet OAuth dhe `DATABASE_URL` qëndrojnë në `.env.local` dhe nuk përfshihen këtu.

## Çfarë mbetet për përmirësim

Kërkesa për vend mbetet simulim. Një hap i ardhshëm do të ishte ruajtja e kërkesave dhe administrimi i vendeve të lira.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

U përdor AI për të lidhur hyrjen me GitHub, sesionin, kontrollin e rolit/pronësisë dhe dokumentimin. Build-i dhe kontrolli TypeScript ekzekutohen lokalisht; provat që kërkojnë OAuth personal dhe Neon duhen ekzekutuar nga pronari i llogarive para dorëzimit.
