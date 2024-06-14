"use client";
import React, { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import PeopleDropdown from "./PeopleDropdown";

const TotalTab = () => {
  const { order, setOrder } = useOrder();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<any | null>(null);
  const [isclear, setIsClear] = useState<boolean>(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const total = editValue.price * editValue.quantity
    const price = total / editValue.people.length

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

  const handleSelectedPeople = (person: any, action: string) => {
    if (action === "add") {
      if (!editValue.people.includes(person.name)) {
        setEditValue({ ...editValue, people: [...editValue.people, person] });
        setIsClear(false);
      }
    } else if (action === "remove") {
      setEditValue({
        ...editValue,
        people: editValue.people.filter((p: any) => p.name !== person.name),
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
          <button type="button" onClick={() => setIsEdit(false)}>cancel</button>
        </form>
      </>
    );
  };

  const onTest = () => {
    console.log("order", order);
  };

  return (
    <div>
      <p>TotalTab</p>
      <button onClick={onTest}>test</button>
      {isEdit ? <>{editForm()}</> : null}
      {order.length ? (
        <div>
          {order.map((o: any, i: any) => (
            <div key={i} className="bg-base my-2 p-1">
              <p>{o.name}</p>
              <span>{o.price} - </span>
              <span>{o.quantity}</span>
              <p>total {o.total}</p>
              {o.people.length ? <p>per people {o.price_per_people}</p> : null}
              
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
