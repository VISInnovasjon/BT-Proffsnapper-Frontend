import { FC } from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface UseButtonProps extends ButtonProps {
  sx?: object;
}

const UseButton: FC<UseButtonProps> = ({
  children,
  variant = "contained",
  color = "primary",
  size = "medium",
  sx = {},
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      sx={{
        backgroundColor: "#de0505", // Primary background color
        "&:hover": {
          backgroundColor: "#E91414", // Primary Background color on hover
        },

        color: "white",
        paddingY: "0.5rem",
        paddingX: "1.5rem",
        borderRadius: "9999px",
        marginTop: "5px",
        fontSize: {
          sm: "14px", // Font size for small screens
          md: "16px", // Font size for medium screens
          lg: "16px", // Font size for large screens
          xl: "18px", // Font size for extra large screens
        },

        fontFamily: "Poppins, Arial, sans-serif",

        ...sx, //
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default UseButton;
