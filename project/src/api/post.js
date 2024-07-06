import axios from "axios";

export default axios.create({
  baseURL:  "https://mern-ecomerce-git-master-kartikay-agarwals-projects.vercel.app/" ,
  withCredentials: true,
});
