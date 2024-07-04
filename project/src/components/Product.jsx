import React, { useEffect, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productData } from "../features/products/productSlice";
import { Link } from "react-router-dom";
import { AsyncFetchAllProducts } from "../features/products/productsSlice";
import PuffLoader from "react-spinners/PuffLoader";
import Grid from "./Grid";
import RowMode from "./RowMode";
import "./Slider.css";
import { ImCheckboxChecked } from "react-icons/im";

const Product = () => {
  const colormode = useSelector((state) => state.mode.darkMode);
  const data = useSelector((state) => state.products.List);
  const status = useSelector((state) => state.products.status);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams({
    checked: "0",
    page: "1",
    mode: "0",
    rangeQuery: "1000",
    searchQuery: "",
    categoryQuery: "all",
    companyQuery: "all",
    sortmethod: "a-z",
    reset: "0",
  });

  const checked = searchParams.get("checked") === "1";
  const page = parseInt(searchParams.get("page") || "1");
  const mode = searchParams.get("mode") || "0";
  const rangeQuery = parseInt(searchParams.get("rangeQuery") || "1000");
  const searchQuery = searchParams.get("searchQuery") || "";
  const categoryQuery = searchParams.get("categoryQuery") || "all";
  const companyQuery = searchParams.get("companyQuery") || "all";
  const sortmethod = searchParams.get("sortmethod") || "a-z";
  const reset = searchParams.get("reset") === "1";

  const [localFilters, setLocalFilters] = useState({
    checked,
    rangeQuery,
    searchQuery,
    categoryQuery,
    companyQuery,
    sortmethod,
    mode,
  });

  useEffect(() => {
    dispatch(AsyncFetchAllProducts({}));
  }, [dispatch, searchParams]);

  const filterAndSortProducts = useCallback(() => {
    let filteredList = data
      .filter((val) => {
        const searchQueryLower =
          searchParams.get("searchQuery")?.toLowerCase() || "";
        return val.title.toLowerCase().includes(searchQueryLower);
      })
      .filter((val) => {
        const categoryQueryLower =
          searchParams.get("categoryQuery")?.toLowerCase() || "all";
        return (
          categoryQueryLower === "all" ||
          val.category.toLowerCase() === categoryQueryLower
        );
      })
      .filter((val) => {
        const companyQueryLower =
          searchParams.get("companyQuery")?.toLowerCase() || "all";
        return (
          companyQueryLower === "all" ||
          val.madeBy.toLowerCase() === companyQueryLower
        );
      })
      .filter(
        (val) => val.cost <= Number(searchParams.get("rangeQuery") || "1000")
      )
      .filter((val) => {
        return searchParams.get("checked") !== "1" || val.freeShipping;
      })
      .sort((a, b) => {
        switch (searchParams.get("sortmethod") || "a-z") {
          case "a-z":
            return a.title.localeCompare(b.title);
          case "z-a":
            return b.title.localeCompare(a.title);
          case "high":
            return Number(b.cost) - Number(a.cost);
          case "low":
            return Number(a.cost) - Number(b.cost);
          default:
            return 0;
        }
      });

    const i = (page - 1) * 10;
    const j = i + 10;
    return filteredList.slice(i, j);
  }, [data, searchParams, page]);

  const handleSearchQuery = (e) => {
    setLocalFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleSubmitQuery = () => {
    setSearchParams({
      ...localFilters,
      page: "1",
      reset: reset ? "0" : "1",
    });
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      checked: "0",
      page: "1",
      mode: "0",
      rangeQuery: "1000",
      searchQuery: "",
      categoryQuery: "all",
      companyQuery: "all",
      sortmethod: "a-z",
      reset: "1",
    };
    setLocalFilters(defaultFilters);
    setSearchParams(defaultFilters);
  };

  const handleEnterQuery = (e) => {
    if (e.key === "Enter") handleSubmitQuery();
  };

  const filteredProducts = filterAndSortProducts();

  const ItemsList = () => {
    if (filteredProducts.length === 0) return <p>No item found</p>;
    return filteredProducts.map((value) => (
      <Link
        key={value.id}
        to={`/products/${value.id}`}
        onClick={() => dispatch(productData(value))}
        className={`dark:bg-[#272935] ${
          mode === "0"
            ? "w-full relative shadow-xl hover:shadow-2xl rounded-2xl flex flex-col gap-5 items-center pb-4 dark:text-white"
            : "sm:shadow-2xl sm:rounded-2xl sm:flex sm:flex-row sm:gap-5 sm:items-center sm:pb-8 dark:text-white"
        }`}
      >
        <div
          className={`w-full px-4 pt-4 ${mode === "1" && "sm:w-[40%] sm:p-4"}`}
        >
          <img
            className={`${
              mode === "0"
                ? "rounded-xl h-64 md:h-48 w-full object-cover"
                : "sm:min-w-[200px] sm:h-64 sm:aspect-1 sm:shadow-lg sm:rounded-2xl sm:object-cover w-full h-64 aspect-1 shadow-lg rounded-2xl object-cover"
            }`}
            src={value.img}
            alt={value.title}
          />
        </div>
        {mode === "1" && (
          <h2 className="w-full flex justify-center items-center">
            {value.madeBy}
          </h2>
        )}
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <h1 className="text-[1.25rem] leading-[1.75rem] tracking-wider capitalize font-semibold">
            {value.title}
          </h1>
          <h1 className="text-md dark:text-[hsl(265,89%,78%,1)]">
            ${value.cost}
          </h1>
        </div>
      </Link>
    ));
  };

  if (status === "Loading")
    return (
      <div className="w-full h-full flex justify-center items-center">
        <PuffLoader color="white" />
      </div>
    );

  return (
    <main className="box-border w-full min-h-screen max-w-6xl mx-auto py-20 px-8 dark:text-[#A8A7A8]">
      <ul className="bg-b2 box-border dark:text-white capitalize flex flex-col gap-8 sm:grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4 rounded-lg text-sm dark:bg-[#181920] justify-between py-4 px-8">
        <li className="flex flex-col w-[full] ">
          <h2 className="px-1 py-2">Search Product</h2>
          <input
            type="text"
            value={localFilters.searchQuery}
            onKeyDown={handleEnterQuery}
            onChange={handleSearchQuery}
            className="h-8 dark:bg-[#272935] border-solid px-2 dark:border-[#3C3E48] border-[1.9px] rounded-lg"
          />
        </li>
        <li className="flex flex-col w-[full]">
          <h2 className="px-1 py-2">Select Category</h2>
          <select
            value={localFilters.categoryQuery}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                categoryQuery: e.target.value,
              }))
            }
            className="h-8 dark:bg-[#272935] border-solid px-2 dark:border-[#3C3E48] border-[1.9px] rounded-lg"
          >
            <option value="all">all</option>
            <option value="Tables">Tables</option>
            <option value="Chair">Chair</option>
            <option value="Kids">Kids</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
          </select>
        </li>
        <li className="flex flex-col w-[full]">
          <h2 className="px-1 py-2">Select Company</h2>
          <select
            value={localFilters.companyQuery}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                companyQuery: e.target.value,
              }))
            }
            className="h-8 dark:bg-[#272935] border-solid px-2 dark:border-[#3C3E48] border-[1.9px] rounded-lg"
          >
            <option value="all">all</option>
            <option value="Modenza">Modenza</option>
            <option value="Luxora">Luxora</option>
            <option value="Artifex">Artifex</option>
            <option value="Comfora">Comfora</option>
            <option value="Homestead">Homestead</option>
          </select>
        </li>
        <li className="flex flex-col w-[full]">
          <h2 className="px-1 py-2">Sort By</h2>
          <select
            value={localFilters.sortmethod}
            onChange={(e) =>
              setLocalFilters((prev) => ({
                ...prev,
                sortmethod: e.target.value,
              }))
            }
            className="h-8 dark:bg-[#272935] border-solid px-2 dark:border-[#3C3E48] border-[1.9px] rounded-lg"
          >
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
            <option value="high">high</option>
            <option value="low">low</option>
          </select>
        </li>
        <li className="flex flex-col gap-4 w-[full]">
          <div className="flex justify-between">
            <h2>Select Price</h2>
            <h2>${localFilters.rangeQuery}.00</h2>
          </div>

          <div className="w-full dark:bg-[#2F2F35] bg-gray-300/60  flex rounded-lg items-center justify-center h-1 ">
            <input
              type="range"
              id={colormode ? "range1" : "range2"}
              min={0}
              max={1000}
              value={localFilters.rangeQuery}
              onInput={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  rangeQuery: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex justify-between">
            <h2>0</h2>
            <h2>Max : $1,000.00</h2>
          </div>
        </li>
        <li className="w-full dark:text-[#F8F8F2] flex flex-col gap-2 items-center justify-center">
          <h2>Free Shipping</h2>
          <div
            onClick={() =>
              setLocalFilters((prev) => ({
                ...prev,
                checked: prev.checked === "1" ? "0" : "1",
              }))
            }
            className="w-5 h-5 border border-solid border-b5 dark:border-pink-btn rounded-lg flex justify-center items-center"
          >
            {localFilters.checked === "1" ? (
              <ImCheckboxChecked className="w-5 h-5 rounded-lg text-b5 dark:text-pink-btn dark:border-pink-btn" />
            ) : (
              ""
            )}
          </div>
        </li>
        <div className="w-full h-full flex justify-center items-center text-white">
          <button
            onClick={handleSubmitQuery}
            className="bg-b5  hover:btn-pop dark:bg-[#FF7AC6] w-full rounded-lg dark:text-[#32261B] font-semibold h-8"
          >
            SEARCH
          </button>
        </div>
        <div className="w-full flex justify-center items-center text-white">
          <button
            onClick={handleResetFilters}
            className="bg-b4 dark:bg-[#FFB86B] w-full rounded-lg dark:text-[#32261B] font-semibold h-8"
          >
            RESET
          </button>
        </div>
      </ul>

      <div className="flex max- justify-between mt-8 dark:text-white">
        <h2>{filteredProducts.length} products</h2>
        <div className="flex gap-2 mb-4 items-center">
          <div
            className={`rounded-full ${
              mode === "0" && "bg-b5 dark:bg-pink-btn"
            } p-2`}
          >
            <Grid
              mode={mode}
              colormode={colormode}
              setLocalFilters={setLocalFilters}
              setSearchParams={setSearchParams}
            />
          </div>
          <div
            className={`rounded-full ${
              mode === "1" && "bg-b5 dark:bg-pink-btn"
            } p-2`}
          >
            <RowMode
              setSearchParams={setSearchParams}
              mode={mode}
              colormode={colormode}
              setLocalFilters={setLocalFilters}
            />
          </div>
        </div>
      </div>

      <div className="bg-b2 dark:bg-black w-[90%] ml-4 h-[0.5px] my-4"></div>

      <div
        className={`w-full pt-12 ${
          mode === "0"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col"
        } gap-4`}
      >
        <ItemsList />
      </div>

      <div className="w-full flex justify-end dark:text-white mt-16">
        <div className="h-12 min-h-12 bg-[#F0F6FF] inline-flex dark:bg-[hsl(231,15%,11%,1)] dark:text-[hsl(60,30%,96%,1)] text-t3 rounded-lg text-xs font-semibold uppercase">
          <button
            className="w-full h-full px-4 dark:hover:bg-[#09090C] hover:bg-[#E2E8F4] uppercase"
            onClick={() =>
              setSearchParams((prev) => ({
                ...prev,
                page: (page === 1 ? 3 : page - 1).toString(),
              }))
            }
          >
            Prev
          </button>
          <button
            className={`${
              page === 1 && "dark:bg-[#09090C] bg-[#E2E8F4]"
            } dark:hover:bg-[#09090C] hover:bg-[#E2E8F4] px-4`}
            onClick={() => setSearchParams((prev) => ({ ...prev, page: "1" }))}
          >
            1
          </button>
          <button
            className={`${
              page === 2 && "dark:bg-[#09090C] bg-[#E2E8F4]"
            } dark:hover:bg-[#09090C] hover:bg-[#E2E8F4] px-4`}
            onClick={() => setSearchParams((prev) => ({ ...prev, page: "2" }))}
          >
            2
          </button>
          <button
            className={`${
              page === 3 && "dark:bg-[#09090C] bg-[#E2E8F4]"
            } dark:hover:bg-[#09090C] hover:bg-[#E2E8F4] px-4`}
            onClick={() => setSearchParams((prev) => ({ ...prev, page: "3" }))}
          >
            3
          </button>
          <button
            className="w-full h-full dark:hover:bg-[#09090C] hover:bg-[#E2E8F4] uppercase px-4"
            onClick={() =>
              setSearchParams((prev) => ({
                ...prev,
                page: (page === 3 ? 1 : page + 1).toString(),
              }))
            }
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default Product;
