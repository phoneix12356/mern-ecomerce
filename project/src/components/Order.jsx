import axios from "axios";
import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Order = () => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setLoading] = useState(0);
  const API_URL = "https://mern-ecomerce-5tzn.onrender.com";
  const handleOrderList = async () => {
    try {
      setLoading(1);
      const res = await axios.get(`${API_URL}/orders/api/order`);
      setLoading(0);
      setOrderList([...res.data]);
    } catch (err) {
      setLoading(0);
      console.log(err);
    }
  };

  useEffect(() => {
    handleOrderList();
  }, []);

  if (!orderList.length && !isLoading) {
    return (
      <div className=" px-8 py-20 max-w-6xl w-full mx-auto flex flex-col gap-8">
        <h1 className="text-3xl w-full  text-b1/85 dark:text-white font-medium tracking-wider">
          Please make an order
        </h1>
        <div className="bg-b6  w-full dark:bg-black h-[0.5px]"></div>
      </div>
    );
  } else if (isLoading) {
    <div className="w-full h-full flex justify-center items-center">
      <PuffLoader color="white" />
    </div>;
  }
  return (
    <div className="w-full h-full">
      <div className="w-full max-w-6xl mx-auto px-8 py-20 text-black dark:text-white  ">
        <h1 className="text-3xl h-14 tracking-wider capitalize font-medium border-b dark:border-black">
          {" "}
          your orders{" "}
        </h1>
        <h2 className="text-md h-12 tracking-wider capitalize mt-8 ">
          Total Orders: {orderList?.length}
        </h2>
        <table className="w-full text-left">
          <thead className="w-full">
            <tr className="text-xs font-bold  text-[hsl(214,30%,32%,0.5)] dark:text-[hsl(60,30%,96%,0.6)] [&>th]:px-4 [&>th]:py-3 border-b border-b-b6 dark:border-b-black">
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Costs</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody className="w-full ">
            {!orderList.length
              ? ""
              : orderList.map((val, index) => {
                  return (
                    <tr
                      className="w-full min-h-10 text-xs max-w-6xl even:bg-b2 text-black/50  dark:even:bg-[#181920] dark:text-white/90 [&>th]:px-4 [&>th]:py-3 border-b-b6 dark:border-b-black "
                      key={index}
                    >
                      <th>{val.name}</th>
                      <th>{val.address}</th>
                      <th>{val.products}</th>
                      <th>${val.cost.toFixed(2)}</th>
                      <th className="hidden sm:block">{val.date}</th>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
