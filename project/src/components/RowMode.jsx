import React from "react";
const RowMode = ({ colormode, mode, setLocalFilters, setSearchParams }) => {
  const handleClick = () => {
    setLocalFilters((prev) => {
      const newFilters = { ...prev, mode: "1" };
      setSearchParams(newFilters);
      return newFilters;
    });
  };
  return (
    <svg
      onClick={handleClick}
      className="hover:cursor-pointer"
      stroke="currentColor"
      fill={
        colormode
          ? mode === "1"
            ? "#301C27"
            : "#F8F8F2"
          : mode === "0"
          ? "#394E6A"
          : "#DBE1FF"
      }
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      ></path>
    </svg>
  );
};

export default RowMode;
