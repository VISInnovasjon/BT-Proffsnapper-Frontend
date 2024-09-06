// YearRangeSlider.tsx

import React, { useState, useEffect, SetStateAction } from "react";
import { Slider, Typography } from "@mui/material";
import { useGlobalState } from "../Components/GlobalState";
import { useLanguage } from "./LanguageContext";

const YearRangeSlider = (props: {
  updateValue: React.Dispatch<SetStateAction<number[]>>;
}) => {
  const { dispatch } = useGlobalState();
  const [yearRange, setYearRange] = useState<number[]>([
    2014,
    new Date().getFullYear() - 1,
  ]);

  const { languageSet } = useLanguage();

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setYearRange(newValue as number[]);
  };
  useEffect(() => {
    const minVal = yearRange[0];
    const maxVal = yearRange[1];
    const fullRange = [];
    for (let i = minVal; i <= maxVal; i++) {
      fullRange.push(i);
    }
    props.updateValue(fullRange);
  }, [yearRange]);

  useEffect(() => {
    dispatch({ type: "SET_YEAR_RANGE", payload: yearRange });
  }, [yearRange, dispatch]);

  return (
    <div className="mx-4">
      <Typography
        sx={{ fontWeight: "bold", fontSize: "medium" }}
        id="year-range-slider"
        gutterBottom
      >
        {languageSet.yearRangeSlider}
      </Typography>
      <Slider
        value={yearRange}
        className="w-auto"
        onChange={handleSliderChange}
        valueLabelDisplay="on"
        aria-labelledby="year-range-slider"
        min={2014}
        max={new Date().getFullYear() - 1}
        marks
        sx={{
          height: 2,
          "& .MuiSlider-thumb": {
            backgroundColor: "#022447",
            width: 20,
            height: 20,
            "&:hover": {
              boxShadow: "0px 0px 0px 8px rgba(59, 130, 246, 0.16)",
            },
          },
          "& .MuiSlider-track": {
            backgroundColor: "#ffffff",
            height: 4,
            border: "1px solid #BFBFC0", // Customize the border color
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#BFBFC0",
            height: 2,
          },
          "& .MuiSlider-mark": {
            backgroundColor: "#022447", // Remove background for marks
            fontSize: "0.75rem",
          },
          // Customize the value label
          "& .MuiSlider-valueLabel": {
            backgroundColor: "#de0505", // Change this to your desired background color
            color: "#ffffff", // Text color in the value label
            borderRadius: "9999px",
          },
        }}
      />
    </div>
  );
};

export default YearRangeSlider;
