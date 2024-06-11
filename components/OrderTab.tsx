"use client";
import React, { useState } from "react";
import { Order } from "@/types/Order";
import OrderList from "./OrderList";
import PeopleDropdown from "./PeopleDropdown";

const OrderTab = () => {
  const [currentId, setCurrentId] = useState<number>(1);
  const [inputs, setInputs] = useState<any>({ people: [] });
  const [orders, setOrders] = useState<Order[]>([]);
  const [isclear, setIsClear] = useState<boolean>(false);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    const id = currentId;
    setInputs({ ...inputs, id: id, [name]: value });
  };

  const handleSubmit = () => {
    setOrders((o) => [...o, inputs]);
    setCurrentId(currentId + 1);
    setInputs({ people: [] });
    setIsClear(true)
  };

  const handleSelectedPeople = (person: any, action: string) => {
    if (action === "add") {
      if (!inputs.people.includes(person)) {
        setInputs({ ...inputs, people: [...inputs.people, person] });
        setIsClear(false);
      }
    } else if (action === "remove") {
      setInputs({
        ...inputs,
        people: inputs.people.filter((p: any) => p !== person),
      });
    }
  };

  const handleEdit = (e: any) => {
    console.log("edit", e);
  };

  return (
    <article>
      Order
      <div>
        <div>
          name
          <input
            name="name"
            type="text"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            value={inputs.name || ""}
            className="bg-base"
          />
        </div>
        <div>
          quantity
          <input
            name="quantity"
            type="number"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            value={inputs.quantity || ""}
            className="bg-base"
          />
        </div>
        <div>
          price
          <input
            name="price"
            type="number"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            value={inputs.price || ""}
            className="bg-base"
          />
        </div>
        {/*  */}
        <PeopleDropdown
          selectedPeople={handleSelectedPeople}
          onClear={isclear}
        />
        <button
          onClick={handleSubmit}
          className="bg-accent text-white p-1 w-fit"
        >
          add order
        </button>
      </div>
      <p>order list</p>
      {/*       o */}
      <div className="my-1">
        {orders.length === 0 ? (
          <p>no order</p>
        ) : (
          orders.map((o: any, i: any) => (
            <OrderList key={i} {...o} handleEdit={(e: any) => handleEdit(e)} />
          ))
        )}
      </div>
    </article>
  );
};

export default OrderTab;
