"use client";
import React, { useRef, useState } from "react";
import { usePeople } from "@/context/PeopleContext";

const PeopleCreate = () => {
  const { people, setPeople } = usePeople();
  const [query, setQuery] = useState("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (isDisable) return;

    const newP = {
      id: query,
      name: query,
    };

    setPeople((prev: any) => [...prev, newP]);
    setQuery("");
    setIsEdit(false);
    inputRef.current?.focus();
  };

  const isEditable = isEdit && people?.length !== 0;

  const isDisable =
    !query?.trim() ||
    people.filter((p: any) => {
      return (
        p?.name.toLocaleLowerCase()?.trim() ===
        query?.toLocaleLowerCase()?.trim()
      );
    })?.length !== 0;

  return (
    <article className="grid place-items-center mt-5">
      <div className="justify-center gap-4 flex pb-5">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.trimStart())}
          placeholder="enter name"
          className="bg-base outline-none px-2 rounded focus-visible:ring-2 focus-visible:ring-accent"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isDisable) {
              handleAdd(e);
            }
          }}
        />
        <button
          disabled={isDisable}
          onClick={handleAdd}
          className="bg-accent text-white py-1 px-2 rounded disabled:bg-grey disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
        </button>
      </div>

      {people?.length ? (
        <div className="relative flex flex-wrap gap-3 w-full border-t bg-white pt-9">
          {people.map((p: any) => {
            return (
              <div
                key={p.id}
                className="flex justify-between gap-1 rounded w-fit py-1 px-2 border border-primary"
              >
                <span className="select-none">{p.name}</span>
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setPeople(people.filter((i: any) => i.name !== p.name));
                  }}
                  className={`${isEditable ? "block" : "hidden"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.3}
                    stroke="currentColor"
                    className="w-6 h-6 text-red"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            );
          })}

          <div className="absolute top-1 right-1 flex justify-center items-center">
            <div
              className="text-accent cursor-pointer mr-2 pr-2 border-r border-r-primary"
              onClick={() => {
                setIsEdit(!isEdit);
                inputRef.current?.focus();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>

            <span
              className="text-red/50 cursor-pointer select-none"
              onClick={() => {
                setPeople([]);
                inputRef.current?.focus();
              }}
            >
              Clear
            </span>
          </div>
        </div>
      ) : null}
    </article>
  );
};

export default PeopleCreate;
