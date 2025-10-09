import { useContext, useEffect, useState } from "react"

//APIS
import axios from '../../../axios/axios.config'
import LoadingDiv from "../../UI/LoadingDiv"
import ModalEditaUsuario from "../Usuarios/Modales/ModalEditaUsuario"
import { AuthContext } from "../../../context/AuthContext"

const TablaUsuarios = ({ usuarios, setUsuarios, usuariosPagination, setUsuariosPagination }) => {

    const { perfilCapital } = useContext(AuthContext)

    //Query Params
    const [ urlPagination , setUrlPagination ] = useState()

    const [ loading, setLoading ] = useState(false)
    const [ modalEditaUsuario, setModalEditaUsuario ] = useState(false)
    const [ usuario, setUsuario ] = useState();

    useEffect(() => {
        const onObtenerUsuarios = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(urlPagination ? urlPagination : '/capital/usuarios');
                setUsuarios(data.usuarios.data)
                setUsuariosPagination(data.usuarios.links)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
            setLoading(false)
        }
        onObtenerUsuarios()
    }, [urlPagination, setUsuarios, setUsuariosPagination])

    return (
        <div>

            { perfilCapital.usuario.editar_usuario && modalEditaUsuario && (
                <ModalEditaUsuario
                    setModalEditaUsuario={setModalEditaUsuario}
                    setUsuarios={setUsuarios} 
                    setUsuariosPagination={setUsuariosPagination}
                    usuario={usuario}
                /> 
            )} 

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Buscar Usuario</span>
                </label>
                <input type="text" placeholder="...." className="input input-sm border-gray-400 input-bordered w-full max-w-xs" />
            </div>

            { loading 
                ?  <LoadingDiv>Cargando Usuarios</LoadingDiv>
                : (
                    <table className="table table-sm table-zebra my-4">
                        <thead>
                            <tr>
                                <th className="bg-gray-700 text-white">Usuario</th>
                                <th className="bg-gray-700 text-white">Nombre</th>
                                <th className="bg-gray-700 text-white">Rol</th>
                                { perfilCapital.usuario.editar_usuario || perfilCapital.usuario.eliminar_usuario ? (
                                    <th className="bg-gray-700 text-white">Opciones</th>
                                ) : ''}
                            </tr>
                        </thead>
                        <tbody>
                            { usuarios.map((usuario) => (
                                <tr key={usuario.id_usuario}>
                                    <td>
                                        <h1 className="font-semibold">{ usuario.usuario }</h1>
                                        <h1 className="font-semibold text-xs">Empresa: {usuario.empresa}</h1>
                                    </td>
                                    <td>
                                        <h1 className="font-semibold">{ usuario.nombre }</h1>
                                        <h1 className="font-semibold text-xs">Perfil: {usuario.perfil}</h1>
                                    </td>
                                    <td>
                                        <h1 className="font-semibold">Jefe Directo: 
                                            {usuario.estatus_jefe_directo == 1
                                                ? <span className="ml-2 badge badge-sm badge-primary text-white">Habilitado</span>
                                                : <span className="ml-2 badge badge-sm badge-accent">No Habilitado</span>
                                            }
                                        </h1>
                                        <h1 className="font-semibold">Administrador: 
                                            {usuario.estatus_admin == 1
                                                ? <span className="ml-2 badge badge-sm badge-primary text-white">Habilitado</span>
                                                : <span className="ml-2 badge badge-sm badge-accent">No Habilitador</span>
                                            }
                                        </h1>
                                    </td>
                                    { perfilCapital.usuario.editar_usuario || perfilCapital.usuario.eliminar_usuario ? (
                                        <td>
                                            <div className="flex flex-col space-y-1">
                                                { perfilCapital.usuario.editar_usuario && (
                                                    <label htmlFor="capital_modal_edita_usuario" onClick={() => [setModalEditaUsuario(true), setUsuario(usuario.id_usuario)]} className="font-semibold text-xs cursor-pointer hover:text-green-500">Editar</label>
                                                )}
                                                
                                                { perfilCapital.usuario.eliminar_usuario && (
                                                    <label className="font-semibold text-xs">Eliminar</label>
                                                )}
                                            </div>
                                        </td>
                                    ) : ''}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }

            { !loading && (
                <div className="join mb-4">
                    { usuariosPagination.map(link => (
                        link.url && ( <button onClick={() => setUrlPagination(link.url)} key={link.label} className={`join-item btn ${link.active && 'btn-active'}`}>{link.label.replace(/["&laq;"]/g, "")}</button>)
                    ))}
                </div>
            )}
        </div>
    )
}

export default TablaUsuarios