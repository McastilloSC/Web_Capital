import { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

//APIS
import axios from '../axios/axios.config'

export const CatalogosContext = createContext();

export const CatalogosProvider = ({ children }) => {

    const location = useLocation();
    const navigation = useNavigate()

    const [ loadingCatalogos, setLoadingCatalogos ] = useState(false);

    //Catalogos Capital
    const [ catalogosCapital, setCatalogosCapital ] = useState({
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
    })

    //Catalogos Inventario
    const [ catalogosInventario, setCatalogosInventario ] = useState({})

    const onObtenerCatalogosCapital = async () => {
        try {
            setLoadingCatalogos(true)
            const { data } = await axios.get('capital/catalogos');
            //console.log('📦 Catálogos recibidos:', data);
            //console.log('🔢 Número de catálogos:', Object.keys(data).length);
            setCatalogosCapital(data.catalogos)
        } catch (error) {
            setLoadingCatalogos(false)
            console.log(error)
        } finally {
            setLoadingCatalogos(false)
        }
    }

    const onObtenerCatalogosInventario = async () => {
        try {
            setLoadingCatalogos(true)
            const { data } = await axios.get('inventario/catalogos');
            setCatalogosInventario(data.catalogos)
        } catch (error) {
            setLoadingCatalogos(false)
            console.log(error)
        } finally {
            setLoadingCatalogos(false)
        }
    }

    useEffect(() => {
        if(location.pathname.match('/capital_humano')){
            onObtenerCatalogosCapital();
        } 

        if(location.pathname.match('/home/inventario')){
            onObtenerCatalogosInventario();
        } 
    }, [location.pathname, navigation])

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
            { children }
        </CatalogosContext.Provider>
    )
}