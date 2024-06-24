import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import AgeGroupSelect from "../Components/AgeGroupSelect";
import FaseSelect from "../Components/FaseSelect";
import BrandSelect from "../Components/BrandSelect";
import LineChartComponent from "../Components/LineChart";
import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import YearRangeSlider from "../Components/YearRangeSlider";
import CodeFilter from "../Components/Codefilter";
import ToggleButton from "../Components/ToggleButton";
import UseRadioGroup from "../Components/UseRadioGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DataGridComponent } from "../Components/Table";

type ValueRecord = Record<string, number | string>;

type CollectedValues = Record<string, ValueRecord>;

type YearlyValues = Record<string, CollectedValues | number>;

type KeyedValues = Record<string, YearlyValueObject[]>;

type ValueObject = {
  Value: number;
  Delta: number;
  Description: string;
} & ValueRecord;
type CodeValueObject = {
  [key: string]: ValueObject;
} & CollectedValues;

type YearlyValueObject = {
  Year: number;
  values: CodeValueObject;
} & YearlyValues;
type ButtonTarget = {
  value: string;
};

const TestPage: React.FC = () => {
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [selectedFases, setSelectedFases] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [data, setData] = useState<KeyedValues>({});
  const [ecoKey, setEcoKey] = useState<string>("DR");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const [monetaryKey, setMonetaryKey] = useState<string>("Value");
  const [yearRange, setYearRange] = useState<number[]>([]);
  console.log(yearRange);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("mockData.json");
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (filter: string) => {
    setFilters((prevFilters) => [...prevFilters, filter]);
    handleClose();
  };

  const handleRemoveFilter = (filter: string) => {
    setFilters((prevFilters) => prevFilters.filter((f) => f !== filter));
    if (filter === "Age Group") setSelectedAgeGroups([]);
    if (filter === "Fase") setSelectedFases([]);
    if (filter === "Brand") setSelectedBrands([]);
  };

  const handleButtonClick = (
    option: string,
    target: EventTarget & ButtonTarget
  ) => {
    console.log(target);
    setActiveButton((prev) => (prev === option ? null : option));
    setEcoKey(target.value);
  };

  const [activeButton, setActiveButton] = useState<string | null>("option1");

  return (
    <div className="pt-32 container mx-auto !text-[#1e2222] text-2vw sm:text-base md:text-lg lg:text-lg xl:text-xl ">
      <div className=" flex flex-col justify-evenly lg:flex-row mr-4">
        <div className="container flex flex-col text-start ml-8 ">
          <h3 className=" font-semibold mb-2 mt-1">
            Choose filters to display data:
          </h3>
          <p className="mb-4">
            Use the button below to select and add filters<br></br> for Age
            Group, Fase, and Brand.<br></br>You can remove filters by clicking
            the X button next to each <br></br>filter.
          </p>
          <div className="">
            <Button
              style={{
                backgroundColor: "#2E5F65",
                color: "#FAFFFB",
                padding: 6,
              }}
              variant="contained"
              onClick={handleClick}
              size={"small"}
            >
              Choose filter <ArrowDropDownIcon />
            </Button>
          </div>
          <Menu
            className=""
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {!filters.includes("Age Group") && (
              <MenuItem onClick={() => handleMenuItemClick("Age Group")}>
                Age Group
              </MenuItem>
            )}

            {!filters.includes("Fase") && (
              <MenuItem onClick={() => handleMenuItemClick("Fase")}>
                Fase
              </MenuItem>
            )}
            {!filters.includes("Brand") && (
              <MenuItem onClick={() => handleMenuItemClick("Brand")}>
                Brand
              </MenuItem>
            )}
          </Menu>

          <div className="mt-6 flex justify-start ">
            {filters.map((filter) => (
              <div key={filter} className="flex items-center mb-4">
                {filter === "Age Group" && (
                  <AgeGroupSelect onChange={setSelectedAgeGroups} />
                )}

                {filter === "Fase" && (
                  <FaseSelect onChange={setSelectedFases} />
                )}
                {filter === "Brand" && (
                  <BrandSelect onChange={setSelectedBrands} />
                )}
                <IconButton
                  onClick={() => handleRemoveFilter(filter)}
                  aria-label="remove filter"
                >
                  <CloseIcon />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col  sm:flex-row ">
          <div className="flex justify-center">
            <div className="m-2 ">
              <ToggleButton
                label="Driftsresultat"
                val="DR"
                isActive={activeButton === "option1"}
                onClick={(e) => {
                  handleButtonClick(
                    "option1",
                    e.target as EventTarget & ButtonTarget
                  );
                }}
              />
            </div>
            <div className="m-2">
              <ToggleButton
                label="Omsetning"
                val="SDI"
                isActive={activeButton === "option2"}
                onClick={(e) =>
                  handleButtonClick(
                    "option2",
                    e.target as EventTarget & ButtonTarget
                  )
                }
              />
            </div>
          </div>
          <div className="flex m-2 justify-center">
            <CodeFilter ChangeHandler={setEcoKey} />
          </div>
        </div>
      </div>
      <div className="">
        <div className="m-4 !text-2vw !sm:text-base !md:text-lg !lg:text-lg !xl:text-xl">
          <YearRangeSlider updateValue={setYearRange} />
          <LineChartComponent
            data={data}
            selectedAgeGroups={selectedAgeGroups}
            selectedFases={selectedFases}
            selectedBrands={selectedBrands}
            ecoKey={ecoKey}
            monetaryKey={monetaryKey}
            yearRange={yearRange}
          />
          <div className=" flex flex-col items-center text-lg ">
            <UseRadioGroup
              onChange={(e) => {
                setMonetaryKey(
                  e.target.value ? e.target.value : e.target.defaultValue
                );
              }}
            />
            <div className="bg-[#AED9E0] text-[#060316] ">
              <DataGridComponent ecoCode={ecoKey} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
