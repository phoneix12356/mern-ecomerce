import axios from "axios";

export default axios.create({
  baseURL: "https://mern-ecomerce-lime.vercel.app/",
  withCredentials: true,
});
