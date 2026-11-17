# RideShare · Java 7

## Rasti im

Kodi: P7-876

GitHub: ermirasylaj-arch

Skenari i zgjedhur (numri dhe titulli, nga Rastet 1–5): Case 2 – No seats

ID i udhëtimit në projektin tim: 3

Të dhënat fiktive të rastit: Udhëtimi Lipjan – AAB, ora 07:45, nisja nga Qendra e qytetit, me 0 vende të lira.

## Parashikimi

Kur udhëtimi ka zero vende të lira, ai duhet të shfaqet në listë si “Plot”. Përdoruesi duhet të mund t'i shohë detajet, por nuk duhet të mund të kërkojë vend.

## Dy probleme

1. Udhëtimi me zero vende nuk shfaqej si duhet në listë ose nuk kishte qasje të qartë te detajet.
2. Në udhëtimin e plotë nuk duhet të shfaqet mundësia për të kërkuar vend.

## Korrigjimi

Skedari: src/components/KartaUdhetimi.tsx

U ndryshua kushti i paraqitjes së udhëtimit që udhëtimet me zero vende të mos fshihen nga lista. Lidhja “Shiko udhëtimin” mbetet e dukshme. Kërkesa për vend shfaqet vetëm kur ka vende të lira.

## Versionet

Para: https://github.com/ermirasylaj-arch/rideshare-mobile/commit/0ed4f3988c94fb3bee651f1ace020a25e143d1be

Pas: https://github.com/ermirasylaj-arch/rideshare-mobile/commit/54a621fc9d6a8758aa74db43ba6c4a46b9f6b5a7

## Provat që bëra

### Prova 1

Hapat: U hap lista e udhëtimeve dhe u kontrollua udhëtimi ID 3, Lipjan – AAB, ora 07:45, me zero vende.

Pritshmëria: Udhëtimi të shfaqet me statusin “Plot” dhe lidhjen “Shiko udhëtimin”.

Vëzhgimi: Udhëtimi u shfaq me statusin “Plot” dhe lidhja “Shiko udhëtimin” ishte e dukshme.

### Prova 2

Hapat: U hapën detajet e udhëtimit ID 3, me zero vende të lira.

Pritshmëria: Të shfaqet “Nuk ka vende të lira” dhe të mos shfaqet “Kërko vend”.

Vëzhgimi: Mesazhi “Nuk ka vende të lira” u shfaq dhe butoni “Kërko vend” nuk u shfaq.

### Prova 3

Hapat: U hapën detajet e udhëtimit ID 1, Prishtinë – AAB, ora 08:00, me dy vende të lira.

Pritshmëria: Të shfaqet mundësia për të kërkuar vend.

Vëzhgimi: Butoni “Kërko vend” u shfaq siç pritej.

## Ndryshimi i ri

U përditësua paraqitja e udhëtimeve të plota. Udhëtimet me zero vende shfaqen në listë si “Plot”. Përdoruesi mund t'i hapë detajet, por nuk mund të kërkojë vend kur nuk ka vende të lira.

## Ndihma nga AI

U përdor GitHub Copilot dhe ChatGPT për analizimin e problemit, planifikimin e ndryshimit, kontrollimin e kodit dhe përgatitjen e raportit. Ndryshimet u kontrolluan dhe u testuan manualisht.

## Dëshmitë

Tri screenshot-et e testimit janë ruajtur në folderin `Java-07-Screenshotet` në Desktop:

1. `01-lista-udhetimeve.png`
2. `02-udhetimi-3-plot.png`
3. `03-udhetimi-1-vende-lira.png`

## Gjendja e dorëzimit

Ndryshimet e Javës 7 janë publikuar në degën `main` të GitHub. Demonstrimi me kolegun ende nuk është realizuar.
