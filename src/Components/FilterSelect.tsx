import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import { useLanguage } from "./LanguageContext";

interface FilterSelectProps {
  onChange: (selectedProperty: string[]) => void;
  property: string;
  url: string;
  label: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  onChange,
  property,
  url,
  label,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<string[]>([]);
  const [selector, setSelector] = useState<string[]>([]);

  useEffect(() => {
    const fetchFilterTags = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setSelector(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFilterTags();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof selectedProperty>) => {
    const { value } = event.target;
    setSelectedProperty(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    onChange(selectedProperty);
  }, [selectedProperty, onChange]);

  const { languageSet } = useLanguage();

  return (
    <Box className="min-w-[200px]  ">
      <FormControl fullWidth>
        <InputLabel
          style={{
            padding: "0 4px",
            backgroundColor: "#f8f9fa",
            color: "#1e2222",
            transform: "translate(14px, -6px) scale(0.75)", // Adjust label position
          }}
          id={`${label}-select-label`}
        >
          {languageSet[property]}
        </InputLabel>

        <Select
          labelId={`${label}-select-label`}
          multiple
          value={selectedProperty}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              value={label}
              label={label}
            />
          }
          renderValue={(selected) => (
            <Box className="flex flex-wrap gap-0.5">
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {selector.map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterSelect;
