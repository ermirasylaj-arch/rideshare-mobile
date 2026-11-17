# Java 07 – Case 2: No seats

## Rasti im

- **Java:** 7
- **Rasti:** Case 2 – No seats
- **Kodi i rastit:** P7-876
- **GitHub:** ermirasylaj-arch
- **Repository:** https://github.com/ermirasylaj-arch/rideshare-mobile

## Parashikimi

Kur një udhëtim nuk ka vende të lira, ai duhet të mbetet i dukshëm në listën e udhëtimeve dhe përdoruesi duhet të ketë mundësi ta hapë për të parë detajet. Në detajet e udhëtimit nuk duhet të shfaqet mundësia për të kërkuar vend kur numri i vendeve të lira është zero.

## Ndryshimi i ri

U përditësua paraqitja e udhëtimeve pa vende të lira:

- Udhëtimi i plotë vazhdon të shfaqet në listë.
- Në listë shfaqet statusi “Plot”.
- Lidhja “Shiko udhëtimin” mbetet e dukshme.
- Në faqen e detajeve shfaqet mesazhi “Nuk ka vende të lira”.
- Kur nuk ka vende të lira, nuk shfaqet butoni “Kërko vend”.

## Ndihma nga AI

U përdor GitHub Copilot dhe ChatGPT për ndihmë gjatë analizimit të problemit, planifikimit të ndryshimit, kontrollimit të kodit dhe përgatitjes së raportit. Ndryshimet dhe testimet u kontrolluan manualisht.

## Dy probleme

1. Udhëtimi me zero vende të lira duhet të mbetet i dukshëm në listë dhe të ketë lidhjen “Shiko udhëtimin”.
2. Në detajet e një udhëtimi të plotë nuk duhet të jetë e mundur të kërkohet vend.

## Korrigjimi (arsyeja)

U korrigjua kushti i paraqitjes së udhëtimit dhe i kontrollit të vendeve të lira. Udhëtimi nuk fshihet vetëm pse numri i vendeve është zero. Përdoruesi mund t'i shohë detajet, por nuk mund të kërkojë vend në një udhëtim të plotë.

**Skedari:** `src/components/KartaUdhetimi.tsx`

## Prova 1

- **Hapat:** U hap lista e udhëtimeve dhe u kontrollua udhëtimi ID 3, Lipjan → AAB, ora 07:45, me 0 vende të lira.
- **Pritshmëria:** Udhëtimi të shfaqet në listë me statusin “Plot” dhe me lidhjen “Shiko udhëtimin”.
- **Vëzhgimi:** Udhëtimi u shfaq me statusin “Plot” dhe lidhja “Shiko udhëtimin” ishte e dukshme.

## Prova 2

- **Hapat:** U hapën detajet e udhëtimit ID 3, i cili ka 0 vende të lira.
- **Pritshmëria:** Të shfaqet mesazhi “Nuk ka vende të lira” dhe të mos shfaqet butoni “Kërko vend”.
- **Vëzhgimi:** Mesazhi “Nuk ka vende të lira” u shfaq dhe butoni “Kërko vend” nuk u shfaq.

## Prova 3

- **Hapat:** U hapën detajet e udhëtimit ID 1, Prishtinë → AAB, ora 08:00, me 2 vende të lira.
- **Pritshmëria:** Udhëtimi të shfaqë mundësinë për të kërkuar vend, sepse ka vende të lira.
- **Vëzhgimi:** Butoni “Kërko vend” u shfaq siç pritej.

## Kontrolli i databazës

U kontrollua numri i vendeve të lira për udhëtimin ID 3 në databazën Neon me pyetjen:

```sql
SELECT id, vende FROM udhetimet WHERE id = '3';
```

Rezultati konfirmoi se udhëtimi ID 3 kishte `vende = 0`.

## Kontrollet teknike

- Next.js u përditësua në versionin 16.4.6.
- `npx tsc --noEmit --incremental false` përfundoi me sukses.
- `npm run build` përfundoi me sukses.

## Dëshmitë

Tri screenshot-et e testimit janë ruajtur në folderin `Java-07-Screenshotet` në Desktop:

1. `01-lista-udhetimeve.png` – lista e udhëtimeve.
2. `02-udhetimi-3-plot.png` – detajet e udhëtimit ID 3 pa vende të lira.
3. `03-udhetimi-1-vende-lira.png` – detajet e udhëtimit ID 1 me vende të lira.

## Gjendja e dorëzimit

Kodi dhe raporti janë publikuar në degën `main` të GitHub. Demonstrimi me kolegun ende nuk është realizuar dhe mbetet për t'u bërë.
