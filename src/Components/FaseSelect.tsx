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

interface FaseSelectProps {
  onChange: (selectedFases: string[]) => void;
}

const FaseSelect: React.FC<FaseSelectProps> = ({ onChange }) => {
  const [selectedFases, setSelectedFases] = useState<string[]>([]);
  const fases = [
    "Alumni",
    "Preinkubasjon",
    "Postinkubasjon",
    "Inkubatorbedrift",
    "Forr.messig innovasjon",
    "Skalering",
  ];

  const handleChange = (event: SelectChangeEvent<typeof selectedFases>) => {
    const { value } = event.target;
    setSelectedFases(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    onChange(selectedFases);
  }, [selectedFases, onChange]);

  const { language } = useLanguage();

  return (
    <Box className="min-w-[140px] text-center">
      <FormControl fullWidth>
        <InputLabel id="fase-select-label">
          {translations[language].fase}
        </InputLabel>
        <Select
          labelId="fase-select-label"
          multiple
          value={selectedFases}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Phase" />}
          renderValue={(selected) => (
            <Box className="flex flex-wrap gap-0.5">
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {fases.map((fase) => (
            <MenuItem key={fase} value={fase}>
              {fase}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FaseSelect;
