import { useContext, useState } from "react"
import TablaPerfiles from "../../components/Capital/Perfiles/TablaPerfiles";
import ModalNuevoPerfil from "../../components/Capital/Perfiles/Modales/ModalNuevoPerfil";
import { AuthContext } from "../../context/AuthContext";
import PageError from "../../components/UI/PageError";

const Perfiles = () => {

    const { perfilCapital, sistemasAcceso } = useContext(AuthContext)

    const [ perfiles, setPerfiles ] = useState([])
    const [ perfilesPagination, setPerfilesPagination ] = useState([])

    const [ modalNuevoPerfil, setModalNuevoPerfil ] = useState(false)

    if(!perfilCapital.menus.menu_perfiles || !sistemasAcceso.capital) return <PageError/>

    return (
        <div className="mt-5">

            { modalNuevoPerfil && (
                <ModalNuevoPerfil
                    setModalNuevoPerfil={setModalNuevoPerfil}
                    setPerfiles={setPerfiles}
                    setPerfilesPagination={setPerfilesPagination}
                /> 
            )}

            <div className="card">
                <div className="card-body bg-white p-0 rounded-lg">
                    <div className="flex  justify-between p-3 border-b-2 border-gray-400">
                        <h1 className="font-semibold">Lista de Perfiles</h1>
                        <label htmlFor="modal_nuevo_perfil" onClick={() => setModalNuevoPerfil(true)} className="btn btn-sm btn-secondary">Nuevo Perfil</label>
                    </div>
                    <TablaPerfiles 
                        perfiles={perfiles}
                        setPerfiles={setPerfiles}
                        perfilesPagination={perfilesPagination}
                        setPerfilesPagination={setPerfilesPagination}
                    />
                </div>
            </div>
        </div>
    )
}

export default Perfiles