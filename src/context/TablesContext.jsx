import { createContext, useState, useEffect } from 'react'

export const TableContext = createContext();

export const TableProvider = ({ children }) => {

    const [currentPage, setCurrentPage] = useState(
        parseInt(localStorage.getItem('currentPage')) || 1
    );

    const [lastPage, setLastPage] = useState(
        parseInt(localStorage.getItem('currentPage')) || 1
    );

    const [params, setParams] = useState(
        JSON.parse(localStorage.getItem('params')) || {}
    );

    useEffect(() => {
        // Guardar el estado actual en localStorage al cambiar currentPage o filters
        localStorage.setItem('currentPage', currentPage);
        localStorage.setItem('lastPage', lastPage);
        localStorage.setItem('params', JSON.stringify(params));
    }, [currentPage, lastPage, params]);

    return (
        <TableContext.Provider
            value={{
                currentPage,
                setCurrentPage,
                params,
                setParams,
                lastPage,
                setLastPage
            }}
        >
            { children }
        </TableContext.Provider>
    )
}