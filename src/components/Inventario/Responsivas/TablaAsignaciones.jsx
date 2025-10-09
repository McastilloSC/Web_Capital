import { useEffect, useState } from "react"

//APIS
import axios from '../../../axios/axios.config'
import LoadingDiv from "../../UI/LoadingDiv";
import ModalBajaResponsiva from "./Modales/ModalBajaResponsiva";
import ModalResponsiva from "./Modales/ModalResponsiva";
import ModalEditarResponsiva from "./Modales/ModalEditarResponsiva";

const TablaAsignaciones = ({ responsivas, setResponsivas, responsivasPagination, setResponsivasPagination, setModalAsignacion }) => {
    
    const [ loading, setLoading ] = useState(false);
    const [ modalResponsiva, setModalResponsiva ] = useState(false)
    const [ modalBajaResponsiva, setModalBajaResponsiva ] = useState(false)
    const [ modalEditarResponsiva, setModalEditarResponsiva ] = useState(false)
    const [ seleccionResponsiva, setSeleccionResponsiva ] = useState();

    //Query State
    const [ urlPaginationn, setUrlPagination ] = useState()
    const [ inputEmpleado, setInputEmpleado ] = useState('')

    useEffect(() => {
        const onObtenerResponsivas = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(urlPaginationn ? urlPaginationn : '/inventario/responsivas', {
                    params: {
                        'empleado' : inputEmpleado
                    }
                });
                setResponsivas(data.responsivas.data)
                setResponsivasPagination(data.responsivas.links)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerResponsivas()
    }, [urlPaginationn, setResponsivas, setResponsivasPagination, inputEmpleado])
    
    return (
        <div>
            { modalBajaResponsiva && ( 
                <ModalBajaResponsiva
                    setModalBajaResponsiva={setModalBajaResponsiva}
                    seleccionResponsiva={seleccionResponsiva}
                    setResponsivas={setResponsivas}
                    setResponsivasPagination={setResponsivasPagination}
                />
            )}

            { modalResponsiva && ( 
                <ModalResponsiva
                    setModalResponsiva={setModalResponsiva}
                    seleccionResponsiva={seleccionResponsiva}
                /> 
            )}

            { modalEditarResponsiva && ( 
                <ModalEditarResponsiva
                    setModalEditarResponsiva={setModalEditarResponsiva}
                    setResponsivas={setResponsivas}
                    setResponsivasPagination={setResponsivasPagination}
                    seleccionResponsiva={seleccionResponsiva}
                /> 
            )}

            <div className="flex justify-between">
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Empleado</span>
                    </label>
                    <input type="text" value={inputEmpleado} onChange={(e) => setInputEmpleado(e.target.value)} placeholder="...." className="input input-sm border-2 border-gray-300 input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nuevo Registro</span>
                    </label>
                    <label htmlFor="modal_asigignacion" onClick={() => setModalAsignacion(true)} className="btn btn-secondary btn-sm w-56">Realizar Asignacion</label>
                </div>
            </div>

            { loading 
                ? <LoadingDiv>Cargando Responsivas</LoadingDiv> 
                : (
                    <table className="table table-zebra table-sm my-3">
                        <thead>
                            <tr>
                                <th className="bg-gray-800 text-white p-2 rounded-tl-lg">Nombre</th>
                                <th className="bg-gray-800 text-white">Asignacion</th>
                                <th className="bg-gray-800 text-white">Estatus</th>
                                <th className="bg-gray-800 text-white">Opciones</th>
                                <th className="bg-gray-800 text-white rounded-tr-lg">Consulta</th>
                            </tr>
                        </thead>
                        <tbody>
                            { responsivas.map((responsiva) => (
                                <tr key={responsiva.id_responsiva}>
                                    <td>
                                        <h1 className="font-semibold uppercase">{responsiva.empleado}</h1>
                                        <h1 className="font-semibold text-gray-500 uppercase">Area: {responsiva.area}</h1>
                                    </td>
                                    <td>
                                        <h1 className="font-semibold">Tipo: {responsiva.tipo}</h1>
                                        <h1 className="font-semibold">Marca: {responsiva.marca} - Modelo: {responsiva.modelo}</h1>
                                    </td>
                                    <td>
                                        <h1 className="font-semibold">Estatus: {' '}
                                            { responsiva.estatus == 1 
                                                ? <span className="badge badge-primary text-white">Asignada</span>
                                                : <span className="badge badge-accent text-white">Baja</span>
                                            }
                                        </h1>
                                        <h1 className="font-semibold uppercase text-xs mt-1">Fecha Asignacion: {responsiva.fecha_asignacion}</h1>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            { responsiva.estatus == 1 && (<label htmlFor="modal_editar_responsiva" onClick={() => [setModalEditarResponsiva(true), setSeleccionResponsiva(responsiva.id_responsiva)]} className="font-semibold text-xs cursor-pointer hover:text-green-500">Editar</label>)}
                                            <label htmlFor="modal_baja_responsiva" onClick={() => [setModalBajaResponsiva(true), setSeleccionResponsiva(responsiva.id_responsiva)]} className="font-semibold text-xs mt-1 cursor-pointer hover:text-red-500">Baja</label>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <label htmlFor="modal_responsiva" onClick={() => [setModalResponsiva(true), setSeleccionResponsiva(responsiva.id_responsiva)]} className="font-semibold text-xs mt-1 cursor-pointer hover:text-blue-500">Asignacion</label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
               )
            }

            
            {!loading && (
                <div className="join mt-2">
                    { responsivasPagination.map((link) => (
                        //console.log(link)
                        link.url && <button onClick={() => setUrlPagination(link.url)} key={link.label} className={`join-item btn ${link.active && 'btn-active'}`}>{link.label}</button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TablaAsignaciones