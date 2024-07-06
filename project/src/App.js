import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Headers from "./components/Headers";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Product from "./components/Product";
import About from "./components/About";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Order from "./components/Order";
import ProductDescription from "./components/ProductDescription";
import { useSelector } from "react-redux";
import Checkout from "./components/Checkout";

const App = () => {
  const product = useSelector((state) => state.products.product);
  const mode = useSelector((state) => state.mode.darkMode);

  useEffect(() => {
    if (mode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [mode]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full min-h-screen  dark:bg-primary grid grid-rows-[40px_minmax(0px,_68px)_1fr]">
            <Headers />
            <Navbar />

            <Home />
          </div>
        }
      />
      <Route
        path="/products"
        element={
          <div className="  w-full min-h-screen   dark:bg-primary grid grid-rows-[40px_minmax(0px,_68px)_1fr]">
            <Headers />
            <Navbar />

            <Product />
          </div>
        }
      />
      <Route
        path="/products/:id"
        element={
          <div className="  w-full min-h-screen   dark:bg-primary grid grid-rows-[40px_minmax(0px,_68px)_1fr]">
            <Headers />
            <Navbar />

            <ProductDescription product={product} />
          </div>
        }
      />
      <Route
        path="/about"
        element={
          <div className="  w-full min-h-screen  dark:bg-primary grid grid-rows-[40px_minmax(0px,_68px)_1fr]">
            <Headers />
            <Navbar />

            <About />
          </div>
        }
      />
      <Route
        path="/cart"
        element={
          <div className="  w-full min-h-screen  overflow-auto   dark:bg-[#272935]  grid grid-rows-[40px_minmax(0,_68px)_1fr]">
            <Headers />
            <Navbar />
            <Cart />{" "}
          </div>
        }
      />
      <Route
        path="/order"
        element={
          <div className="  w-full min-h-screen  overflow-auto   dark:bg-[#272935]  grid grid-rows-[40px_minmax(0,_68px)_1fr]">
            <Headers />
            <Navbar />
            <Order />{" "}
          </div>
        }
      />
      <Route
        path="/checkout"
        element={
          <div className="  w-full min-h-screen  overflow-auto   dark:bg-[#272935]  grid grid-rows-[40px_minmax(0,_68px)_1fr]">
            <Headers />
            <Navbar />
            <Checkout />{" "}
          </div>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Login />
          </>
        }
      />
      <Route
        path="/register"
        element={
          <div>
            <Register />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
