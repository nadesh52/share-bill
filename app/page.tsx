import PeopleTab from "@/components/PeopleTab";
import React from "react";
import { PeopleProvider } from "@/context/PeopleContext";
import { OrderProvider } from "@/context/OrderContext";
import TotalTab from "@/components/TotalTab";
import OrderTab from "@/components/OrderTab";
import SumTab from "@/components/SumTab";

const Home = () => {
  return (
    <main className="max-w-screen-md px-4 mx-auto bg-white">
      <PeopleProvider>
        <OrderProvider>
          Home
          <hr />
          <PeopleTab />
          <hr />
          <OrderTab />
          <hr />
          <TotalTab />
          <hr />
          <SumTab />
        </OrderProvider>
      </PeopleProvider>
    </main>
  );
};

export default Home;
