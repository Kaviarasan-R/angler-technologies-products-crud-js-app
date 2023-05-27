import axios from "axios";

const API_URL = "http://localhost:5000/api/user/";

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const forgotPassword = async (userData) => {
  console.log(userData);
  const response = await axios.post(
    API_URL + `forgot-password?mail=${userData}`
  );
  return response.data;
};

const logout = async (userData) => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
  forgotPassword,
};

export default authService;
