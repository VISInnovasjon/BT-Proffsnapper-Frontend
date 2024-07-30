import { SetStateAction, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useLanguage } from "./LanguageContext";
import translations from "./translations";

const StyledFormControlLabel = styled((props: any) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props: any) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

export default function UseRadioGroup(props: {
  onChange: React.ChangeEventHandler;
}) {
  const [radioValue, setRadioValue] = useState<string>("Accumulated");

  const { language } = useLanguage();

  return (
    <RadioGroup
      sx={{
        marginTop: 2,
        "& .MuiSvgIcon-root": {
          fontSize: {
            xs: 16, // small screen
            sm: 18, // medium screen
            md: 20, // large screen
            lg: 22, // extra large screen
          },
        },
      }}
      row={true}
      name="use-radio-group"
      defaultValue="Accumulated"
      value={radioValue}
      onChange={props.onChange}
    >
      <MyFormControlLabel
        value="Value"
        label={translations[language].radioValue}
        onClick={(e: { target: { value: SetStateAction<string> } }) => {
          setRadioValue(e.target.value);
        }}
        control={<Radio />}
      />
      <MyFormControlLabel
        value="Accumulated"
        label={translations[language].radioAccumulated}
        onClick={(e: { target: { value: SetStateAction<string> } }) => {
          setRadioValue(e.target.value);
        }}
        control={<Radio />}
      />
      <MyFormControlLabel
        value="Delta"
        label={translations[language].radioDelta}
        onClick={(e: { target: { value: SetStateAction<string> } }) => {
          setRadioValue(e.target.value);
        }}
        control={<Radio />}
      />
    </RadioGroup>
  );
}
