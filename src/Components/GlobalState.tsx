import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define the shape of the global state
type GlobalStateType = {
  selectedAgeGroups: string[];
  selectedFases: string[];
  selectedBrands: string[];
  yearRange: number[];
};

const initialState: GlobalStateType = {
  selectedAgeGroups: [],
  selectedFases: [],
  selectedBrands: [],
  yearRange: [2014, 2024],
};

// Define action types
type Action =
  | { type: "SET_AGE_GROUPS"; payload: string[] }
  | { type: "SET_FASE"; payload: string[] }
  | { type: "SET_BRANDS"; payload: string[] }
  | { type: "SET_YEAR_RANGE"; payload: number[] };

// Create a reducer to manage state changes
const globalStateReducer = (
  state: GlobalStateType,
  action: Action
): GlobalStateType => {
  switch (action.type) {
    case "SET_AGE_GROUPS":
      return { ...state, selectedAgeGroups: action.payload };
    case "SET_FASE":
      return { ...state, selectedFases: action.payload };
    case "SET_BRANDS":
      return { ...state, selectedBrands: action.payload };
    case "SET_YEAR_RANGE":
      return { ...state, yearRange: action.payload };
    default:
      return state;
  }
};

// Create a context for the global state
const GlobalStateContext = createContext<
  { state: GlobalStateType; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// Create a provider component
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
