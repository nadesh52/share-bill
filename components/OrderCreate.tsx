"use client";
import React, { useState } from "react";
import { Order } from "@/types/Order";
import PeopleDropdown from "./PeopleDropdown";
import { useOrder } from "@/context/OrderContext";

const OrderCreate = () => {
  const { setOrder } = useOrder();
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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newOrder: any = {
      ...inputs,
      total: parseFloat(inputs.price) * parseFloat(inputs.quantity),
    };

    setOrder((prev: any) =>   newOrder); // send to context
    setOrders((order) => [...order, newOrder]); // state
    setCurrentId(currentId + 1);
    setInputs({ people: [] });
    setIsClear(true);
  };

  return (
    <article>
      Order
      <form onSubmit={handleSubmit}>
        <label>
          <p>name</p>
          <input
            name="name"
            type="text"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            value={inputs.name || ""}
            className="bg-base"
          />
        </label>
        <label>
          <p>quantity</p>
          <input
            name="quantity"
            type="number"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            value={inputs.quantity || ""}
            className="bg-base"
          />
        </label>
        <label>
          <p>price</p>
          <input
            name="price"
            type="number"
            autoComplete="off"
            onChange={(e) => handleChange(e)}
            value={inputs.price || ""}
            className="bg-base"
          />
        </label>
        <button type="submit" className="bg-accent text-white p-1 w-fit">
          add order
        </button>
      </form>
      <p>order list</p>
    </article>
  );
};

export default OrderCreate;
