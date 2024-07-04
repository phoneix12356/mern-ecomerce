import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NumberOfItemInCart,
  DeleteItemofUserCart,
  fetchUserCart,
  updateCartSize,
} from "../features/cart/CartSlice";
import axios from "axios";
import { Link } from "react-router-dom";

const Checkout = () => {
  const list = useSelector((state) => state.cart.productList);
  const dispatch = useDispatch();
  const shipping = 5.0;
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [qnt, setQnt] = useState([]);

  useEffect(() => {
    if (list.length > 0) {
      const totalItems = list.reduce((curr, next) => {
        return curr + Number(next.amount);
      }, 0);
      dispatch(NumberOfItemInCart({ cartSize: totalItems }));

      const newSubtotal = list.reduce((total, item) => {
        return total + Number(item.amount) * Number(item.cost);
      }, 0);
      setSubtotal(newSubtotal);
      setQnt(
        list.reduce((current, next) => Number(current) + Number(next.amount), 0)
      );
      const newTax = list.reduce((total, item) => {
        return total + Number(item.amount) * Number(item.tax);
      }, 0);
      setTax(newTax);

      setTotal(newSubtotal + newTax + shipping);
    }
  }, [list, shipping, dispatch]);

  if (!list.length) {
    return (
      <div className=" px-8 py-20 max-w-6xl w-full mx-auto flex flex-col gap-8">
        <h1 className="text-3xl w-full  text-b1 dark:text-white font-medium tracking-wider">
          Your Cart is empty
        </h1>
        <div className="bg-b6  w-full dark:bg-black h-[0.5px]"></div>
      </div>
    );
  }

  const formatDate = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    const suffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${formattedHours}:${formattedMinutes} ${ampm} - ${month} ${day}${suffix(
      day
    )}, ${year}`;
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedDate = formatDate(now);
    try {
      await axios.post("/orders/api/order", {
        name: name,
        address: address,
        date: formattedDate,
        products: qnt,
        cost: total,
      });
      dispatch(DeleteItemofUserCart({ pid: -1 }));
      dispatch(fetchUserCart());
      dispatch(updateCartSize());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-full text-white ">
      <div className="max-w-6xl mx-auto px-8 py-20">
        <h1 className="text-3xl h-14 tracking-wider capitalize font-medium border-b dark:border-black">
          {" "}
          place your order{" "}
        </h1>
        <main className="grid grid-flow-row md:grid-cols-2 mt-8 gap-8 ">
          <form
            className="flex flex-col gap-y-3"
            onSubmit={handleSubmitRequest}
          >
            <h2 className="font-medium capitalize text-xl mb-4">
              shipping information
            </h2>
            <label htmlFor="name" className="text-sm">
              First Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="bg-transparent border dark:border-[hsl(60,30%,96%,0.2)]  rounded-lg mb-2  h-12"
            />
            <label htmlFor="address" className="text-sm">
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="bg-transparent border dark:border-[hsl(60,30%,96%,0.2)]  rounded-lg mb-2 h-12"
            />
            <Link
              to="/order"
              onClick={handleSubmitRequest}
              type="submit"
              className="dark:bg-pink-btn uppercase dark:text-black/80 flex items-center justify-center font-medium rounded-lg h-12"
            >
              Place Your Order
            </Link>
          </form>

          <div className="bg-b2   dark:bg-[hsl(231,15%,11%,1)]  w-full max-h-48 p-8  rounded-2xl">
            <ul className="flex flex-col basis-auto">
              <li className="flex justify-between text-xs pb-2">
                <span>Subtotal</span>{" "}
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </li>

              <li className=" w-full h-[0.1px] dark:bg-black/50s mb-2"></li>
              <li className="flex text-xs justify-between pb-2">
                Shipping{" "}
                <span className="font-medium ">${shipping.toFixed(2)}</span>
              </li>
              <li className="  w-full h-[0.1px] dark:bg-black/50 mb-2"></li>
              <li className="flex text-xs justify-between pb-2 ">
                Tax <span className="font-medium ">${tax.toFixed(2)}</span>
              </li>
              <li className=" dark:bg-black/50 w-full h-[0.1px] mb-2 "></li>
              <li className="flex text-xs justify-between mt-4 pb-2">
                Order Total{" "}
                <span className="font-medium ">${total.toFixed(2)}</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Checkout;
