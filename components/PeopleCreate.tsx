"use client";
import React, { useRef, useState } from "react";
import { usePeople } from "@/context/PeopleContext";

const PeopleCreate = () => {
  const { setPeople } = usePeople();

  const [query, setQuery] = useState("");
  const [genId, setGenId] = useState(1);
  const [selectedPeople, setSelectedPeople] = useState<any[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (isDisable) return;

    const newP = {
      id: genId,
      name: query,
    };

    setSelectedPeople((prev: any) => [...prev, newP]);
    setPeople((prev: any) => [...prev, newP]);
    setQuery("");
    setGenId(genId + 1);
    inputRef.current?.focus();
  };

  const isDisable =
    !query?.trim() ||
    selectedPeople.filter((p: any) => {
      return (
        p?.name.toLocaleLowerCase()?.trim() ===
        query?.toLocaleLowerCase()?.trim()
      );
    })?.length !== 0;

  return (
    <div className="grid place-items-center">
      <div>
        {selectedPeople?.length ? (
          <div className="flex flex-wrap gap-3 bg-white w-40">
            {selectedPeople.map((p: any) => {
              return (
                <div
                  key={p.id}
                  className="flex items-center gap-1 rounded-full w-fit pb-1 px-2 bg-green"
                >
                  <div>{p.name}</div>
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSelectedPeople(
                        selectedPeople.filter((i: any) => i.name !== p.name)
                      );
                      setPeople(
                        selectedPeople.filter((i: any) => i.name !== p.name)
                      );
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
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isDisable) {
              handleAdd(e);
            }
          }}
        />
        <button
          disabled={isDisable}
          onClick={handleAdd}
          className="bg-secondary text-white py-1 px-2 mx-2 rounded disabled:bg-grey disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default PeopleCreate;
