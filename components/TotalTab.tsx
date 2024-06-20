"use client";
import React, { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import PeopleDropdown from "@/components/PeopleDropdown";
import { Modal } from "./Modal";
import { usePeople } from "@/context/PeopleContext";

const TotalTab = () => {
  const { order, setOrder } = useOrder();
  const { people } = usePeople();
  const [editValue, setEditValue] = useState<any | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const filteredPeople = people.filter((p: any) => {
    return editValue?.people?.includes(p);
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const total = editValue.price * editValue.quantity;
    const price = total / editValue.people.length;

    const newO = {
      ...editValue,
      total: total,
      price_per_people: price,
    };

    setOrder((prevOrder: any) => {
      return prevOrder.map((o: any) => {
        if (o.id !== newO.id) return o;
        return newO;
      });
    });
  };

  const handleEdit = (event: any, order: any) => {
    event.preventDefault();

    const editOrder = {
      ...order,
    };

    setEditValue(editOrder);
  };

  const handleDelete = (event: any, _order: any) => {
    event.preventDefault();
    setOrder(order.filter((item: any) => item.name !== _order.name));
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name !== "name") {
      const numValue = !isNaN(value) ? parseFloat(value) : value;
      setEditValue((prev: any) => {
        return { ...prev, [name]: numValue };
      });
    } else {
      setEditValue((prev: any) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const handleCountClick = (event: any, type: any) => {
    event.preventDefault();

    if (type === "increase") {
      setEditValue({ ...editValue, quantity: editValue.quantity + 1 });
    } else if (type === "decrease" && editValue.quantity > 1) {
      setEditValue({ ...editValue, quantity: editValue.quantity - 1 });
    }
  };

  const handleSelectedPeople = (person: any, action: string) => {
    if (action === "add") {
      if (!editValue.people.includes(person.name)) {
        setEditValue({ ...editValue, people: [...editValue.people, person] });
      }
    } else if (action === "remove") {
      setEditValue({
        ...editValue,
        people: editValue.people.filter((p: any) => p.name !== person.name),
      });
    }
  };

  const handleRemovePeople = (person: any) => {
    setEditValue({
      ...editValue,
      people: editValue.people.filter((p: any) => p.name !== person.name),
    });
  };

  const isDisable = editValue?.quantity <= 1;

  const editForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit} className="relative">
          <p className="text-3xl font-medium mb-4">Edit Menu</p>
          <section className="p-2 shadow rounded mb-4">
            <PeopleDropdown
              selectedPeople={handleSelectedPeople}
              peopleList={filteredPeople}
            />

            <div className="flex flex-wrap gap-3 w-full mt-4">
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

          <label className="relative">
            <input
              name="name"
              type="text"
              autoComplete="off"
              required
              value={editValue?.name || ""}
              onChange={handleChange}
              className="border-b border-b-accent my-4 h-8 w-full px-2 outline-none transition focus-visible:border-b-2 peer"
            />
            <p className="absolute top-0 left-0 pointer-events-none text-black/70 transition-all peer-valid:-translate-y-5 peer-valid:text-sm peer-valid:text-black/40 peer-focus-visible:text-black/40 peer-focus-visible:-translate-y-5 peer-focus-visible:text-sm">
              Menu
            </p>
          </label>

          <label className="relative">
            <input
              name="price"
              type="text"
              autoComplete="off"
              required
              value={editValue?.price || ""}
              onChange={handleChange}
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
                value={editValue?.quantity || ""}
                onChange={handleChange}
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
                  className="size-8"
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
                  className="size-8"
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

          <div className="mt-4 flex flex-col gap-4">
            <button
              type="submit"
              onClick={() => {
                setOpen(false);
              }}
              className="bg-accent rounded h-10 w-full"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
              }}
              className="w-full h-10 border border-red text-red rounded hover:bg-red hover:text-white"
            >
              Cancel
            </button>
          </div>

          <button
            onClick={(e: any) => {
              setOpen(false);
              handleDelete(e, editValue);
            }}
            className="absolute top-0 right-0 text-red disabled:text-grey"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </form>
      </>
    );
  };

  return (
    <section className="rounded mt-5">
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {editForm()}
      </Modal>
      <ul>
        {order.length
          ? order.map((o: any, i: any) => (
              <li
                key={i}
                className="relative border border-primary/5 bg-white shadow-lg h-full my-4 p-2 rounded group"
              >
                <div className="relative grid grid-cols-12 gap-2">
                  <div className="col-span-6">
                    <p className="font-medium text-lg mb-2">{o.name}</p>

                    <div>
                      <ul className="flex flex-wrap gap-2 items-center">
                        {o.people?.map((person: any, i: any) => (
                          <li key={i}>
                            <span className="border border-primary rounded px-1">
                              {person?.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      {o.people.length ? (
                        <>
                          <p>
                            <span className="text-lg font-medium mr-1">
                              {o.price_per_people}
                            </span>
                            each
                          </p>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-span-4 flex flex-col flex-wrap justify-center text-right">
                    <p className="text-2xl font-medium">{o.total}</p>
                    <span className="text-sm font-light">
                      {o.price} x {o.quantity}
                    </span>
                  </div>

                  <div className="col-span-2 flex flex-col justify-center items-end gap-4">
                    <button
                      onClick={(e: any) => {
                        setOpen(true);
                        handleEdit(e, o);
                      }}
                      className="w-fit bg-accent/20 rounded-full p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 pointer-events-none"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))
          : null}
      </ul>
    </section>
  );
};

export default TotalTab;
