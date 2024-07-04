import React, { useEffect, useState, useCallback } from "react";
import DarkMode from "./DarkMode";
import { PiShoppingCartLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import Hamburger from "./Hamburger";
import "./animation.css";
import LightMode from "./LightMode";
import { useSelector, useDispatch } from "react-redux";
import { NumberOfItemInCart } from "../features/cart/CartSlice";
import { useLocalStorage } from "../hooks/localstorage";
import { changePage } from "../features/page/Page";

const Navbar = () => {
  const mode = useSelector((state) => state.mode.darkMode);
  const [isActive, setIsActive] = useState(window.innerWidth >= 1024);
  const currentPage = useSelector((state) => state.page.currentPage);
  const dispatch = useDispatch();
  const cartSize = useSelector((state) => state.cart.cartSize);
  const List = useSelector((state) => state.cart.productList);
  const { getItem } = useLocalStorage("key");
  const username = getItem();

  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };

  const handleMouseClick = useCallback(
    (e) => {
      if (isActive) {
        if (!e.target.matches("li") && !e.target.matches("a")) {
          setIsActive(false);
        }
      }
    },
    [isActive]
  );

  useEffect(() => {
    const totalItems = List.reduce((curr, next) => {
      return curr + Number(next.amount);
    }, 0);
    dispatch(NumberOfItemInCart({ cartSize: totalItems }));
  }, [dispatch, List]);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseClick);

    return () => {
      window.removeEventListener("mousedown", handleMouseClick);
    };
  }, [handleMouseClick]);

  const IconComfySofa = () => {
    return (
      <Link
        to="/"
        onClick={() => handlePageChange(1)}
        className="btn-pop bg-b5 text-t1 box-border border-0 flex h-12 px-4 min-h-12 text-3xl dark:text-[hsl(328,26%,15%,1)] rounded-lg dark:hover:bg-[#FF57B6] dark:bg-[#FF7AC6] justify-center items-center dark:border-[#FF57B6] dark:outline-[#FF57B6] font-semibold cursor-pointer shrink-0 duration-200"
      >
        C
      </Link>
    );
  };

  const Navigation = () => {
    return (
      <ul className="h-full bg-b2 w-[180px] lg:w-full rounded-xl relative flex flex-col lg:flex-row p-2 dark:bg-navbar-background text-xs lg:items-center md:justify-center">
        <Link
          to="/"
          className={`rounded-lg px-2 py-1 md:py-2 md:px-4 ${
            currentPage === 1
              ? "bg-b1 text-t2 dark:bg-[#414558]"
              : "hover:bg-[#DDE5F0] dark:hover:bg-gray-400 dark:hover:bg-opacity-20"
          }`}
          onClick={() => handlePageChange(1)}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`rounded-lg px-2 py-1 md:py-2 md:px-4 ${
            currentPage === 2
              ? "bg-b1 text-t2 dark:bg-[#414558]"
              : "hover:bg-[#DDE5F0] dark:hover:bg-gray-400 dark:hover:bg-opacity-20"
          }`}
          onClick={() => handlePageChange(2)}
        >
          About
        </Link>
        <Link
          to="/products"
          className={`rounded-lg px-2 py-1 md:py-2 md:px-4 ${
            currentPage === 3
              ? "bg-b1 text-t2 dark:bg-[#414558]"
              : "hover:bg-[#DDE5F0] dark:hover:bg-gray-400 dark:hover:bg-opacity-20"
          }`}
          onClick={() => handlePageChange(3)}
        >
          Products
        </Link>
        <Link
          to="/cart"
          className={`rounded-lg px-2 py-1 md:py-2 md:px-4 ${
            currentPage === 4
              ? "bg-b1 text-t2 dark:bg-[#414558]"
              : "hover:bg-[#DDE5F0] dark:hover:bg-gray-400 dark:hover:bg-opacity-20"
          }`}
          onClick={() => handlePageChange(4)}
        >
          Cart
        </Link>
        {username && username.length > 0 && (
          <>
            <Link
              to="/checkout"
              className={`rounded-lg px-2 py-1 md:py-2 md:px-4 ${
                currentPage === 5
                  ? "bg-b1 text-t2 dark:bg-[#414558]"
                  : "hover:bg-[#DDE5F0] dark:hover:bg-gray-400 dark:hover:bg-opacity-20"
              }`}
              onClick={() => handlePageChange(5)}
            >
              checkout
            </Link>
            <Link
              to="/order"
              className={`rounded-lg px-2 py-1 md:py-2 md:px-4 ${
                currentPage === 6
                  ? "bg-b1 text-t2 dark:bg-[#414558]"
                  : "hover:bg-[#DDE5F0] dark:hover:bg-gray-400 dark:hover:bg-opacity-20"
              }`}
              onClick={() => handlePageChange(6)}
            >
              order
            </Link>
          </>
        )}
      </ul>
    );
  };

  return (
    <nav className="bg-b2 dark:bg-navbar-background box-border">
      <div className="w-full h-full max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-3 px-8 dark:text-white">
        <div className="hidden lg:flex lg:flex-start w-full h-full lg:items-center">
          <IconComfySofa />
        </div>
        <div className="w-full flex justify-start items-center lg:hidden">
          <Hamburger
            className="w-[22px]"
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </div>
        <div
          className={`${
            !isActive ? "hidden" : "flex"
          } absolute top-20 left-0 lg:flex lg:static rounded-lg px-4 py-2`}
        >
          <Navigation />
        </div>
        <div className="flex gap-8 items-center justify-end">
          {!mode ? <DarkMode /> : <LightMode />}
          <div className="flex relative">
            <Link
              to="/cart"
              className="w-full h-full relative p-2 rounded-full hover:dark:bg-white/20 hover:bg-black/10 transition-colors duration-200 ease-in-out"
            >
              <PiShoppingCartLight
                className="text-black dark:text-white "
                size="24px"
              />
              <span className="absolute transition-[hover] ease-in-out top-0 left-5 box-border bg-b5 text-white dark:text-black dark:bg-pink-btn  text-[10px] rounded-[16px] px-2 py-0">
                {cartSize}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
