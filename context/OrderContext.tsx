"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

export const OrderContext = createContext<any | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<any[]>([]);
  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);

  if (!context) {
    console.log("no useOrder");
  }

  return context;
};
