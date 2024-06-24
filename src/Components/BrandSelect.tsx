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

interface BrandSelectProps {
  onChange: (selectedBrands: string[]) => void;
}

const BrandSelect: React.FC<BrandSelectProps> = ({ onChange }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const brands = [
    "Annet",
    "Energi",
    "Helse",
    "IKT",
    "Industri",
    "Mat og Natur",
    "Tjenesteyting",
  ];

  const handleChange = (event: SelectChangeEvent<typeof selectedBrands>) => {
    const { value } = event.target;
    setSelectedBrands(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    onChange(selectedBrands);
  }, [selectedBrands, onChange]);

  return (
    <Box className="min-w-[90px] ml-4">
      <FormControl fullWidth>
        <InputLabel id="brand-select-label">Brand</InputLabel>
        <Select
          labelId="brand-select-label"
          multiple
          value={selectedBrands}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Brand" />}
          renderValue={(selected) => (
            <Box className="flex flex-wrap gap-0.5">
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BrandSelect;
