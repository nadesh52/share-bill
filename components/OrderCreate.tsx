"use client";
import React, { useState } from "react";
import { useOrder } from "@/context/OrderContext";

const OrderCreate = () => {
  const { setOrder } = useOrder();
  const [currentId, setCurrentId] = useState<number>(1);
  const [inputs, setInputs] = useState<any>({ people: [] });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const id = currentId;

    if (name !== "name") {
      const numValue = !isNaN(value) ? parseFloat(value) : value;
      setInputs({ ...inputs, id: id, [name]: numValue });
    } else {
      setInputs({ ...inputs, id: id, [name]: value });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newOrder = {
      ...inputs,
      total: inputs.price * inputs.quantity,
    };

    setOrder((prev: any) => [...prev, newOrder]);
    setCurrentId(currentId + 1);
    setInputs({ people: [] });
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
            required
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
            required
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
            required
            onChange={(e) => handleChange(e)}
            value={inputs.price || ""}
            className="bg-base"
          />
        </label>
        <button type="submit" className="bg-accent text-white p-1 w-fit">
          add order
        </button>
      </form>
    </article>
  );
};

export default OrderCreate;
