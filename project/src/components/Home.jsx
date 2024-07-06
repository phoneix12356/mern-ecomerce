import React, { useEffect } from "react";
import img1 from "../Assests/Images/img1.webp";
import img2 from "../Assests/Images/img2.webp";
import img3 from "../Assests/Images/img3.webp";
import img4 from "../Assests/Images/img4.webp";
import { Link } from "react-router-dom";
import { AsyncFetchAllProducts } from "../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import PuffLoader from "react-spinners/PuffLoader";
import { DataOFALLProducts } from "../features/cart/CartSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { List: list, status } = useSelector((state) => state.products);
  const Images = [img1, img2, img3, img4];

  useEffect(() => {
    dispatch(AsyncFetchAllProducts({}))
      .unwrap()
      .then((data) => {
        dispatch(DataOFALLProducts({ data }));
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, [dispatch]);

  
  if (status === "Loading")
    return (
      <div className="w-full h-full flex justify-center items-center">
        <PuffLoader color="white" />
      </div>
    );

  return (
    <main className="w-full box-border flex flex-col gap-20 dark:text-white mx-auto max-w-6xl my-20 px-4">
      <section className="w-full max-h-[450px] grid grid-cols-1 lg:grid-cols-2 gap-10 tracking-tight">
        <div className="flex flex-col gap-6 items-start flex-wrap">
          <span className="max-w-2xl text-4xl mt-4 font-bold tracking-tight sm:text-6xl cz-color-15923448 cz-color-15460325">
            We are changing the way people shop
          </span>
          <span className="max-w-xl text-xl mb-12 mt-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </span>
          <Link
            to="/products"
            className="p-4 bg-b5 text-t4 dark:text-black font-semibold btn-pop dark:bg-pink-btn rounded-lg"
          >
            OUR PRODUCTS
          </Link>
        </div>
        <div className="hidden max-h-[450px] bg-b1 dark:lg:bg-[#414558] lg:p-4 lg:flex lg:gap-4 lg:max lg:overflow-scroll scrollbar-hide lg:rounded-lg">
          {Images.map((image, index) => (
            <img
              key={index}
              className="max-h-[450px] w-80 rounded-2xl object-cover"
              src={image}
              alt={`Hero ${index + 1}`}
            />
          ))}
        </div>
      </section>
      <section className="mt-4 flex flex-col gap-4 w-full">
        <h1 className="text-3xl font-medium tracking-wider capitalize">
          Featured Products
        </h1>
        <div className="dark:bg-black w-full h-[0.5px]"></div>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list
            ?.filter((_, index) => index <= 2)
            .map((product, index) => (
              <Link
                to={`/products/${product.id}`}
                key={index}
                className="duration-300 w-full flex flex-col gap-4 border-0 justify-center items-center shadow-xl hover:shadow-2xl p-4 rounded-2xl"
              >
                <div className="w-full pt-4 px-4">
                  <img
                    src={product.img}
                    alt={product.title || "Product"}
                    className="h-64 md:h-48 w-full object-cover rounded-xl"
                  />
                </div>
                <span className="text-xl font-semibold">{product.title}</span>
                <span className="text-b3 dark:text-[#BF95F9]">
                  ${product.cost}
                </span>
              </Link>
            ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
