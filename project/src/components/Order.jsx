import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [orderList, setOrderList] = useState([]);
  const handleOrderList = async () => {
    try {
      const res = await axios.get("/orders/api/order");
  
      setOrderList([...res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleOrderList();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-full max-w-6xl mx-auto px-8 py-20 text-white ">
        <h1 className="text-3xl h-14 tracking-wider capitalize font-medium border-b dark:border-black">
          {" "}
          your orders{" "}
        </h1>
        <h2 className="text-xl h-14 tracking-wider capitalize mt-8 ">
          Total Orders
        </h2>
        <table className="w-full text-left">
          <thead className="w-full">
            <tr className="text-xs font-bold text-[hsl(60,30%,96%,0.6)] [&>th]:px-4 [&>th]:py-3">
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
                      className="w-full min-h-10 text-xs max-w-6xl  even:bg-[#181920] even:text-white [&>th]:px-4 [&>th]:py-3 "
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
