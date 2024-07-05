import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserCart, UpdateUserName } from "../features/cart/CartSlice";
import { ImSpinner8 } from "react-icons/im";
import { useLocalStorage } from "../hooks/localstorage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animation, setAnimation] = useState(0);
  const { setItem } = useLocalStorage("key");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginRequest = async (event, email, password) => {
    event.preventDefault();
    const data = { email, password };
    const API_URL = "https://mern-ecomerce-5tzn.onrender.com";

    if (!data.email || !data.password) {
      toast.error("Please enter both email and password");
      return;
    }

    setAnimation(1);
 
    try {
      await axios.post(`${API_URL}/api/login`, data);
      const userDetails = await axios.get(`${API_URL}/api/profile`);
      dispatch(UpdateUserName({ username: userDetails.data.username }));
      setItem(userDetails.data.username);
      if (email !== "guestuser@email.com") {
        toast.success("Login successful");
      }
      if (email === "guestuser@email.com") {
        toast.success("welcome guest user");
      }
      setTimeout(() => {
        dispatch(fetchUserCart());
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error(
        "Error making POST request:",
        error.response?.data || error.message
      );
    } finally {
      setAnimation(0);
    }
  };

  return (
    <div className="dark:bg-[#272935] font-comfy-sofa h-screen items-center dark:text-[#F8F8F2] flex justify-center">
      <form className="w-96 flex flex-col bg-opacity-100 dark:bg-[hsl(231,15%,18%,1)] gap-y-4 dark:bg-[#272935] p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold leading-9">Login</h1>
        <label className="dark:text-[hsl(60,30%,96%,1)] leading-5 text-sm">
          Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inline-flex shrink h-12  leading-6  dark:bg-[#272935] rounded-lg  border px-4 border-ol1 dark:border-ol2  border-opacity-20 focus:outline focus:outline-ol1 dark:focus:outline-ol2 focus:outline-2 focus:outline-offset-2  "
        />
        <label className="dark:text-[hsl(60,30%,96%,1)] leading-5 text-sm">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex shrink h-12  leading-6  dark:bg-[#272935] rounded-lg border px-4 border-ol1 dark:border-ol2  border-opacity-20 focus:outline focus:outline-ol1 dark:focus:outline-ol2 focus:outline-2 focus:outline-offset-2 "
        />
        <button
          onClick={(event) => handleLoginRequest(event, email, password)}
          className={`w-full border-double text-t4 bg-b5 bg-opacity-100 border-opacity-100 text-opacity-100 dark:border-[hsl(326,100%,74%,1)] ${
            animation
              ? "bg-gray-400 text-t4 dark:outline-[hsl(231,15%,18%,1)] dark:bg-[hsl(231,15%,18%,1)] border-[0px]"
              : "bg-b5 text-t4 outline-b5 border-b5 dark:outline-[hsl(326,100%,74%,1)] dark:bg-[hsl(326,100%,74%,1)] dark:border-[hsl(326,100%,74%,1)] border"
          } flex shrink cursor-pointer flex-wrap justify-center items-center text-center rounded-lg h-12 text-sm leading-[1em] min-h-12 font-semibold uppercase dark:text-[hsl(328,26%,15%,1)] gap-2 ease-out duration-100`}
        >
          {animation ? (
            <div className="flex gap-2 justify-center items-center dark:text-white text-opacity-30">
              <ImSpinner8
                color="white"
                className="animate-spin opacity-30 w-6 h-6"
              />
              <span className="text-sm">Sending...</span>
            </div>
          ) : (
            "LOGIN"
          )}
        </button>
        <button
          onClick={(e) =>
            handleLoginRequest(e, "guestuser@email.com", "123456")
          }
          className="w-full text-t4 bg-b3 bg-opacity-100 border-opacity-100 text-opacity-100 dark:border-[hsl(269,89%,78%,1)] dark:bg-[hsl(269,89%,78%,1)] dark:outline-[hsl(269,89%,78%,1)] flex shrink cursor-pointer flex-wrap justify-center items-center text-center rounded-lg h-12 px-4 text-sm leading-[1em] min-h-12 font-semibold uppercase dark:text-[hsl(328,26%,15%,1)] border gap-2 ease-out duration-200"
        >
          GUEST USER
        </button>
        <span className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 text-b5 dark:text-[#FF57B6] hover:underline text-opacity-100"
          >
            Register
          </Link>{" "}
        </span>
      </form>
    </div>
  );
};

export default Login;
