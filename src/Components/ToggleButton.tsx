// ToggleButton.tsx
import React, { MouseEventHandler } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export interface ToggleButtonProps {
  label: string;
  isActive: boolean;
  val: string;
  onClick: MouseEventHandler;
}

const StyledButton = styled(Button)<{ active: boolean }>(({ active }) => ({
  backgroundColor: active ? "#2E5F65" : "#DFFBF5",
  color: active ? "#FAFFFB" : "#1e2222",
  "&:hover": {
    color: active ? "#FAFFFB" : "#FAFFFB",
    backgroundColor: active ? "#2E5F65" : "#2E5F65",
  },
}));

const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  isActive,
  val,
  onClick,
}) => {
  return (
    <StyledButton active={isActive} onClick={onClick} value={val}>
      {label}
    </StyledButton>
  );
};

export default ToggleButton;
