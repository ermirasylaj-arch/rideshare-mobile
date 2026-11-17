# Java 07 – Case 2: No seats

## Rasti im (P7-876, GitHub: ermirasylaj-arch)

Rasti im është Case 2 – No seats. Repository: https://github.com/ermirasylaj-arch/rideshare-mobile

## Parashikimi

Kur udhëtimi ka zero vende të lira, ai duhet të shfaqet në listë si “Plot”. Përdoruesi duhet të mund t'i shohë detajet, por nuk duhet të mund të kërkojë vend.

## Ndryshimi i ri

U përditësua paraqitja e udhëtimeve të plota. Lidhja “Shiko udhëtimin” mbetet e dukshme, ndërsa në detaje shfaqet “Nuk ka vende të lira” dhe nuk shfaqet butoni “Kërko vend”.

## Ndihma nga AI

U përdor GitHub Copilot dhe ChatGPT për analizimin e problemit, planifikimin e ndryshimit, kontrollimin e kodit dhe përgatitjen e raportit. Ndryshimet u kontrolluan dhe u testuan manualisht.

## Dy probleme

1. Udhëtimi me zero vende nuk shfaqej si duhet në listë ose nuk kishte qasje të qartë te detajet.
2. Në udhëtimin e plotë nuk duhet të shfaqet mundësia për të kërkuar vend.

## Korrigjimi (arsyeja)

U ndryshua kushti i paraqitjes së udhëtimit që udhëtimet me zero vende të mos fshihen nga lista. Gjithashtu, kërkesa për vend shfaqet vetëm kur ka vende të lira.

Skedari: `src/components/KartaUdhetimi.tsx`

## Prova 1

- Hapat: U hap lista e udhëtimeve dhe u kontrollua udhëtimi ID 3, Lipjan – AAB, ora 07:45, me zero vende.
- Pritshmëria: Udhëtimi të shfaqet me statusin “Plot” dhe lidhjen “Shiko udhëtimin”.
- Vëzhgimi: Udhëtimi u shfaq me statusin “Plot” dhe lidhja “Shiko udhëtimin” ishte e dukshme.

## Prova 2

- Hapat: U hapën detajet e udhëtimit ID 3, me zero vende të lira.
- Pritshmëria: Të shfaqet “Nuk ka vende të lira” dhe të mos shfaqet “Kërko vend”.
- Vëzhgimi: Mesazhi “Nuk ka vende të lira” u shfaq dhe butoni “Kërko vend” nuk u shfaq.

## Prova 3

- Hapat: U hapën detajet e udhëtimit ID 1, Prishtinë – AAB, ora 08:00, me dy vende të lira.
- Pritshmëria: Të shfaqet mundësia për të kërkuar vend.
- Vëzhgimi: Butoni “Kërko vend” u shfaq siç pritej.

## Kontrolli i databazës

U ekzekutua pyetja SQL:

```sql
SELECT id, vende FROM udhetimet WHERE id = '3';
```

Rezultati konfirmoi se udhëtimi ID 3 kishte vende = 0.

## Kontrollet teknike

- Next.js u përditësua në versionin 16.4.6.
- `npx tsc --noEmit --incremental false` përfundoi me sukses.
- `npm run build` përfundoi me sukses.

## Dëshmitë

Screenshot-et e testimit janë ruajtur në folderin `Java-07-Screenshotet` në Desktop:

1. `01-lista-udhetimeve.png`
2. `02-udhetimi-3-plot.png`
3. `03-udhetimi-1-vende-lira.png`

## Gjendja e dorëzimit

Kodi dhe raporti janë publikuar në degën `main` të GitHub. Demonstrimi me kolegun ende nuk është realizuar.