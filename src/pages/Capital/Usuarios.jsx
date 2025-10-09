import { useState } from "react"
import TablaUsuarios from "../../components/Capital/Usuarios/TablaUsuarios"
import ModalNuevoUsuario from "../../components/Capital/Usuarios/Modales/ModalNuevoUsuario"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import PageError from "../../components/UI/PageError"

const Usuarios = () => {

    const { perfilCapital, sistemasAcceso } = useContext(AuthContext)

    const [ usuarios, setUsuarios ] = useState([])
    const [ usuariosPagination, setUsuariosPagination ] = useState([])

    const [ modalNuevoUsuario, setModalNuevoUsuario ] = useState(false)

    if(!perfilCapital.menus.menu_usuarios || !sistemasAcceso.capital) return <PageError/>

    return (
        <div>
            { perfilCapital.usuario.registrar_usuario && modalNuevoUsuario && (
                <ModalNuevoUsuario
                    setModalNuevoUsuario={setModalNuevoUsuario}
                    setUsuarios={setUsuarios}
                    setUsuariosPagination={setUsuariosPagination}    
                /> 
            )}

            <div className="card">
                <div className="card-body p-0 bg-white rounded-lg">
                    <div className="flex justify-between p-3 border-b-2 border-gray-300">
                        <h1>Lista de Usuarios</h1>
                        { perfilCapital.usuario.registrar_usuario && (
                            <label htmlFor="capital_modal_nuevo_usuario" onClick={() => setModalNuevoUsuario(true)} className="btn btn-sm btn-secondary">Nuevo Usuario</label>
                        )}
                    </div>
                    <div className="px-3">
                        <TablaUsuarios
                            usuarios={usuarios}
                            setUsuarios={setUsuarios}
                            usuariosPagination={usuariosPagination}
                            setUsuariosPagination={setUsuariosPagination}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Usuarios