import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const token = Cookies.get("authToken");
export const api = axios.create({
  baseURL: "https://gamzie.onehand.dev/admin",
  headers: { Authorization: "Bearer " + token },
});

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    const token = response?.data?.data?.token;
    Cookies.set("authToken", token, { secure: true, sameSite: "Strict" });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error(error.message);
  }
};

export const apiLogout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Error during API logout:", error);
  }
};

export const logout = async (navigate) => {
  try {
    await apiLogout();
  } finally {
    Cookies.remove("authToken", { secure: true, sameSite: "Strict" });
    navigate("/login");
  }
};
