import React, { useState, MouseEvent } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { useLanguage } from "./LanguageContext";

type Language = "en" | "nor"; // language codes

const LanguageDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { languageSet, setLanguage } = useLanguage(); // Use context to get/set language

  // Open menu
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu and set language
  const handleClose = (lang: Language) => {
    setLanguage(lang);
    setAnchorEl(null);
  };

  // Get the current language text for the button
  const currentLanguage = languageSet.chooseLanguage;

  return (
    <div className="flex items-center ">
      <Button
        sx={{
          backgroundColor: "transparent",

          "&:hover": {
            backgroundColor: "transparent", // Ensures the hover state is also transparent
          },
        }}
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="1.5em"
          viewBox="0 0 256 256"
        >
          <path
            fill="white"
            d="M128 20a108 108 0 1 0 108 108A108.12 108.12 0 0 0 128 20m0 187a113.4 113.4 0 0 1-20.39-35h40.82a117 117 0 0 1-10 20.77A108.6 108.6 0 0 1 128 207m-26.49-59a135.4 135.4 0 0 1 0-40h53a135.4 135.4 0 0 1 0 40ZM44 128a83.5 83.5 0 0 1 2.43-20h30.82a160.6 160.6 0 0 0 0 40H46.43A83.5 83.5 0 0 1 44 128m84-79a113.4 113.4 0 0 1 20.39 35h-40.8a117 117 0 0 1 10-20.77A108.6 108.6 0 0 1 128 49m50.73 59h30.82a83.5 83.5 0 0 1 0 40h-30.8a160.6 160.6 0 0 0 0-40Zm20.77-24h-25.79a140.8 140.8 0 0 0-15.5-34.36A84.5 84.5 0 0 1 199.52 84ZM97.79 49.64A140.8 140.8 0 0 0 82.29 84H56.48a84.5 84.5 0 0 1 41.31-34.36M56.48 172h25.81a140.8 140.8 0 0 0 15.5 34.36A84.5 84.5 0 0 1 56.48 172m101.73 34.36a140.8 140.8 0 0 0 15.5-34.36h25.81a84.5 84.5 0 0 1-41.31 34.36"
          />
        </svg>
        {currentLanguage} <ArrowDropDown />
        {/* Displaying the language text based on current language */}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={{}}
        disableScrollLock // Prevents issues with scrolling
      >
        <MenuItem onClick={() => handleClose("en")}>
          {"English"} {/* Display language for English */}
        </MenuItem>

        <MenuItem onClick={() => handleClose("nor")}>
          {"Norsk"} {/* Display langauge for Norsk */}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageDropdown;
