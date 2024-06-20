import React from "react";
import PeopleTab from "@/components/PeopleTab";
import { PeopleProvider } from "@/context/PeopleContext";
import { OrderProvider } from "@/context/OrderContext";
import TotalTab from "@/components/TotalTab";
import OrderTab from "@/components/OrderTab";
import SumTab from "@/components/SumTab";
import { TabContainer, Tab } from "@/components/TabContainer";

const headers = ["people", "order", "sum"];
const content = [
  {
    name: "people tab",
    component: <PeopleTab />,
  },
  {
    name: "order tab",
    component: <OrderTab />,
  },
  {
    name: "sum tab",
    component: <SumTab />,
  },
];

const Home = () => {
  return (
    <main className="max-w-screen-sm w-[425px] content-center justify-self-center p-4 mt-14 mx-auto bg-white shadow-lg rounded-lg">
      <PeopleProvider>
        <OrderProvider>
          <TabContainer>
            <Tab id="Summary">
              <SumTab />
            </Tab>
            <Tab id="Menu">
              <OrderTab />
            </Tab>
            <Tab id="People">
              <PeopleTab />
            </Tab>
          </TabContainer>
        </OrderProvider>
      </PeopleProvider>
    </main>
  );
};

export default Home;
