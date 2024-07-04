import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/localstorage";
import axios from "axios";
import { UpdateUserName, EmptyProductList } from "../features/cart/CartSlice";
import { toast } from "react-toastify";

const Headers = () => {
  const { getItem, removeItem } = useLocalStorage("key");
  const username = getItem();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if (isLoggingOut) {
      const logout = async () => {
        try {
          await axios.get("/api/logout");
          removeItem();
          dispatch(UpdateUserName({ username: "" }));
          dispatch(EmptyProductList({}));
          toast.success("Logged out successfully");
        } catch (error) {
          console.error("Logout failed:", error);
          toast.error("Logout failed. Please try again.");
        } finally {
          setIsLoggingOut(false);
        }
      };
      logout();
    }
  }, [isLoggingOut, dispatch, removeItem]);

  const Login = () => (
    <Link
      to="/login"
      className="w-full text-[.75rem] leading-4 sm:text-[.875rem] sm:leading-5"
    >
      Sign in / Guest
    </Link>
  );

  const Register = () => (
    <Link
      to="/register"
      className="w-full text-[.75rem] leading-4 sm:text-[.875rem] sm:leading-5"
    >
      Create Account
    </Link>
  );

  const handleLogout = () => {
    setIsLoggingOut(true);
  };

  const Logout = () => (
    <p
      className="cursor-pointer hover:bg-b5 text-b5 border-b5 hover:text-white transition dark:text-pink-btn border-solid dark:hover:bg-pink-btn dark:hover:text-black dark:border-pink-btn border p-1 rounded-lg flex justify-center items-center text-[.75rem] font-semibold leading-4 sm:text-[.875rem] sm:leading-5"
      onClick={handleLogout}
    >
      Logout
    </p>
  );

  return (
    <header className="w-full text-t1 bg-b1 dark:bg-[#414558]">
      <ul className="w-full h-full dark:text-white max-w-6xl flex gap-8 mx-auto px-8 py-2 items-center justify-center sm:justify-end sm:pr-6">
        <li className="text-xs sm:text-sm hover:underline">
          {username ? <span>Hello, {username} </span> : <Login />}
        </li>
        <li className="text-xs sm:text-sm hover:underline">
          {username ? <Logout /> : <Register />}
        </li>
      </ul>
    </header>
  );
};

export default Headers;
