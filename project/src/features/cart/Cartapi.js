import axios from "axios";

const fetchDataByUserId = async () => {
  const response = await axios.get(`/cart/api/user`);

  return response.data;
};

const AddDataToUserCart = async (product) => {
  const obj = {
    pid: product.pid,
    quantity: product.quantity,
  };
  const result = await axios.post(`/cart/api/user`, obj);
  return result.data;
};

const UpdateCartDataInUserCart = async (product) => {
  const response = await axios.patch(`/cart/api/user`, product);
  return response.data;
};

const DeleteCartItemInUserCart = async (pid) => {
  try {
    const result = await axios.delete(`/cart/api/user`, { data: { pid } });
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