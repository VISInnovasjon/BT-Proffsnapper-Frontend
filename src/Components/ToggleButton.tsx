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
  backgroundColor: active ? "#AED9E0" : "#DFFBF5",
  color: active ? "#060316" : "#1e2222",
  "&:hover": {
    color: active ? "#060316" : "#060316",
    backgroundColor: active ? "#AED9E0" : "#AED9E0",
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
