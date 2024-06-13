"use client";
import { usePeople } from "@/context/PeopleContext";
import React, { useEffect, useRef, useState } from "react";

const PeopleDropdown = ({ selectedPeople,  onClear }: any) => {
  const { people } = usePeople();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [listPeople, setListPeople] = useState<any[]>([]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredPeople = people.filter((p: any) => {
    return !listPeople.includes(p.name);
  });

  const handleClick = (event: any, person: any) => {
    event.preventDefault();
    setMenuOpen(true);
    selectedPeople(person, "add");
    setListPeople((prev) => [...prev, person.name]);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== buttonRef.current) {
        if (e.target !== menuRef.current) {
          setMenuOpen(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (onClear) {
      setListPeople([]);
    }
  }, [onClear]);
    
  return (
    <div>
      {listPeople?.map((person) => (
        <div key={person}>
          <span
            onClick={() => {
              setListPeople((prev) => prev.filter((i) => i !== person));
              setMenuOpen(true);
              selectedPeople(person, "remove");
            }}
          >
            {person} - OX
          </span>
        </div>
      ))}
      <div className="relative">
        <button
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(true);
          }}
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
                    key={p.id}
                    onClick={(e) => handleClick(e, p)}
                    className="select-none cursor-pointer p-1 rounded hover:bg-secondary hover:text-white"
                  >
                    {p.name}
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
