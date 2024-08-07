import React, { useState, useEffect } from "react";
import LineChartComponent, { KeyedValues } from "../Components/LineChart";
import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import YearRangeSlider from "../Components/YearRangeSlider";
import CodeFilter from "../Components/Codefilter";
import ToggleButton from "../Components/ToggleButton";
import UseRadioGroup from "../Components/UseRadioGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DataGridComponent } from "../Components/Table";
import "../index.css";
import KeyFigures from "../Components/KeyFigures";
import { useLanguage } from "../Components/LanguageContext";
import translations from "../Components/translations";
import FilterSelect from "../Components/FilterSelect";

type ButtonTarget = {
  value: string;
};
type RadioTarget = {
  value: string | null;
  defaultValue: string;
};

const MainPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [selectedFases, setSelectedFases] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSexes, setSelectedSexes] = useState<string[]>([]);
  const [data, setData] = useState<KeyedValues>({});
  const [ecoKey, setEcoKey] = useState<string>("DR");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const [monetaryKey, setMonetaryKey] = useState<string>("Accumulated");
  const [yearRange, setYearRange] = useState<number[]>([]);
  const [economicCodes, setEconomicCodes] = useState<Record<string, string>>(
    {}
  );
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = import.meta.env.VITE_API_GRAPHDATA_URL;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchEcoCodes = async () => {
      try {
        const searchParams = new URLSearchParams({
          Language: language.toString(),
        });
        const url =
          import.meta.env.VITE_API_ECOCODEDATA_URL +
          "?" +
          searchParams.toString();

        const response = await fetch(url);
        const data: Record<string, string> = await response.json();
        setEconomicCodes(data);
      } catch (err) {
        console.log("error fetching eco codes", err);
      }
    };
    fetchEcoCodes();
  }, [language]);

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
    if (filter === "Phase") setSelectedFases([]);
    if (filter === "Industry") setSelectedBrands([]);
    if (filter === "Sexes") setSelectedSexes([]);
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
    <div className="pt-32 container mx-auto text-[#1e2222] text-2vw sm:text-base md:text-lg lg:text-lg xl:text-xl ">
      <KeyFigures year={yearRange[yearRange.length - 1]} />
      <div className=" flex flex-col justify-evenly lg:flex-row ">
        <div className="container flex flex-col  pl-4">
          <h3 className="my-2 text-start font-bold">
            {translations[language].headerMainPage}
          </h3>
          <p className="mb-4 whitespace-pre-wrap text-start font-semibold  ">
            {translations[language].paragraphMainPage}
          </p>
          <div className="flex justify-start">
            <Button
              style={{
                backgroundColor: " #de0505",
                color: "#FAFFFB",
                padding: 5,
              }}
              variant="contained"
              onClick={handleClick}
              size={"small"}
            >
              {translations[language].filter} <ArrowDropDownIcon />
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
                {translations[language].agegroup}
              </MenuItem>
            )}

            {!filters.includes("Phase") && (
              <MenuItem onClick={() => handleMenuItemClick("Phase")}>
                {translations[language].fase}
              </MenuItem>
            )}
            {!filters.includes("Industry") && (
              <MenuItem onClick={() => handleMenuItemClick("Industry")}>
                {translations[language].brand}
              </MenuItem>
            )}
            {!filters.includes("Sexes") && (
              <MenuItem onClick={() => handleMenuItemClick("Sexes")}>
                {translations[language].sex}
              </MenuItem>
            )}
          </Menu>

          <div className="mt-6 flex justify-start flex-col md:flex-row lg:flex-row ">
            {filters.map((filter) => (
              <div key={filter} className="flex items-center mb-2">
                {filter === "Age Group" && (
                  <FilterSelect
                    onChange={setSelectedAgeGroups}
                    label="Age Group"
                    property="agegroup"
                    url={import.meta.env.VITE_API_AGEGROUPS_URL}
                  />
                )}

                {filter === "Phase" && (
                  <FilterSelect
                    onChange={setSelectedFases}
                    label="Fases"
                    property="fase"
                    url={import.meta.env.VITE_API_FASES_URL}
                  />
                )}
                {filter === "Industry" && (
                  <FilterSelect
                    onChange={setSelectedBrands}
                    label="Brands"
                    property="brand"
                    url={import.meta.env.VITE_API_BRANCHNAMES_URL}
                  />
                )}
                {filter === "Sexes" && (
                  <FilterSelect
                    onChange={setSelectedSexes}
                    label="Sex"
                    property="sex"
                    url={import.meta.env.VITE_API_SEXES_URL}
                  />
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
        <div className="flex flex-col  whitespace-nowrap md:  md:flex-row ">
          <div className="flex justify-center  ">
            <div className="m-2 ">
              <ToggleButton
                label={translations[language].toggleDrift}
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
                label={translations[language].toggleOmsetning}
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
            <div className="m-2">
              <ToggleButton
                label={translations[language].toggleSik}
                val="SIK"
                isActive={activeButton === "option3"}
                onClick={(e) =>
                  handleButtonClick(
                    "option3",
                    e.target as EventTarget & ButtonTarget
                  )
                }
              />
            </div>
          </div>
          <div className="flex justify-center mx-2 mt-2 mb-6  ">
            <CodeFilter ChangeHandler={setEcoKey} ecoCodes={economicCodes} />
          </div>
        </div>
      </div>
      <div className="mx-2">
        <div className="w-full text-center ">
          <div className="mx-6 mt-10">
            <YearRangeSlider updateValue={setYearRange} />
          </div>
          <div className="">
            <LineChartComponent
              data={data}
              loading={loading}
              selectedAgeGroups={selectedAgeGroups}
              selectedFases={selectedFases}
              selectedBrands={selectedBrands}
              selectedSexes={selectedSexes}
              ecoKey={ecoKey}
              monetaryKey={monetaryKey}
              yearRange={yearRange}
              economicCodes={economicCodes}
            />
          </div>
          <div className="inline-flex  sm:justify-center  ">
            <UseRadioGroup
              onChange={(e) => {
                const target = e.target as EventTarget & Element & RadioTarget;
                setMonetaryKey(
                  target.value ? target.value : target.defaultValue
                );
              }}
            />
          </div>
          <div className="bg-[#f8f6f6] text-[#1e2222] ">
            <DataGridComponent ecoCode={ecoKey} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
