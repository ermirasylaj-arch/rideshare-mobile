# Java 7 – RideShare

## 1. Rasti i zgjedhur

**Case 2 – No seats**

**Kodi i rastit:** `P7-876`

Qëllimi ishte të sigurohej që përdoruesi të mund t'i shohë detajet e një udhëtimi edhe kur nuk ka vende të lira, por të mos mund të kërkojë vend.

## 2. Problemi i identifikuar

Gjatë kontrollimit të ndërfaqes u identifikuan dy probleme:

1. Kur udhëtimi ishte plot, në kartelë nuk ishte e qartë se si përdoruesi mund t'i hapte detajet e udhëtimit.
2. Numri i vendeve shfaqej në formatin `03 / 03`, pa shpjegim të mjaftueshëm për vlerat.

## 3. Ndryshimi i realizuar

Në komponentin `src/components/KartaUdhetimi.tsx` u ruajt lidhja **“Shiko udhëtimin”**, edhe kur udhëtimi është plot.

Në listën e udhëtimeve shfaqet statusi **“Plot”** kur nuk ka vende të lira. Në faqen e detajeve, kërkesa për vend nuk ofrohet kur numri i vendeve të lira është zero.

Kështu përdoruesi mund t'i shohë hollësitë e udhëtimit pa krijuar përshtypjen se mund të kërkojë një vend që nuk ekziston.

## 4. Testimi manual

Testimi u realizua në aplikacionin lokal, të lidhur me databazën testuese Neon (`rideshare-test`).

### Testi 1 – Udhëtim pa vende të lira

- ID: `3`
- Nisja: Lipjan
- Destinacioni: AAB
- Ora: 07:45
- Vendtakimi: Qendra e qytetit
- Vende të lira: 0

**Rezultati: KALOI**

U verifikua se:

- Në listën e udhëtimeve shfaqet statusi “Plot”.
- Lidhja “Shiko udhëtimin” mbetet e dukshme.
- Hapet faqja e detajeve `/udhetimi/3`.
- Shfaqen 0 vende të lira.
- Shfaqet mesazhi “Nuk ka vende të lira”.
- Nuk ofrohet mundësia për të kërkuar vend.

### Testi 2 – Udhëtim me vende të lira

- ID: `1`
- Nisja: Prishtinë
- Destinacioni: AAB
- Ora: 08:00
- Vendtakimi: Stacioni i autobusëve
- Vende të lira: 2

**Rezultati: KALOI**

U verifikua se:

- Hapet faqja e detajeve `/udhetimi/1`.
- Shfaqen 2 vende të lira.
- Butoni “Kërko vend” është i dukshëm.
- Lidhja e kërkesës hap faqen `/udhetimi/1/kerkesa`.

Ky test konfirmoi se ndryshimi nuk e pengon përdorimin normal të udhëtimeve që kanë vende të lira.

## 5. Kontrollimi i databazës

U përdor databaza testuese Neon.

Pyetja SQL e përdorur për kontrollimin e udhëtimit ishte:

```sql
SELECT id, vende
FROM udhetimet
WHERE id = '3';
```

Rezultati i marrë:

|  id | vende |
| --: | ----: |
|   3 |     0 |

Aplikacioni lexoi me sukses tri udhëtime nga databaza testuese.

## 6. Kontrollimi teknik

- Next.js u përditësua në versionin `16.4.6`.
- U përditësuan `package.json` dhe `package-lock.json`.
- `tsconfig.json` u kufizua për të përfshirë skedarët përkatës të projektit në `src` dhe skedarët e nevojshëm të Next.js.
- Komanda `npx tsc --noEmit --incremental false` përfundoi me sukses.
- Komanda `npm run build` përfundoi me sukses pas përditësimeve.

## 7. Përdorimi i inteligjencës artificiale

U përdor Copilot për të analizuar problemin në kartelën e udhëtimit dhe për të propozuar ruajtjen e lidhjes për hapjen e detajeve edhe kur udhëtimi është plot.

Ndryshimi u kontrollua dhe u testua manualisht në aplikacionin lokal me dy raste: një udhëtim pa vende të lira dhe një udhëtim me vende të lira.

## 8. Dëshmitë dhe gjendja e dorëzimit

Tri screenshot-et e testimit janë realizuar dhe ruajtur në folderin `Java-07-Screenshotet` në Desktop:

1. Screenshot i listës ku udhëtimi ID 3 shfaqet “Plot” dhe ka lidhjen “Shiko udhëtimin”.
2. Screenshot i detajeve të udhëtimit ID 3 me 0 vende të lira dhe mesazhin “Nuk ka vende të lira”.
3. Screenshot i detajeve të udhëtimit ID 1 me 2 vende të lira dhe butonin “Kërko vend”.

**Gjendja e GitHub:** Ndryshimet e Javës 7 janë kryer me sukses në commit dhe janë publikuar në degën `main` të GitHub.

**Demo me kolegun:** Ende nuk është realizuar. Mbetet për t'u demonstruar puna dhe rezultatet e testimit.
