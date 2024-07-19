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
  backgroundColor: active ? " #de0505" : "#f8f9fa",
  color: active ? " #FAFFFB" : "#1e2222",
  "&:hover": {
    color: active ? "#FAFFFB" : "#FAFFFB",
    backgroundColor: active ? "#E91414" : "#de0505",
  },
  borderRadius: 30,
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 16,
  paddingRight: 16,
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
