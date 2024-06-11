"use client";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

// export type PeopleContextType = {
//   people: string[];
//   setPeople: Dispatch<SetStateAction<string[]>>;
// };

export const PeopleContext = createContext<any | undefined>(undefined);

export const PeopleProvider = ({ children }: { children: ReactNode }) => {
  const [people, setPeople] = useState<any[]>([]);
  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    console.log("no usePeople");
  }

  return context;
};
