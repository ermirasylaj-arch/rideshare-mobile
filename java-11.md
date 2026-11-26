# RideShare — Java 11 (njoftimet personale)

## Çfarë u ndërtua

Përgjigjja e shoferit krijon një njoftim të ruajtur për udhëtarin që bëri kërkesën. Pranimi dhe njoftimi ruhen në të njëjtën transaksion, ndërsa `kerkesa_id` unik mbron nga njoftime të dyfishta. Udhëtari e sheh listën, numrin e palexuar dhe toast-in vetëm për ID të re gjatë sesionit.

## Udhëtimi i leximit

Njoftimet lexohen nga API me të dhënat e sesionit, jo nga ID të dërguar nga klienti. Klikimi shënon `lexuar_me` vetëm për marrësin aktual, pastaj hap kërkesën e saktë. Leximi i përsëritur nuk ndryshon kërkesën dhe refuzon ID-të që nuk i përkasin përdoruesit.

## Migrimi

Ekzekuto `schema-java11.sql` pas `schema-java10.sql` në Neon. Do të shtojë tabelën `njoftimet` dhe një indeks për marrësin dhe gjendjen e leximit.

## Provat

- Rasti 1: pranim real, një rekord njoftimi dhe një numër i palexuar.
- Rasti 2: hapja shënon leximin dhe njoftimi mbetet pas Refresh.
- Rasti 3: rilidhja pas offline merr vetëm një rekord; dy lexime përsëritëse nuk shtojnë toast të ri.

## Kufizimet

Web Push mbetet opsional. Bazuar në polling çdo 5 sekonda, lista vazhdon të punojë pa njoftime të sistemit.
