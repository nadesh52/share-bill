"use client";
import { usePeople } from "@/context/PeopleContext";
import React, { useEffect, useRef, useState } from "react";

const PeopleDropdown = ({ selectedPeople }: any) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [listPeople, setListPeople] = useState<any[]>([]);
  const { people } = usePeople();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredPeople = people.filter((p: any) => !listPeople.includes(p));

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== buttonRef.current) {
        if (e.target !== menuRef.current) {
          setMenuOpen(false);
        }
      }
    });
  }, []);

  return (
    <div>
      {listPeople.map((p) => (
        <div key={p}>
          <span
            onClick={() => {
              setListPeople(listPeople.filter((i) => i !== p));
              setMenuOpen(true);
            }}
          >
            {p} - OX
          </span>
        </div>
      ))}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(true)}
          ref={buttonRef}
          className="bg-red p-1 w-fit rounded-md text-white peer"
        >
          select people
        </button>
        {menuOpen ? (
          <div
            ref={menuRef}
            className="absolute w-full mt-1 p-1 overflow-y-auto rounded-md shadow-md bg-white scrollbar-thin scrollbar-track-secondary"
          >
            <ul>
              {filteredPeople.length ? (
                filteredPeople?.map((p: any) => (
                  <li
                    key={p}
                    onClick={(e) => {
                      e.preventDefault();
                      selectedPeople(p);
                      setListPeople((prev) => [...prev, p]);
                      setMenuOpen(true);
                    }}
                    className="select-none cursor-pointer p-1 rounded hover:bg-secondary hover:text-white"
                  >
                    {p}
                  </li>
                ))
              ) : (
                <li className="text-sm select-none">empty people list</li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PeopleDropdown;
