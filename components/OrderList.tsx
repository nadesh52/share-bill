"use client";
import React, { useState } from "react";

type OrderListType = {
  id?: number;
  name?: string;
  quantity?: number;
  price?: number;
  people?: any;
  handleEdit: any;
};

const OrderList = ({
  id,
  name,
  quantity,
  price,
  people,
  handleEdit,
}: OrderListType) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-yellow w-full flex justify-between p-1 rounded gap-2 select-none`}
      >
        <span>{name}</span>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        )}
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div>quantity: {quantity}</div>
          <div>price: {price}</div>
          <div>people: 
            {people?.length ? people.map((p:any) => (
              <span key={p} className="bg-accent p-1 mx-2">
                {p}
              </span>
            )) : <span>no people</span>}
            
          </div>
          <button
            onClick={() => handleEdit(id)}
            className="text-red p-1 bg-base rounded"
          >
            edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
