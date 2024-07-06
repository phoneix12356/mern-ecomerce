import axios from "axios";
const API_URL = "https://mern-ecomerce-lime.vercel.app/";

const fetchDataByUserId = async () => {
  const response = await axios.get(`${API_URL}/cart/api/user`);

  return response.data;
};

const AddDataToUserCart = async (product) => {
  const obj = {
    pid: product.pid,
    quantity: product.quantity,
  };
  const result = await axios.post(`${API_URL}/cart/api/user`, obj);
  return result.data;
};

const UpdateCartDataInUserCart = async (product) => {
  const response = await axios.patch(`${API_URL}/cart/api/user`, product);
  return response.data;
};

const DeleteCartItemInUserCart = async (pid) => {
  try {
    const result = await axios.delete(`${API_URL}/cart/api/user`, { data: { pid } });
    return { id: pid, ...result.data };
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};

export {
  fetchDataByUserId,
  AddDataToUserCart,
  UpdateCartDataInUserCart,
  DeleteCartItemInUserCart,
};