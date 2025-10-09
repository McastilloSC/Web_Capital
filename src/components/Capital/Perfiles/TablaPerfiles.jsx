import { useEffect, useState } from "react";

//APIS
import axios from '../../../axios/axios.config'
import ModalEditaPerfil from "./Modales/ModalEditaPerfil";
import LoadingDiv from "../../UI/LoadingDiv";

const TablaPerfiles = ({ perfiles, setPerfiles, perfilesPagination, setPerfilesPagination }) => {

    //Query Params
    const [ urlPagination, setUrlPagination ] = useState();

    const [ loading, setLoading ] = useState(false);
    const [ modalEditaPerfil, setModalEditaPerfil ] = useState(false)
    const [ perfil, setPerfil ] = useState();

    useEffect(() => {
        const onObtenerPerfiles = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(urlPagination ? urlPagination : '/capital/perfiles')
                setPerfiles(data.perfiles.data)
                setPerfilesPagination(data.perfiles.links)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerPerfiles()
    }, [setPerfiles, setPerfilesPagination, urlPagination])


    return (
        <div className="px-3">

            { modalEditaPerfil && (
                <ModalEditaPerfil
                    perfil={perfil}
                    setModalEditaPerfil={setModalEditaPerfil}
                    setPerfiles={setPerfiles} 
                    setPerfilesPagination={setPerfilesPagination}
                /> 
            )}

            <div className="form-control w-full max-w-xs mb-3">
                <label className="label">
                    <span className="label-text">Buscar Perfil</span>
                </label>
                <input type="text" placeholder="..." className="input border-gray-400 input-sm input-bordered w-full max-w-xs" />
            </div>

            { loading
                ? <LoadingDiv>Cargando Perfiles</LoadingDiv>
                : (
                    perfiles.length == 0 
                        ? (
                            <div className="p-2 bg-gray-500 rounded-lg">
                                <h1 className="text-center text-white">Sin Registros</h1>
                            </div>
                        )
                        : (
                            <table className="table table-xs table-zebra my-4">
                                <thead>
                                    <tr>
                                        <th className="bg-gray-700 text-white rounded-tl-lg">Perfil</th>
                                        <th className="bg-gray-700 text-white">Observaciones</th>
                                        <th className="bg-gray-700 text-white rounded-tr-lg">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { perfiles.map((perfil) => (
                                        <tr key={perfil.id_perfil}>
                                            <td>
                                                <h1 className="font-semibold">{ perfil.perfil }</h1>
                                                <h1 className="font-semibold">Creacion: { perfil.fecha_registro }</h1>
                                            </td>
                                            <td>{ perfil.observaciones }</td>
                                            <td>
                                                <div className="flex flex-col space-y-1 my-1">
                                                    <label onClick={() => [setModalEditaPerfil(true), setPerfil(perfil.id_perfil)]} htmlFor="modal_edita_perfil" className="cursor-pointer text-start font-semibold hover:text-green-500">Editar</label>
                                                    <button className="text-start font-semibold">Eliminar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                ) }

            { !loading && (
                <div className="join mb-4">
                    { perfilesPagination.map(link => (
                        link.url && ( <button onClick={() => setUrlPagination(link.url)} key={link.label} className={`join-item btn ${link.active && 'btn-active'}`}>{link.label.replace(/["&laq;"]/g, "")}</button>)
                    ))}
                </div>
            )}
        </div>
    )
}

export default TablaPerfiles