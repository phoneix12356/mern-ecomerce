import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ImSpinner8 } from "react-icons/im";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animation, setAnimation] = useState(0);

  const navigate = useNavigate();

  const handleSignUpRequest = async (e) => {
    e.preventDefault();
    setAnimation(1);
    try {
      await axios.post("/api/signup", {
        username,
        email,
        password,
      });
      toast.success("Sign up Successfull");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (e) {
      if (e.response.data.error) toast.error(e.response.data.error);
      else {
        toast.error(e.message);
      }
    } finally {
      setAnimation(0);
    }
  };

  return (
    <div className="dark:bg-[#272935] w-[100vw] font-comfy-sofa h-screen items-center dark:text-[#F8F8F2] flex justify-center">
      <form className="w-96 flex flex-col bg-opacity-100 dark:bg-[hsl(231,15%,18%,1)] gap-y-4 dark:bg-[#272935] p-8 shadow-lg ">
        <h1 className="text-center text-3xl font-bold leading-9">Register</h1>
        <label className="dark:text-[hsl(60,30%,96%,1)] leading-5 text-sm">
          Username
        </label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="flex shrink h-12 px-4 leading-6 border dark:border-[hsl(60,30%,96%,0.2)] dark:bg-[#272935] rounded-lg bg-opacity-100"
        />
        <label className="dark:text-[hsl(60,30%,96%,1)] leading-5 text-sm">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="flex shrink h-12 px-4 leading-6 border dark:border-[hsl(60,30%,96%,0.2)] dark:bg-[#272935] rounded-lg bg-opacity-100"
        />
        <label className="dark:text-[hsl(60,30%,96%,1)] leading-5 text-sm">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="flex shrink h-12 px-4 leading-6 border dark:border-[hsl(60,30%,96%,0.2)] dark:bg-[#272935] rounded-lg bg-opacity-100"
        />
        <button
          onClick={handleSignUpRequest}
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
            "Register"
          )}
        </button>
        <span className="text-center">
          Already a member?{" "}
          <Link
            to="/login"
            className="ml-2  text-b5 dark:text-[#FF57B6] hover:underline"
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
