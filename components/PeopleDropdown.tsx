"use client";
import { usePeople } from "@/context/PeopleContext";
import React, { useEffect, useRef, useState } from "react";

const PeopleDropdown = ({ selectedPeople, onClear }: any) => {
  const { people } = usePeople();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [listPeople, setListPeople] = useState<any[]>([]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredPeople = people.filter((p: any) => {
    return !listPeople.includes(p);
  });

  const handleSelect = (event: any, person: any) => {
    event.preventDefault();
    selectedPeople(person, "add");
    setListPeople((prev) => [...prev, person]);
  };

  const handleRemove = (person: any) => {
    setListPeople((prev) => prev.filter((i) => i.name !== person.name));
    selectedPeople(person, "remove");
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
        <div key={person.id}>
          <span onClick={() => handleRemove(person)}>{person.name} - DE</span>
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
                filteredPeople?.map((person: any) => (
                  <li
                    key={person.id}
                    onClick={(e) => handleSelect(e, person)}
                    className="select-none cursor-pointer p-1 rounded hover:bg-secondary hover:text-white"
                  >
                    {person.name}
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
