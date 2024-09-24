# Proffsnapper

## Oversikt

Dette er Proffsnapper. Et verktøy for innsamling, og utregning av nøkkeltall for VIS innovasjon. Applikasjonen er laget av en frontend-utvikler og en backend-utvikler.<br>
Som frontend-utvikler er brukeropplevelse (UX) og brukergrensesnitt (UI) sentralt i prosjektet.
Designet og Frontend-delen er bygget for å være responsivt, oversiktlig og brukervennlig. Laget ved hjelp av **React**, **Typescript**, **Tailwind CSS**, **Material-UI (MUI)** og **CSS** for responsiv og dynamisk design. Siden er responsivt designet med Tailwind CSS, slik at den fungerer godt på ulike skjermstørrelser.

---

### Verktøy

- **React**: Komponentbasert arkitektur for å bygge gjenbrukbare UI-elementer.
- **TypeScript**: Støtter statisk typing, noe som forbedrer utvikleropplevelsen ved å fange feil tidlig og gjøre koden enklere å vedlikeholde.
- **Tailwind CSS**: Utility-first CSS-rammeverk for rask styling og layout-håndtering.
- **Material-UI (MUI)**: Ferdiglagde UI-komponenter for raskere utvikling.
- **Egendefinert CSS**: Brukt for enkelte tilpasninger og finjusteringer.

---

### Sidefunksjoner

På denne siden kan bruker:
1. **Navigere**: Øverst på siden i Header er det en logo og en meny (Navbar). Menyen inneholder hjem, logg inn, knapp for å veksle mellom norsk og engelsk språk på siden, Bedriftsflyt og Rapporter.

2. **Logg inn**: Brukere av applikasjonen kan skrive inn sitt brukernavn og passord i innloggingsskjemaet.

3. **Bruke linjediagram**:<br>

I.  **Filter**: <br>
Datasettet er gruppert i forskjellige grupper som kan filtreres i via filter knappen. Foreløpig kan man filtrere data basert på bedriftleder's alder og kjønn,
Hvilken fase bedriften har vært i og hvilke bransje bedriftene er i.

II.  **Økokoder**: Linjediagrammet viser kun ett sett med data om gangen, basert på hvilken øko-kode som er valgt. Det er tre øko-koder lett tilgjengelig:
"Driftsresultat",
"Omsetning",
og "Sum Innskutt Egenkapital".
Andre økokoder hentes i dropdown meny markert med øko. koder.

III. **"Velg år"**-slideren En (**Slider**-komponent) som kan brukes for å velge et start og slutt år på datasettet som skal vises i linjediagrammet. Sluttår som velges, viser data for gjeldende år i nøkkeltallene øverst på siden. <br>

IV. Mulighet for å velge vekk valgte filtre ved å trykke på de i bunn av grafen.
Dette vil filtrere vekk dataen fra grafen, og vise en strek over navnet i bunn av grafen.
For å få data tilbake er det bare å trykke på navnet igjen.

V. Velge datatype:
Man kan velge å få presentert tre forskjellige verdier i datasettet:
Gjennomsnittsverdi - Akkumulert - Gjennomsnittsendring over tid (Gjennomsnitt Delta). Disse kan man velge mellom via radio knapper under selve grafen.

  
4. **Bruke tabell**: Tabellen viser bedrifter ranksjert etter høyest akkumulert verdi i gjeldene økokode.
Man kan søke opp og filtrere etter verdiene man selv ønsker i grafen ved å trykke på tre dotter i kollonen det gjelder.
Dataen i grafen er alltid for to år tilbake i tid, for å garantere at all dataen som mulig er hentet inn.
Man kan velge mellom å vise 5, 10 eller 25 bedrifter om gangen.<br>

5. **Årlig Rapport**: Her kan man generere en årsrapport (excel-fil) ved å laste opp en excelfil med organisasjonsnummer man ønsker data om. Til dette er det laget en dropbox komponent som kun tar imot en xlsx fil. 
Er man usikker på oppsettet av excel arket, kan man bruke "Få Mal"-knappen for å få en eksempelfil.

6. **Bedriftsflyt**: Her kan man legge til eller slette data fra databasen. Her kan man også trykke på knappen "Få Mal", om man er usikker på oppsettet av excel arkene for sletting eller for å legge til bedrifter i databasen.


---

