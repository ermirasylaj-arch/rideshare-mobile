# RideShare — Java 3

## Çfarë ndërtova

Ndërtova listën responsive me tri udhëtime fiktive, kartë të ripërdorshme, faqet e detajeve dhe kërkesës së simuluar, si dhe faqen për udhëtim që nuk gjendet. Ndryshova pamjen në një dizajn të ri me ngjyra të gjelbra dhe paraqitje të përshtatur për telefon.

## Provat që bëra

### Prova 1: Lista në telefon

Nisa aplikacionin lokalisht dhe kontrollova faqen kryesore me pamje mobile 360 px në shfletues: prita tri karta pa dalje horizontale dhe pashë tri karta, me faqen brenda gjerësisë së ekranit (360 px).

### Prova 2: Detajet e udhëtimit të dytë

Hapa `/udhetimi/2`; pashë detajet e udhëtimit të Fushë Kosovës dhe vendtakimin “Stacioni i trenit”. Udhëtimi 3 shfaq gjendjen “Nuk ka vende të lira” me veprim të çaktivizuar. Te `/udhetimi/99` pashë “Udhëtimi nuk u gjet” dhe lidhjen për t'u kthyer te lista.

### Prova 3: Kërkesa në pritje

Nga detajet e udhëtimit të dytë hapa kërkesën; pashë “Simulim: Në pritje” dhe njoftimin se nuk dërgohet kërkesë reale. Lidhja e kthimit çoi te detajet dhe prej aty u ktheva te lista. Prova u bë në shfletues me pamje mobile të simuluar, jo me një koleg ose telefon fizik.

## Çfarë do të përmirësoj

Në një version tjetër do të shtoja filtrim sipas orës së nisjes; kjo demonstrim nuk ka ende kërkim ose të dhëna të ruajtura.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)

Përdora AI për të krijuar strukturën fillestare të faqeve, stilet dhe udhëzimet e testimit. E kontrollova rezultatin me udhëzimet e detyrës, ndërtimin lokal dhe shfletuesin; testi me një koleg ose me telefon fizik nuk u bë.
