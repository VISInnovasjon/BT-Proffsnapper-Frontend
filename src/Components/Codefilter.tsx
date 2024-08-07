import TextField from "@mui/material/TextField";
import { SetStateAction } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import translations from "./translations";

export default function CodeFilter(props: {
  ChangeHandler: React.Dispatch<SetStateAction<string>>;
  ecoCodes: Record<string, string>;
}) {
  type AutoCompleteOptions = {
    id: string;
    label: string;
  };
  const { language } = useLanguage();
  const [options, setOptions] = useState<AutoCompleteOptions[]>([]);

  useEffect(() => {
    const updateOptions = async () => {
      try {
        const opArr: AutoCompleteOptions[] = [];
        Object.entries(props.ecoCodes).forEach((entry) => {
          opArr.push({
            id: entry[0],
            label: entry[1],
          });
        });
        setOptions(opArr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    updateOptions();
  }, [props.ecoCodes]);

  const handleChange = (option: AutoCompleteOptions | null) => {
    option === null ? null : props.ChangeHandler(option.id);
  };
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      size="small"
      onChange={(_, option) => handleChange(option)}
      options={options}
      sx={{ width: 400, marginBottom: 2 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={translations[language].Økokoder}
          className=""
        />
      )}
    />
  );
}
