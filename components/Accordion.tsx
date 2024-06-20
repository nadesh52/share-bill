"use client";
import React, { useState } from "react";

type OrderListType = {
  person?: any;
  children: React.ReactNode;
};

const Accordion = ({ person, children }: OrderListType) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-accent w-full flex justify-between py-1 px-2 gap-2 select-none ${
          isOpen ? "rounded-t" : "rounded-t"
        }`}
      >
        <ul className="flex gap-4">
          <li>
            <p className="font-medium text-lg">{person?.name}</p>
          </li>
          <li>
            <div className="bg-base px-1 rounded">
              <span>
                Orders:
                <span className="font-medium text-lg ml-2">
                  {person?.orders?.length}
                </span>
              </span>
            </div>
          </li>
        </ul>

        <div className={`${isOpen ? "rotate-180" : "rotate-0"} duration-300`}>
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
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </>
  );
};

export default Accordion;
