import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserCart,
  DeleteItemofUserCart,
  UpdateItemToUserCart,
  NumberOfItemInCart,
} from "../features/cart/CartSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

import { changePage } from "../features/page/Page";
const Cart = () => {
  const [flag, setFlag] = useState(0);
  const list = useSelector((state) => state.cart.productList);
  const dispatch = useDispatch();
  const shipping = 5.0;
  const [total, setTotal] = useState(0);
  const [qnt, setQnt] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    dispatch(fetchUserCart());
    setFlag(1);
  }, [dispatch]);

  useEffect(() => {
    if (list.length > 0) {
      const totalItems = list.reduce((curr, next) => {
        return (curr = Number(curr) + Number(next.amount));
      }, 0);
      dispatch(NumberOfItemInCart({ cartSize: totalItems }));
      setQnt(list.map((product) => Number(product.amount)));
      setSubtotal(
        list.reduce((total, item) => {
          return total + Number(item.amount) * Number(item.cost);
        }, 0)
      );
      setTax(
        list.reduce((total, item) => {
          return total + Number(item.amount) * Number(item.tax);
        }, 0)
      );
      setTotal(subtotal + tax + 5.0);
    }
  }, [dispatch, list, subtotal, tax, total]);

  const handelChangeProductQuantity = (e, productId) => {
    const newQuantity = Number(e.target.value);
    const product = list.find((product) => product.id === productId);
    const prev = Number(product.cost) * Number(product.amount);
    const New = newQuantity * Number(product.cost);
    const prev1 = Number(product.tax) * Number(product.amount);
    const New1 = newQuantity * Number(product.tax);

    setSubtotal((previousValue) => previousValue - prev + New);
    setTax((previousValue) => previousValue - prev1 + New1);
    setTotal(subtotal + tax + 5.0);

    dispatch(
      UpdateItemToUserCart({
        pid: String(productId),
        quantity: newQuantity,
      })
    );

    setQnt((prevQnt) =>
      prevQnt.map((quantity, index) =>
        list[index].id === productId ? newQuantity : quantity
      )
    );
  };

  const QuantityofProduct = (range, productId, initialAmount) => {
    const numbers = Array.from({ length: range }, (_, index) => index + 1);

    return (
      <select
        className=" dark:bg-[hsl(231,15%,18%,1)] shrink min-h-6 leading-7 border-opacity-20 inline-flex cursor-pointer border  dark:border-[hsl(60,30%,96%,0.2)] w-full max-w-[320px] sm:max-w-[2.5rem] font-semibold rounded-lg"
        onChange={(e) => handelChangeProductQuantity(e, productId)}
        value={initialAmount}
      >
        {numbers.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    );
  };

  if (flag === 0) {
    return <>Loading</>;
  }

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

  return (
    <div className=" dark:text-[hsl(60,30%,96%)]  w-full min-h-screen py-20 px-[10%] sm:px-[5%] lg:px-[10%]">
      <h1 className="text-3xl mb-4 h-12 border-b border-b-b6 dark:border-black">
        Shopping Cart
      </h1>
      <div className="w-full h-full grid grid-row-4 gap-4 lg:gap-0 lg:grid-cols-[70%_30%]">
        <div className="w-full">
          <div className="w-full flex flex-col">
            {list.map((val, index) => (
              <div
                className="w-full flex flex-col md:items-center gap-8 sm:grid sm:grid-cols-4 mb-12  border-b border-b-b6 dark:border-black  "
                key={index}
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4 mt-2 rounded-lg">
                  <img
                    className="w-full h-full rounded-lg"
                    src={val.img}
                    alt="product_image"
                  />
                </div>

                <ul className="w-full h-full flex flex-col md:items-start gap-2">
                  <li className="w-full">{val.title}</li>
                  <li className="w-full  dark:text-[hsl(232,7%,85%,1)] text-sm">
                    {val.madeBy}
                  </li>
                  <li>Color</li>
                </ul>

                <div className="h-full flex flex-col gap-2  dark:text-white">
                  <span>Amount</span>

                  {QuantityofProduct(qnt[index] + 5, val.id, qnt[index])}

                  <div
                    onClick={() => {
                      dispatch(DeleteItemofUserCart({ pid: val.id }));
                      setTimeout(() => {
                        dispatch(fetchUserCart());
                      }, 100);
                    }}
                    className="text-b5  dark:text-[#FF7AC6] font-medium cursor-pointer"
                  >
                    remove
                  </div>
                </div>
                <div className="md:w-full md:h-full md:flex md:justify-end md:pr-36">
                  ${val.cost}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-full  ">
          <div className="bg-b2   dark:bg-[hsl(231,15%,11%,1)]  w-full max-h-48 p-8  rounded-2xl">
            <ul className="flex flex-col basis-auto">
              <li className="flex justify-between text-xs pb-2">
                <span>Subtotal</span>{" "}
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </li>

              <li className=" w-full h-[0.1px] mb-2"></li>
              <li className="flex text-xs justify-between pb-2">
                Shipping{" "}
                <span className="font-medium ">${shipping.toFixed(2)}</span>
              </li>
              <li className="  w-full h-[0.1px] mb-2"></li>
              <li className="flex text-xs justify-between pb-2 ">
                Tax <span className="font-medium ">${tax.toFixed(2)}</span>
              </li>
              <li className=" dark:bg-black w-full h-[0.1px] mb-2 "></li>
              <li className="flex text-xs justify-between mt-4 pb-2">
                Order Total{" "}
                <span className="font-medium ">
                  ${(subtotal + tax + shipping).toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
          <Link
            to="/checkout"
            onClick={() => dispatch(changePage(5))}
            className="text-b2 btn-pop bg-b5 border-b5 outline-b5 dark:bg-[#FF7AC6]  dark:border-[#FF7AC6] text-opacity-100 bg-opacity-100 border-opacity-100 inline-flex gap-2 min-h-12 h-12 px-4 text-sm leading-[1em] rounded-xl  dark:text-[hsl(328,26%,15%,1)] justify-center items-center flex-wrap font-semibold border w-full mt-8  dark:outline-[#ff7AC6]"
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
