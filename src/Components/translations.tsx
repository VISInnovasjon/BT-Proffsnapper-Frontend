// const LanguageLibrary = {
//   lang: {
//     nor: {
//       CompanyInfo: "Bedrifts Info",
//       Accumulated: "Akkumulert",
//       AgeGroup: "Aldersgruppe",
//     },
//     en: {
//       CompanyInfo: "Company Info",
//       Accumulated: "Accumulated",
//       AgeGroup: "Agegroup",
//     },
//   },
// };
// export default LanguageLibrary;
interface Translations {
  [key: string]: {
    chooseLanguage: string;
    keyFiguresHeader: string;
    yearRangeSlider: string;
    headerMainPage: string;
    paragraphMainPage: string;
    filter: string;
    Økokoder: string;
    agegroup: string;
    brand: string;
    fase: string;
    home: string;
    yearlyRapport: string;
    companyFlow: string;
    getFullView: string;
    radioValue: string;
    radioAccumulated: string;
    radioDelta: string;
    toggleDrift: string;
    toggleOmsetning: string;
    toggleSik: string;
    dbyrText1: string;
    dbyrText2: string;
    dbyrText3: string;
    dbyrText4: string;
    gyrPagetext1: string;
    gyrPagetext2: string;
    dbcfText1: string;
    dbcfText2: string;
    dbcfText3: string;
    dbcfText4: string;
    addCompanyData: string;
    deleteCompanyData: string;
    headerCompanyData: string;
    dbcfBackButton: string;
  };
}

const translations: Translations = {
  en: {
    /*translation for LanguageDropdown.tsx*/
    chooseLanguage: "English",

    /*translation for KeyFigures.tsx*/
    keyFiguresHeader: "Key Figures",

    /*translation for yearRangeSlider.tsx.tsx*/
    yearRangeSlider: "Choose Year",

    /*translation for mainpage.tsx*/
    headerMainPage:
      "Choose filters to display data:" /*translation for mainpage.tsx*/,
    paragraphMainPage:
      "Use the button below to select and add filters for \nAge Group, Fase, and Brand. \nYou can remove filters by clicking the X button next to each filter.",
    filter: "CHOOSE FILTER",

    /*translation for the autocomplete on mainpage.tsx*/
    Økokoder: "Eco. Codes",

    /*translation for filterbutton on mainpage.tsx*/
    agegroup: "Agegroup",
    brand: "Industry",
    fase: "Phase",

    /*translation for navbar on header*/
    home: "Home",
    yearlyRapport: "Yearly Rapport",
    companyFlow: "Company Flow",
    getFullView: "Get full view",

    /*translation for useRadioGroup.tsx*/
    radioValue: "Avg. Value",
    radioAccumulated: "Accumulated",
    radioDelta: "Delta",

    /*translation for togglebuttons on mainpage.tsx*/
    toggleDrift: "Operating Result",
    toggleOmsetning: "Turnover",
    toggleSik: "SIK",

    /*translation for YRDropbox and page*/
    dbyrText1: "Choose File",
    dbyrText2: "Or drag and drop a file here",
    dbyrText3: "Accepted file types: .XLS, .XLSX",
    dbyrText4: "Updating File...",
    gyrPagetext1: "Get Yearly Rapport",
    gyrPagetext2: "Get Template",

    /*translation for CFDropbox and page*/
    dbcfText1: "Choose File",
    dbcfText2: "Or drag and drop a file here",
    dbcfText3: "Accepted file types: .XLS, .XLSX",
    dbcfText4: "Updating File...",
    headerCompanyData: "Update Company Data Flow",
    addCompanyData: "Add Company Data",
    deleteCompanyData: "Delete Company Data",
    dbcfBackButton: "Back",
  },

  nor: {
    /*translation for LanguageDropdown.tsx*/
    chooseLanguage: "Norsk",

    /*translation for yearRangeSlider.tsx.tsx*/
    keyFiguresHeader: "Nøkkeltall",

    /*translation for yearRangeSlider.tsx.tsx*/
    yearRangeSlider: "Velg År",

    /*translation for mainpage.tsx*/
    headerMainPage: "Velg filtre for å vise data:",
    paragraphMainPage:
      "Bruk knappen nedenfor for å velge  og legge til filtre for \nAldersgruppe, Fase og Brand. \nDu kan fjerne filtre ved å klikke på X-knappen ved siden av hvert filter.",
    filter: "VELG FILTER",

    /*translation for the autocomplete on mainpage.tsx*/
    Økokoder: "Øko. Koder",

    /*translation for filterbutton on mainpage.tsx*/
    agegroup: "Aldersgruppe",
    brand: "Bransje",
    fase: "Fase",

    /*translation for navbar on header*/
    home: "Hjem",
    yearlyRapport: "Årlig Rapport",
    companyFlow: "Bedriftsflyt",
    getFullView: "Få full oversikt",

    /*translation for useRadioGroup.tsx*/
    radioValue: "Gj. Snitt Verdi",
    radioAccumulated: "Akkumulert",
    radioDelta: "Delta",

    /*translation for togglebuttons on mainpage.tsx*/
    toggleDrift: "Driftsresultat",
    toggleOmsetning: "Omsetning",
    toggleSik: "SIK",

    /*translation for YRDropbox and page*/
    dbyrText1: "Velg Fil",
    dbyrText2: "Eller dra og slipp en fil her",
    dbyrText3: "Aksepterte filtyper: .XLS, .XLSX",
    dbyrText4: "Oppdaterer Fil...",
    gyrPagetext1: "Hent Årlig Rapport",
    gyrPagetext2: "Hent Mal",

    /*translation for CFDropbox and page*/
    dbcfText1: "Velg Fil",
    dbcfText2: "Eller dra og slipp en fil her",
    dbcfText3: "Aksepterte filtyper: .XLS, .XLSX",
    dbcfText4: "Oppdaterer Fil...",
    headerCompanyData: "Oppdater Bedrifts Dataflyt",
    addCompanyData: "Legg til Bedriftsdata",
    deleteCompanyData: "Slett Bedriftsdata",
    dbcfBackButton: "Tilbake",
  },
};

export default translations;
