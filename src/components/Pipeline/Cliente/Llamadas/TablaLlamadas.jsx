import { useParams } from "react-router-dom"
import axios from "../../../../axios/axios.config"
import { useEffect, useState } from "react"
import LoadingDiv from "../../../UI/LoadingDiv"
import ModalEditaLlamada from "./Modales/ModalEditaLlamada"

const TablaLlamadas = ({ llamadas, setLlamadas, llamadasPagination, setLlamadasPagination }) => {

    const { idCliente } = useParams()

    //Query Params States
    const [ urlPagination, setUrlPagination ] = useState();
    const [ inputUsuario, setInputUsuario ] = useState('');
    const [ numeroFilas, setNumeroFilas ] = useState(5);

    //States
    const [ loading, setLoading ] = useState(false)
    const [ modalEditaLlamada, setModalEditaLlamada ] = useState(false)
    const [ llamada, setLlamada ] = useState();

    useEffect(() => {
        const onObtenerLlamadas = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(urlPagination ? urlPagination : `/pipeline/llamadas/cliente/${idCliente}`, {
                    params:{
                        'filas' : numeroFilas,
                        'usuario' : inputUsuario
                    } 
                })
                setLlamadas(data.llamadas.data)
                setLlamadasPagination(data.llamadas.links)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerLlamadas()
    }, [setLlamadas, idCliente, setLlamadasPagination, urlPagination, numeroFilas, inputUsuario])

    return (
        <div>
            { modalEditaLlamada && (
                <ModalEditaLlamada
                    setModalEditaLlamada={setModalEditaLlamada}
                    llamada={llamada}
                    setLlamadas={setLlamadas}
                    setLlamadasPagination={setLlamadasPagination}
                />
            )}

            <div className="flex space-x-5 mb-3">
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Buscar por usuario</span>
                    </label>
                    <input type="text" onChange={(e) => setInputUsuario(e.target.value)} value={inputUsuario} placeholder="...." className="input input-sm border-2 border-gray-300 input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-44">
                    <label className="label">
                        <span className="label-text">Filas</span>
                    </label>
                    <select onChange={(e) => setNumeroFilas(e.target.value)} value={numeroFilas} className="select select-sm border-2 border-gray-300 select-bordered w-full max-w-xs">
                        <option value={5}>5 Filas</option>
                        <option value={10}>10 Filas</option>
                        <option value={15}>15 Filas</option>
                        <option value={30}>30 Filas</option>
                        <option value={50}>50 Filas</option>
                    </select>
                </div>
            </div>

            { loading
                ? <LoadingDiv>Cargando Llamadas</LoadingDiv>
                : (
                    <table className="table table-sm table-zebra">
                        <thead>
                            <th className="bg-gray-200 text-gray-600">Fecha Llamada / Duracion</th>
                            <th className="bg-gray-200 text-gray-600">Motivo</th>
                            <th className="bg-gray-200 text-gray-600">Oportunidad</th>
                            <th className="bg-gray-200 text-gray-600">Cita</th>
                            <th className="bg-gray-200 text-gray-600">Realizo</th>
                            <th className="bg-gray-200 text-gray-600 text-center">Opciones</th>
                        </thead>
                        <tbody>
                            { llamadas.map((llamada) => (
                                <tr key={llamada.id_llamada}>
                                    <td className="text-xs">
                                        <h1>Fecha: <span className="font-semibold">{llamada.fecha_llamada}</span></h1>
                                        <p>Duracion: <span className="font-bold">{llamada.duracion}</span> Minutos</p>
                                    </td>
                                    <td className="text-xs">{llamada.motivo}</td>
                                    <td className="text-xs">
                                        { llamada.oportunidad == 1 
                                            ? <div className="badge badge-sm badge-primary text-white">Oportunidad Identificada</div>
                                            : <div className="badge badge-sm badge-error text-white">Sin Oportunidad</div>
                                        }
                                    </td>
                                    <td className="text-xs">
                                        { llamada.cita == 1 
                                            ? <div className="badge badge-sm badge-primary text-white">Cita Generada</div>
                                            : <div className="badge badge-sm badge-error text-white">Sin Cita</div>
                                        }
                                    </td>
                                    <td className="text-xs">
                                        <h1 className="font-semibold">{llamada.usuario}</h1>
                                        <p>{llamada.fecha_registro}</p>
                                    </td>
                                    <td>
                                        <div className="flex justify-evenly">
                                            <label htmlFor="modal_edita_llamada" onClick={() => [setModalEditaLlamada(true), setLlamada(llamada.id_llamada)]} className="text-xs cursor-pointer">Editar</label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }

            { !loading && (
                <div className="join mt-2">
                    { llamadasPagination.map((link) => (
                        //console.log(link)
                        link.url && <button onClick={() => setUrlPagination(link.url)} key={link.label} className={`join-item btn ${link.active && 'btn-active'}`}>{link.label}</button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TablaLlamadas