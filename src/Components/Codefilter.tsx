import TextField from "@mui/material/TextField";
import { SetStateAction } from "react";
import Autocomplete from "@mui/material/Autocomplete";
// import * as json from "../data.json";
import { economicCodes } from "../data/economicCodes";

export default function CodeFilter(props: {
  ChangeHandler: React.Dispatch<SetStateAction<string>>;
}) {
  console.log(economicCodes);
  //linje 9: lager et nytt array med elementer som har property med id og label.viktig å endre item.property som er i
  // const options = data.map((item) => ({
  //   id: item.bedrift_id,
  //   label: item.målbedrift,
  // }));
  type AutoCompleteOptions = {
    id: string;
    label: string;
  };
  const options: AutoCompleteOptions[] = Object.entries(economicCodes).map(
    (item) => ({
      id: item[0],
      label: item[1],
    })
  );
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      size="small"
      onChange={(event, option) =>
        option === null ? null : props.ChangeHandler(option.id)
      }
      options={options}
      sx={{ width: 300 }}
      style={{ backgroundColor: "transparent" }}
      //   style={{ background: "#64b5f6" }}
      renderInput={(params) => (
        <TextField {...params} label="Øk. Koder" className="" />
      )}
    />
  );
}
