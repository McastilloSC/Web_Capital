import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// API
import axios from '../axios/axios.config';

export const CatalogosContext = createContext();

export const CatalogosProvider = ({ children }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [loadingCatalogos, setLoadingCatalogos] = useState(false);

    // Catalogos Capital
    const [catalogosCapital, setCatalogosCapital] = useState({
        incidencias_generales: [],
        incidencias_montos: [],
        ubicaciones: [],
        areas: [],
        clientes: [],
        puestos: [],
        centro_costos: [],
        jefes_directos: [],
        empresas: [],
        bancos: [],
        tabulador: [],
    });

    // Catalogos Inventario
    const [catalogosInventario, setCatalogosInventario] = useState({});

    // 🔹 Helper general para obtener token y manejar expiración
    const setAuthHeader = () => {
        const token = localStorage.getItem("token_auth_sc");
        if (!token) return false;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return true;
    };

    // 🔹 Catalogos de Capital
    const onObtenerCatalogosCapital = async () => {
        try {
            setLoadingCatalogos(true);

            if (!setAuthHeader()) {
                console.warn("⚠️ No hay token, redirigiendo al login");
                navigate('/');
                return;
            }

            const { data } = await axios.get('capital/catalogos');
            setCatalogosCapital(data.catalogos);

        } catch (error) {
            console.error("❌ Error al obtener catálogos capital:", error);
            if (error.response?.status === 401) {
                // Token inválido o expirado
                localStorage.removeItem("token_auth_sc");
                delete axios.defaults.headers.common["Authorization"];
                navigate('/');
            }
        } finally {
            setLoadingCatalogos(false);
        }
    };

    // 🔹 Catalogos de Inventario
    const onObtenerCatalogosInventario = async () => {
        try {
            setLoadingCatalogos(true);

            if (!setAuthHeader()) {
                console.warn("⚠️ No hay token, redirigiendo al login");
                navigate('/');
                return;
            }

            const { data } = await axios.get('inventario/catalogos');
            setCatalogosInventario(data.catalogos);

        } catch (error) {
            console.error("❌ Error al obtener catálogos inventario:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("token_auth_sc");
                delete axios.defaults.headers.common["Authorization"];
                navigate('/');
            }
        } finally {
            setLoadingCatalogos(false);
        }
    };

    // 🔹 Detecta cambios de ruta y obtiene los catálogos correspondientes
    useEffect(() => {
        if (location.pathname.includes('/capital_humano')) {
            onObtenerCatalogosCapital();
        }

        if (location.pathname.includes('/home/inventario')) {
            onObtenerCatalogosInventario();
        }
    }, [location.pathname]);

    return (
        <CatalogosContext.Provider
            value={{
                loadingCatalogos,
                catalogosCapital,
                setCatalogosCapital,
                catalogosInventario,
                setCatalogosInventario,
            }}
        >
            {children}
        </CatalogosContext.Provider>
    );
};
