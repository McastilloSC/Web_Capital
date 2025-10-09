import { useEffect, useState } from "react";
import { BsCaretLeftFill, BsCaretLeft , BsCaretRightFill, BsCaretRight } from "react-icons/bs";

const Paginacion = ({ setCurrentPage, currentPage, lastPage }) => {

    const [ pagina, setPagina ] = useState(currentPage);

    const onKeyPress = (event) => { 
        if (event.key === 'Enter') {
            setCurrentPage(pagina)
        }
    }

    useEffect(() => {
        setPagina(currentPage)
    }, [currentPage])

    return (  
        <div className="join my-4">
            <button className="join-item btn btn-sm" onClick={() => [setCurrentPage(1), setPagina(1)]}>
                <BsCaretLeftFill/>
            </button>
            <button className="join-item btn btn-sm" onClick={() => currentPage > 1 && [setCurrentPage(currentPage - 1), setPagina(currentPage - 1)]}>
                <BsCaretLeft />
            </button>
            <div className="join-item flex justify-center items-center px-2">
                <h1 className="text-xs">Pagina</h1>
            </div>
            <input className="join-item input-sm input input-bordered w-16 text-center focus:outline-none" type="text" inputMode="numeric" pattern="[0-9]*" step={1} value={pagina} onChange={(e) => setPagina(e.target.value)} onKeyUp={onKeyPress}/>
            <div className="join-item flex justify-center items-center px-2">
                <h1 className="text-xs">De {lastPage}</h1>
            </div>                
            <button className="join-item btn btn-sm" onClick={() => currentPage < lastPage && [setCurrentPage(currentPage + 1), setPagina(currentPage + 1)]}>
                <BsCaretRight />
            </button>
            <button className="join-item btn btn-sm" onClick={() => [setCurrentPage(lastPage), setPagina(lastPage)]}>
                <BsCaretRightFill/>
            </button>

        </div>
    )
}

export default Paginacion