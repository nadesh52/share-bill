"use client";
import { useOrder } from "@/context/OrderContext";
import { usePeople } from "@/context/PeopleContext";
import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";

const SumTab = () => {
  const { people } = usePeople();
  const { order } = useOrder();

  const [peopleFilter, setPeopleFilter] = useState<any>([]);

  const fp = people.map((pp: any) => {
    const filteredByPeopleName = order.filter((od: any) => {
      return od.people.find((op: any) => {
        return op.name === pp.name;
      });
    });

    const sum = filteredByPeopleName.reduce((prev: any, content: any) => {
      return prev + parseFloat(content.price_per_people);
    }, 0);

    const obj = {
      name: pp.name,
      orders: filteredByPeopleName,
      total: sum,
    };

    return obj;
  });

  useEffect(() => {
    setPeopleFilter(fp);
  }, [people, order]);

  return (
    <div>
      {peopleFilter.map((person: any) => (
        <Accordion key={person.name} title={person.name}>
          <p>{person.name}</p>
          <p>total: {person.total}</p>
          <ul>
            {person.orders.map((o: any) => (
              <li key={o.id}>
                <div>
                  <span>{o.name}:</span>
                  <span>{o.price_per_people}</span>
                </div>
              </li>
            ))}
          </ul>
          <hr />
        </Accordion>
      ))}
    </div>
  );
};

export default SumTab;
