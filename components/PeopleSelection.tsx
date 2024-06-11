"use client";
import React, { useRef, useState } from "react";
import PeopleList from "./PeopleList";
import { usePeople } from "@/context/PeopleContext";

const PeopleSelection = () => {
  const { setPeople } = usePeople();

  const [query, setQuery] = useState("");
  const [selectedPeople, setSelectedPeople] = useState<any[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const filteredPeople = selectedPeople.filter(
    (p: any) =>
      p?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim()) &&
      !selectedPeople.includes(p)
  );

  const isDisable =
    !query?.trim() ||
    selectedPeople.filter(
      (p) =>
        p?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
    )?.length !== 0;

  return (
    <div className="grid place-items-center">
      <div className="relative">
        {selectedPeople?.length ? (
          <div className="flex flex-wrap gap-3 bg-white w-40 relative">
            {selectedPeople.map((p) => {
              return (
                <div
                  key={p}
                  className="flex items-center gap-1 rounded-full w-fit pb-1 px-2 bg-green"
                >
                  <div>{p}</div>
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSelectedPeople(selectedPeople.filter((i) => i !== p));
                      setPeople(selectedPeople.filter((i) => i !== p));
                    }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.2}
                        stroke="currentColor"
                        className="size-4 mt-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              );
            })}
            <div>
              <span
                className="text-grey cursor-pointer select-none"
                onClick={() => {
                  setSelectedPeople([]);
                  inputRef.current?.focus();
                }}
              >
                clear all
              </span>
            </div>
          </div>
        ) : null}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.trimStart())}
          placeholder="search or create new"
          className="bg-grey"
          onFocus={() => setMenuOpen(true)}
          onBlur={() => setMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isDisable) {
              setSelectedPeople((prev) => [...prev, query]);
              setPeople((prev: any) => [...prev, query]);
              setQuery("");
              setMenuOpen(true);
            }
          }}
        />
        <button
          disabled={isDisable}
          onClick={() => {
            if (isDisable) return;
            setSelectedPeople((prev) => [...prev, query]);
            setPeople((prev: any) => [...prev, query]);
            setQuery("");
            inputRef.current?.focus();
          }}
          className="bg-secondary text-white py-1 px-2 mx-2 rounded disabled:bg-grey disabled:cursor-not-allowed"
        >
          Add
        </button>
        {/* menu */}
        {menuOpen ? (
          <div className="bg-white absolute w-full mt-1 p-1 shadow-md z-50 flex overflow-y-auto scrollbar-thin scrollbar-track-base scrollbar-thumb-secondary">
            <ul className="w-full">
              {filteredPeople?.length ? (
                filteredPeople.map((p: any, i: any) => (
                  <PeopleList
                    key={i}
                    name={p}
                    onClick={() => {
                      setMenuOpen(true);
                      setSelectedPeople((prev) => [...prev, p]);
                      setQuery("");
                    }}
                  />
                ))
              ) : (
                <li
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setMenuOpen(true)}
                  className="select-none text-grey"
                >
                  no option
                </li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PeopleSelection;
