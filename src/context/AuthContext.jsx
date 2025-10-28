import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axios/axios.config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [logged, setLogged] = useState(false);

  const [sistemasAcceso, setSistemasAccesos] = useState({});
  const [administradores, setAdministradores] = useState({});
  const [perfilCapital, setPerfilCapital] = useState({});

  // 🔹 Obtener info del usuario
  const onObtenerUsuario = async () => {
    setLoadingAuth(true);
    try {
      const { data } = await axios.get("/auth/informacion_usuario");
      setUsuario(data.usuario);
      setAdministradores(data.administrador);
      setSistemasAccesos(data.sistemas);
      setPerfilCapital(data.perfil_capital);
      setLogged(true);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      localStorage.removeItem("token_auth_sc");
      setLogged(false);
      navigate("/"); // redirige al login si falla
    } finally {
      setLoadingAuth(false);
    }
  };

  // 🔹 Login
  const onLogin = async (values) => {
    setLoadingAuth(true);
    try {
      const { data } = await axios.post("/auth/login", values);
      localStorage.setItem("token_auth_sc", data.token);
      await onObtenerUsuario(); // obtiene usuario y llena contexto
    } catch (error) {
      toast(error.response?.data?.error || "Error al iniciar sesión");
      throw error;
    } finally {
      setLoadingAuth(false);
    }
  };

  // 🔹 Logout
  const onLogout = () => {
    localStorage.removeItem("token_auth_sc");
    setUsuario(null);
    setLogged(false);
    navigate("/");
  };

  // 🔹 Al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token_auth_sc");
    if (token) {
      onObtenerUsuario();
    } else {
      setLoadingAuth(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        loadingAuth,
        sistemasAcceso,
        perfilCapital,
        administradores,
        logged,
        setLogged,
        onLogin,
        onLogout,
        onObtenerUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
