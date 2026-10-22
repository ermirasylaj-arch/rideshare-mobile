# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova

Lista, faqja e detajeve dhe faqja e kërkesës lexojnë udhëtimet nga databaza Neon përmes `@neondatabase/serverless`. Pyetjet SQL dhe `DATABASE_URL` përdoren vetëm në server; lidhja kontrollohet nga `server-only`. `schema.sql` krijon tabelën `udhetimet` dhe tri udhëtime fiktive.

## Provat që bëra

### Prova 1: Ndryshimi në databazë shfaqet në aplikacion

Në Neon SQL Editor ndryshova orën e ID 2 nga `08:15` në `08:25`. Pas rifreskimit, lista dhe faqja `/udhetimi/2` treguan `08:25`. E ktheva në `08:15` dhe kontrollova që detajet shfaqin sërish orën fillestare.

### Prova 2: Lista bosh dhe rikthimi

Shtova përkohësisht `WHERE false` vetëm te pyetja e listës dhe aplikacioni shfaqi “Nuk ka udhëtime për momentin.” E hoqa kushtin dhe u kthyen tri kartat. Ndryshimi provues nuk u ruajt.

### Prova 3: Lidhja mungon, rikthimi dhe siguria

E nisa aplikacionin pa `DATABASE_URL`; shfaqi “Nuk u lidhëm me databazën. Provo përsëri.” dhe gabimi u regjistrua në server. Pastaj vendosa connection string-un në `.env.local` lokalisht dhe verifikova se lista, detajet dhe simulimi i kërkesës u lidhën me Neon. Kontrollova me `git check-ignore` se skedari përjashtohet nga Git; connection string-u nuk është në repository.

## Ku gjendet puna

- Skema: `rideshare-mobile-main/schema.sql`
- Lidhja dhe pyetjet: `rideshare-mobile-main/src/lib/db.ts`, `rideshare-mobile-main/src/lib/udhetimet.ts`
- Faqet: `rideshare-mobile-main/src/app/page.tsx`, `rideshare-mobile-main/src/app/udhetimi/[id]/page.tsx`, `rideshare-mobile-main/src/app/udhetimi/[id]/kerkesa/page.tsx`
- Repository: https://github.com/ermirasylaj-arch/rideshare-mobile
- Linku i Vercel: https://rideshare-mobile-iota.vercel.app/
- `DATABASE_URL` u shtua si Secret për Production në Vercel; vlera nuk u publikua.

## Çfarë mbetet për përmirësim

Aplikacioni është publikuar në Vercel dhe u kontrolluan lista, detajet, kërkesa e simuluar dhe faqja 404. Kërkesa “Në pritje” mbetet simulim; nuk ka rezervim real.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për të lidhur faqet me Neon, për të krijuar skemën SQL dhe për të përditësuar dokumentimin. Kontrollova vetë listën, detajet, ndryshimin/rikthimin e orës, gjendjen bosh dhe sjelljen kur mungon lidhja. Connection string-u mbetet në konfigurimin lokal dhe nuk u publikua.
