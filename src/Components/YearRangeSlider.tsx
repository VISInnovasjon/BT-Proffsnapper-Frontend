// YearRangeSlider.tsx

import React, { useState, useEffect, SetStateAction } from "react";
import { Slider, Typography } from "@mui/material";
import { useGlobalState } from "../Components/GlobalState";

const YearRangeSlider = (props: {
  updateValue: React.Dispatch<SetStateAction<number[]>>;
}) => {
  const { state, dispatch } = useGlobalState();
  const [yearRange, setYearRange] = useState<number[]>([
    2014,
    new Date().getFullYear() - 1,
  ]);
  console.log(yearRange);

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
    <div className="m-4 !text-[#1e2222] ">
      <Typography id="year-range-slider" gutterBottom>
        Velg År
      </Typography>
      <Slider
        value={yearRange}
        className="w-auto"
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-labelledby="year-range-slider"
        min={2014}
        max={new Date().getFullYear() - 1}
        marks
      />
    </div>
  );
};

export default YearRangeSlider;
