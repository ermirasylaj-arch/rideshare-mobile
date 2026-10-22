# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova

Lista, faqja e detajeve dhe faqja e kërkesës lexojnë udhëtimet nga databaza Neon përmes `@neondatabase/serverless`. Pyetjet SQL dhe `DATABASE_URL` përdoren vetëm në server; lidhja kontrollohet nga `server-only`. `schema.sql` krijon tabelën `udhetimet` dhe tri udhëtime fiktive.

## Provat që bëra

### Prova 1: Ndryshimi në databazë shfaqet në aplikacion

Kodi i listës dhe i detajeve lexon të dhënat nga databaza në çdo kërkesë. Prova live me ndryshimin e orës së ID 2 në `08:25` nuk u krye këtu, sepse `DATABASE_URL` dhe databaza personale Neon nuk janë konfiguruar në këtë mjedis. Për ta verifikuar: ndrysho orën në Neon SQL Editor, rifresko listën dhe detajet, pastaj ktheje në `08:15`.

### Prova 2: Lista bosh dhe rikthimi

Faqja shfaq “Nuk ka udhëtime për momentin.” kur pyetja kthen zero rreshta. Prova me `WHERE false` nuk u ekzekutua pa lidhjen e databazës. Riktheje pyetjen normale pas provës; tri kartat shfaqen kur tabela ka tri rreshtat e `schema.sql`.

### Prova 3: Lidhja mungon, rikthimi dhe siguria

E testova aplikacionin pa `DATABASE_URL`: shfaqi “Nuk u lidhëm me databazën. Provo përsëri.” dhe gabimi u regjistrua në server. Prova e rikthimit me një `DATABASE_URL` real nuk u krye. Kontrollova me `git check-ignore` se `.env.local` përjashtohet nga Git; mos publiko connection string-un.

## Ku gjendet puna

- Skema: `rideshare-mobile-main/schema.sql`
- Lidhja dhe pyetjet: `rideshare-mobile-main/src/lib/db.ts`, `rideshare-mobile-main/src/lib/udhetimet.ts`
- Faqet: `rideshare-mobile-main/src/app/page.tsx`, `rideshare-mobile-main/src/app/udhetimi/[id]/page.tsx`, `rideshare-mobile-main/src/app/udhetimi/[id]/kerkesa/page.tsx`
- Repository: https://github.com/ermirasylaj-arch/rideshare-mobile
- Linku i Vercel: nuk u konfigurua

## Çfarë mbetet për përmirësim

Duhet konfiguruar databaza Neon dhe `DATABASE_URL`, pastaj të kryhen tri provat live. Kërkesa “Në pritje” mbetet simulim; nuk ka rezervim real.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për të lidhur faqet me Neon, për të krijuar skemën SQL dhe për të përditësuar dokumentimin. Verifikova kodin me ndërtimin e projektit; provat live të databazës kërkojnë `DATABASE_URL` dhe duhet të kryhen veçmas.
