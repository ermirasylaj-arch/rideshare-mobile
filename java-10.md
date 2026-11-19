# RideShare — Java 10 (pjesa e shoferit)

## Çfarë u ndërtua

Paneli i shoferit lexon kërkesat e ruajtura për udhëtimet që ai zotëron dhe i rifreskon automatikisht çdo 5 sekonda. Kur lidhja ndërpritet, ndërfaqja ruan të dhënat e fundit dhe shfaq paralajmërimin “Po rilidhemi”. Shoferi mund të pranojë një kërkesë në pritje; përditësimi i statusit dhe zbritja e vendit kryhen në një deklaratë atomike në databazë. Pranimi i përsëritur nuk e zbrit vendin sërish dhe kërkesa nuk pranohet kur nuk ka vende.

U shtua migrimi `schema-java10.sql`; ekzekutohet vetëm në databazën e duhur dhe pas `schema-java05.sql`. Udhëtimi duhet të ketë `shofer_id` të shoferit të kyçur.

## Kufiri i kësaj pune

U implementua vetëm roli i shoferit, siç u kërkua. Ekrani ekzistues i udhëtarit është ende simulim dhe nuk krijon kërkesë reale; prandaj lista e shoferit mbushet kur një kërkesë krijohet nga një rrjedhë tjetër. Krijimi dhe pamja e udhëtarit nuk u ndryshuan.

## Verifikimi

U kontrollua build-i dhe TypeScript-i me `npm run build`. Nuk u ekzekutua migrimi dhe nuk u provuan leximi, pranimi, gara e dy pranimeve ose rilidhja kundër Neon-it; këto prova kërkojnë databazën e konfiguruar dhe dy sesione të ndryshme.
