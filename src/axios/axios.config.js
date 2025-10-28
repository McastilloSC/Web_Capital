import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Interceptor para agregar el token a cada request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token_auth_sc");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔹 Interceptor para manejar errores 401 globalmente
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token_auth_sc");
      delete instance.defaults.headers.common["Authorization"];
      // setLogged(false) debería hacerlo el AuthContext cuando detecte usuario nulo
    }
    return Promise.reject(error);
  }
);

export default instance;
