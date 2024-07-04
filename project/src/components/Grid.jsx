import React from "react";

const Grid = ({ mode, colormode, setLocalFilters, setSearchParams }) => {
  const handleClick = () => {
    setLocalFilters((prev) => {
      const newFilters = { ...prev, mode: "0" };
      setSearchParams(newFilters);
      return newFilters;
    });
  };
 
  return (
    <svg
      className="hover:cursor-pointer"
      onClick={handleClick}
      stroke="currentColor"
      fill={
        colormode
          ? mode === "0"
            ? "#301C27"
            : "#F8F8F2"
          : mode === "1"
          ? "#394E6A"
          : "#DBE1FF"
      }
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"></path>
    </svg>
  );
};

export default Grid;
