"use client";
import { usePeople } from "@/context/PeopleContext";
import React, { useEffect, useRef, useState } from "react";

const PeopleDropdown = ({ selectedPeople, peopleList }: any) => {
  const { people } = usePeople();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredPeople = people.filter((p: any) => {
    return !peopleList?.includes(p);
  });

  const handleSelect = (event: any, person: any) => {
    event.preventDefault();
    selectedPeople(person, "add");
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

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          setMenuOpen(true);
        }}
        ref={buttonRef}
        className="bg-white border border-accent h-10 w-full shadow-md rounded-md peer"
      >
        Add people to list
      </button>
      {menuOpen ? (
        <div
          ref={menuRef}
          className="absolute w-full mt-1 p-1 z-50 overflow-y-auto rounded-md shadow-md bg-white scrollbar-thin scrollbar-track-accent"
        >
          <ul>
            {filteredPeople.length ? (
              filteredPeople?.map((person: any) => (
                <li
                  key={person.id}
                  onClick={(e) => handleSelect(e, person)}
                  className="select-none cursor-pointer p-1 rounded text-primary hover:bg-accent"
                >
                  {person.name}
                </li>
              ))
            ) : (
              <li className="text-sm select-none text-black/40">
                People list is empty
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default PeopleDropdown;
