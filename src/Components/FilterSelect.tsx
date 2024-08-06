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
import translations from "./translations";

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

  const { language } = useLanguage();

  return (
    <Box className="min-w-[140px]">
      <FormControl fullWidth>
        <InputLabel id={`${label}-select-label`}>
          {translations[language][property]}
        </InputLabel>
        <Select
          labelId={`${label}-select-label`}
          multiple
          value={selectedProperty}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
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
