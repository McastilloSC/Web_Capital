import { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

//APIS
import axios from '../axios/axios.config'

export const CatalogosContext = createContext();

export const CatalogosProvider = ({ children }) => {

    const location = useLocation();
    const navigation = useNavigate()

    const [ loadingCatalogos, setLoadingCatalogos ] = useState(false);

    //Catalogos Pipeline
    const [ catalogosPipeline, setCatalogosPipeline ] = useState({}) 

    //Catalogos Capital
    const [ catalogosCapital, setCatalogosCapital ] = useState({})

    //Catalogos Capital
    const [ catalogosInventario, setCatalogosInventario ] = useState({})

    const onObtenerCatalogosPipeline = async () => {
        setLoadingCatalogos(true)
        try {
            const { data } = await axios.get('pipeline/catalogos');
            setCatalogosPipeline(data.catalogos)
        } catch (error) {
            setLoadingCatalogos(false)
            console.log(error)
        } finally {
            setLoadingCatalogos(false)
        }
        console.log(loadingCatalogos)
    }

    const onObtenerCatalogosCapital = async () => {
        try {
            setLoadingCatalogos(true)
            const { data } = await axios.get('capital/catalogos');
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
        if(location.pathname.match('/home/pipeline')){
            onObtenerCatalogosPipeline();
        }        

        if(location.pathname.match('/home/capital_humano')){
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
                catalogosPipeline, 
                setCatalogosPipeline,
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