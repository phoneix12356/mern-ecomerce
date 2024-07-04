import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import {
  AddItemToUserCart,
  UpdateItemToUserCart,
  fetchUserCart,
} from "../features/cart/CartSlice";
import { Link, useParams } from "react-router-dom";
import { AsyncFetchAllProducts } from "../features/products/productsSlice";
import { toast } from "react-toastify";
import { changePage } from "../features/page/Page";
import { useLocalStorage } from "../hooks/localstorage";

const ProductDescription = () => {
  const [flag, setFlag] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();
  const {getItem} = useLocalStorage('key');
  const username = getItem();
  const [product, setProduct] = useState({
    id: 0,
    title: "",
    cost: 0,
    img: "",
    madeBy: "",
    description: "",
  });
  const productID = Number(params.id);
  const nums = useSelector((state) => state.products.List);
  const list = useSelector((state) => state.cart.productList);
  const status = useSelector((state) => state.products.status);

  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };

  useEffect(() => {
    dispatch(AsyncFetchAllProducts({}));
  }, [dispatch]);

  useEffect(() => {
    if (nums && nums.length > 0 && productID > 0 && productID <= nums.length) {
      setProduct(nums[productID - 1]);
    }
  }, [nums, productID]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchUserCart());
    }, 100);
  }, [flag, dispatch]);

  const handleAddProductToCart = async (amount) => {
    if (!username) return toast.error("please login first");
    toast.success("Item added to the cart");
    const pid = product ? product.id : 0;

    let index = list.findIndex((obj) => obj.id === product.id);

    if (index !== -1) {
      dispatch(UpdateItemToUserCart({ pid, quantity: amount }));
    } else if (index === -1 && !isAdded) {
      setIsAdded(true);
      dispatch(AddItemToUserCart({ pid, quantity: amount }));
    }
    setFlag(!flag);
  };

  if (status === "Loading")
    return (
      <div className="w-full h-full flex justify-center items-center">
        <PuffLoader color="white" />
      </div>
    );

  if (!product || product.id === 0)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p>Product not found</p>
      </div>
    );

  const { id, title, cost, img, madeBy, description } = product;
  let v = [];
  for (let i = 1; i <= 20; i++) v.push(i);

  return (
    <div className="dark:bg-[#272935]  px-8 lg:px-[14%] py-[6%] dark:text-white">
      <div className="w-full grid grid-rows-[50px_1fr] gap-2">
        <div className="w-full">
          <Link
            to="/"
            onClick={() => handlePageChange(1)}
            className="hover:underline"
          >
            Home
          </Link>
          <span className="dark:text-[#6F7076]">{">"}</span>
          <Link
            to="/products"
            onClick={() => handlePageChange(3)}
            className="hover:underline"
          >
            Products
          </Link>
        </div>
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[_50%_1fr] lg:gap-6">
          <div className="w-full">
            <img
              className="shadow-lg rounded-lg max-h-[380px] w-full h-full max-w-[500px] object-cover"
              key={id}
              src={img}
              alt="product"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-3xl capitalize">{title}</h1>
            <h2 className="font-bold text-xl">{madeBy}</h2>
            <h3 className="text-xl mb-4">${cost}</h3>
            <p className="leading-8 tracking-wider mb-4">{description}</p>
            <p className="text-xl font-medium tracking-wider capitalize cz-color-15923448 cz-color-15460325">
              colors
            </p>
            <div className="flex gap-2">
              <button className="dark:bg-blue-500 h-6 w-6 rounded-[50%] focus:border-2 dark:focus:border-violet-300"></button>
              <button className="dark:bg-slate-500 h-6 w-6 rounded-[50%] focus:border-2 dark:focus:border-violet-300"></button>
            </div>
            <span className="text-xl font-medium tracking-wider capitalize cz-color-15923448 cz-color-15460325 mt-4">
              Amount
            </span>
            <select
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent border-2 dark:border-[#BF95F9] rounded-lg max-w-[300px] h-[50px]"
            >
              {v.map((va, i) => (
                <option className="dark:bg-[#272935]" key={i}>
                  {va}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleAddProductToCart(amount)}
              className="bg-b7 uppercase text-xs lg:text-md font-medium text-t5 dark:bg-[#BF95F9] dark:text-black h-10 max-w-[120px] p-2 rounded-lg"
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
