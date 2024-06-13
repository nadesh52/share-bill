"use client";
import React, { useEffect, useState } from "react";
import { useOrder } from "@/context/OrderContext";
import PeopleDropdown from "./PeopleDropdown";

const TotalTab = () => {
  const { order } = useOrder();
  const [newOrders, setNewOrders] = useState<any>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<any | null>(null);
  const [isclear, setIsClear] = useState<boolean>(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const newO = {
      ...editValue,
      price_per_people: editValue.total / editValue.people.length,
    };
    console.log(newO);

    setNewOrders((prevOrder: any) => {
      return prevOrder.map((o: any) => {
        if (o.id !== newO.id) return o;
        return newO;
      });
    });
    setIsEdit(false);
  };

  const handleEdit = (event: any, order: any) => {
    event.preventDefault();

    setIsEdit(true);
    const editOrder = {
      ...order,
      people: [],
    };

    setEditValue(editOrder);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setEditValue((prev: any) => {
      return { ...prev, [name]: value };
    });
    console.log(editValue);
  };

  const handleSelectedPeople = (person: any, action: string) => {
    if (action === "add") {
      if (!editValue.people.includes(person.name)) {
        setEditValue({ ...editValue, people: [...editValue.people, person] });
        setIsClear(false);
      }
    } else if (action === "remove") {
      setEditValue({
        ...editValue,
        people: editValue.people.filter((p: any) => p.name !== person),
      });
    }
  };

  const editForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label>
            <p>name</p>
            <input
              type="text"
              name="name"
              value={editValue?.name || ""}
              onChange={handleChange}
              className="bg-base"
            />
          </label>
          <label>
            <p>quantity</p>
            <input
              type="text"
              name="quantity"
              value={editValue?.quantity || ""}
              onChange={handleChange}
              className="bg-base"
            />
          </label>
          <label>
            <p>price</p>
            <input
              type="text"
              name="price"
              value={editValue?.price || ""}
              onChange={handleChange}
              className="bg-base"
            />
          </label>

          <PeopleDropdown
            selectedPeople={handleSelectedPeople}
            onClear={isclear}
          />
          <button type="submit">save</button>
        </form>
      </>
    );
  };

  const onTest = () => {
    console.log("test");
  };

  useEffect(() => {
    if (!newOrders.includes(null)) {
      order && setNewOrders((prev: any) => [...prev, order]);
    }
  }, [order]);

  return (
    <div>
      <p>TotalTab</p>
      <button onClick={onTest}>test</button>
      {isEdit ? <>{editForm()}</> : null}
      {order ? (
        <div>
          {newOrders.map((o: any, i: any) => (
            <div key={i} className="bg-base my-2 p-1">
              <p>{o.name}</p>
              <p>{o.price}</p>
              <p>{o.quantity}</p>
              <p>total {o.total}</p>
              <p>per people {o.price_per_people || "-"}</p>
              <p>
                {o.people?.map((person: any, i: any) => (
                  <span key={i}>{person?.name}</span>
                ))}
              </p>
              <button
                disabled={isEdit}
                className="bg-white text-red p-1"
                onClick={(e: any) => handleEdit(e, o)}
              >
                edit
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TotalTab;
