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

interface AgeGroupSelectProps {
  onChange: (selectedAgeGroups: string[]) => void;
}

const AgeGroupSelect: React.FC<AgeGroupSelectProps> = ({ onChange }) => {
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const ageGroups = [
    "18-29",
    "30-39",
    "40-49",
    "50-59",
    "60-69",
    "70-79",
    "80+",
  ];

  const handleChange = (event: SelectChangeEvent<typeof selectedAgeGroups>) => {
    const { value } = event.target;
    setSelectedAgeGroups(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    onChange(selectedAgeGroups);
  }, [selectedAgeGroups, onChange]);

  const { language } = useLanguage();

  return (
    <Box className="min-w-[140px]">
      <FormControl fullWidth>
        <InputLabel id="agegroup-select-label">
          {translations[language].agegroup}
        </InputLabel>
        <Select
          labelId="agegroup-select-label"
          multiple
          value={selectedAgeGroups}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Aldersgruppe" />
          }
          renderValue={(selected) => (
            <Box className="flex flex-wrap gap-0.5">
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {ageGroups.map((ageGroup) => (
            <MenuItem key={ageGroup} value={ageGroup}>
              {ageGroup}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default AgeGroupSelect;
