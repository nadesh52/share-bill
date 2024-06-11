import React from "react";

const PeopleList = ({ name, onClick }: any) => {
  return (
    <li onMouseDown={(e) => e.preventDefault()} onClick={onClick}>
      <p>{name}</p>
    </li>
  );
};

export default PeopleList;
