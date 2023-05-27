import axios from "axios";

const API_URL = "http://localhost:5000/api/product/";

const getProduct = async (productData, token) => {
  // Set the Bearer token
  const bearerToken = token.token;
  const id = token.id;

  // Create an options object with the Authorization header
  const options = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    params: {
      page: productData.pageNumber,
      sort: productData.sortPage,
      category: productData.category,
    },
  };
  const response = await axios.get(API_URL + "get-product", options);
  return response.data;
};

const searchProduct = async (productData, token) => {
  const bearerToken = token.token;
  const id = token.id;

  // Create an options object with the Authorization header
  const options = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    params: {
      page: productData.pageNumber,
      search: productData.searchWord,
    },
  };

  const response = await axios.get(API_URL + "search-product", options);
  return response.data;
};

const addProduct = async (productData, token) => {
  const bearerToken = token.token;
  const id = token.id;

  const options = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(
    API_URL + "add-product",
    productData,
    options
  );
  return response.data;
};

const updateProduct = async (productData, token) => {
  const bearerToken = token.token;
  const userID = token._id;
  const authID = productData.authID;

  if (userID === authID) {
    const options = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.put(
      API_URL + "update-product",
      productData,
      options
    );
    return response.data;
  } else {
    throw new Error("User not matched");
  }
};

const deleteProduct = async (productData, token) => {
  const bearerToken = token.token;
  const userID = token._id;
  const authID = productData.authID;
  const productID = productData.productID;

  console.log(userID, authID, productID);
  if (userID === authID) {
    const options = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const response = await axios.delete(
      API_URL + `delete-product/${productID}`,
      options
    );
    return response.data;
  } else {
    throw new Error("User not matched");
  }
};

const productService = {
  getProduct,
  searchProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
