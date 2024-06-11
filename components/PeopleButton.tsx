import React from "react";

const PeopleButton = ({ name, onClick }: any) => {
  return (
    <div
      key={name}
      onMouseDown={(e) => e.preventDefault()}
      className="flex items-center gap-1 rounded-full w-fit pb-1 px-2 bg-green"
    >
      <div>{name}</div>
      <button onMouseDown={(e) => e.preventDefault()} onClick={onClick}>
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
};

export default PeopleButton;
