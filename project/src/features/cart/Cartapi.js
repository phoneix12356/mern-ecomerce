import api from "../../api/post";
const fetchDataByUserId = async () => {
  const response = await api.get("/cart/api/user");
  return response.data;
};

const AddDataToUserCart = async (product) => {
  const obj = {
    pid: product.pid,
    quantity: product.quantity,
  };
  const result = await api.post(`/cart/api/user`, obj);
  return result.data;
};

const UpdateCartDataInUserCart = async (product) => {
  const response = await api.patch(`/cart/api/user`, product);
  return response.data;
};

const DeleteCartItemInUserCart = async (pid) => {
  try {
    const result = await api.delete(`/cart/api/user`, { data: { pid } });
    return { id: pid, ...result.data };
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error;
  }
};

export {
  fetchDataByUserId,
  AddDataToUserCart,
  UpdateCartDataInUserCart,
  DeleteCartItemInUserCart,
};
