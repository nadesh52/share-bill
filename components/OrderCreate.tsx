"use client";
import React, { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import TotalTab from "./TotalTab";
import PeopleDropdown from "./PeopleDropdown";
import { usePeople } from "@/context/PeopleContext";

const inputsInit = { price: 0, quantity: 1, people: [] };

const OrderCreate = () => {
  const { setOrder } = useOrder();
  const { people } = usePeople();
  const [inputs, setInputs] = useState<any>(inputsInit);

  const filteredPeople = people.filter((p: any) => {
    return inputs?.people?.includes(p);
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name !== "name") {
      const numValue = !isNaN(value) ? parseFloat(value) : value;
      setInputs({
        ...inputs,
        id: `n${inputs.name}p${inputs.price}q${inputs.quantity}`,
        [name]: numValue,
      });
    } else {
      setInputs({
        ...inputs,
        id: `n${inputs.name}p${inputs.price}q${inputs.quantity}`,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const total = inputs.price * inputs.quantity;
    const price = total / inputs.people.length;

    const newOrder = {
      ...inputs,
      total: total,
      price_per_people: price,
    };

    setOrder((prev: any) => [...prev, newOrder]);
    setInputs(inputsInit);
  };

  const handleCountClick = (event: any, type: any) => {
    event.preventDefault();

    if (type === "increase") {
      setInputs({ ...inputs, quantity: inputs.quantity + 1 });
    } else if (type === "decrease" && inputs.quantity > 1) {
      setInputs({ ...inputs, quantity: inputs.quantity - 1 });
    }
  };

  const handleSelectedPeople = (person: any, action: string) => {
    if (action === "add") {
      if (!inputs.people.includes(person.name)) {
        setInputs({ ...inputs, people: [...inputs.people, person] });
      }
    }
  };

  const handleRemovePeople = (person: any) => {
    setInputs({
      ...inputs,
      people: inputs.people.filter((p: any) => p.name !== person.name),
    });
  };

  const isDisable = inputs.quantity <= 1;

  return (
    <article>
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="relative">
          <input
            name="name"
            type="text"
            autoComplete="off"
            required
            onChange={(e) => handleChange(e)}
            value={inputs.name || ""}
            className="border-b border-b-accent my-4 h-8 w-full px-2 outline-none transition focus-visible:border-b-2 peer"
          />
          <p className="absolute top-0 left-0 pointer-events-none text-black/70 transition-all peer-valid:-translate-y-5 peer-valid:text-sm peer-valid:text-black/40 peer-focus-visible:text-black/40 peer-focus-visible:-translate-y-5 peer-focus-visible:text-sm">
            Menu
          </p>
        </label>

        <label className="relative">
          <input
            name="price"
            type="number"
            autoComplete="off"
            required
            onChange={(e) => handleChange(e)}
            value={inputs.price || ""}
            className="border-b border-b-accent my-4 h-8 w-full pl-2 pr-12 outline-none focus-visible:border-b-2 peer"
          />
          <p className="absolute top-0 left-0 pointer-events-none text-black/70 transition-all peer-valid:-translate-y-5 peer-valid:text-sm peer-valid:text-black/40 peer-focus-visible:text-black/40 peer-focus-visible:-translate-y-5 peer-focus-visible:text-sm">
            Price
          </p>
          <span className="absolute right-0 bottom-0 border-l border-l-accent px-1 select-none pointer-events-none hidden peer-valid:inline-block peer-focus-visible:inline-block">
            THB
          </span>
        </label>

        <label>
          <p className="text-black/70">Quantity</p>
          <div className="flex justify-end">
            <input
              name="quantity"
              type="number"
              autoComplete="off"
              required
              onChange={(e) => handleChange(e)}
              value={inputs.quantity || ""}
              className="bg-white outline-none w-24 border border-accent order-2 text-center text-lg font-medium"
            />
            <button
              disabled={isDisable}
              onClick={(e) => handleCountClick(e, "decrease")}
              className={`p-1 size-10 rounded-l border-y border-l border-accent order-1 ${
                isDisable ? "text-grey" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>

            <button
              onClick={(e) => handleCountClick(e, "increase")}
              className="p-1 size-10 rounded-r border-y border-r border-accent order-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </label>

        <section className="p-2 shadow rounded my-4">
          <PeopleDropdown
            selectedPeople={handleSelectedPeople}
            peopleList={filteredPeople}
          />

          <div className="flex flex-wrap gap-3 w-full">
            {filteredPeople.map((person: any) => (
              <div
                key={person.id}
                className="flex justify-between gap-1 rounded-md w-fit px-1 border border-primary"
              >
                <span>{person.name}</span>
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleRemovePeople(person)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-5 h-5 text-red"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        <button type="submit" className="bg-accent rounded h-10 w-full mt-4">
          Create Order
        </button>
      </form>
      <TotalTab />
    </article>
  );
};

export default OrderCreate;
