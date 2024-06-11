import OrderTab from "@/components/OrderTab";
import PeopleTab from "@/components/PeopleTab";
import React from "react";
import { PeopleProvider } from "@/context/PeopleContext";

const Home = () => {
  return (
    <main className="max-w-screen-md px-4 mx-auto bg-white">
      <PeopleProvider>
        Home
        <PeopleTab />
        <hr />
        <OrderTab />
      </PeopleProvider>
    </main>
  );
};

export default Home;
