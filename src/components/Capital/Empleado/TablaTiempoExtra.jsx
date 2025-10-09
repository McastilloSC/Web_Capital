import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

//APIS
import axios from '../../../axios/axios.config';
import LoadingDiv from '../../UI/LoadingDiv';
import ModalEditaTiempoExtra from './Modales/ModalEditaTiempoExtra';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext';

const TablaTiempoExtra = ({ tiempoExtra, setTiempoExtra, tiempoExtraPagination, setTiempoExtraPagination }) => {

    const { perfilCapital } = useContext(AuthContext);

    //Query States
    const [ urlPagination, setUrlPagination ] = useState();
    const [ incidenciaFiltro, setIncidenciaFiltro ] = useState('');

    const [ errores, setErrores ] = useState({})
    const [ loading, setLoading ] = useState(false);
    const [ modalEditarTiempoExtra, setModalEditaTiempoExtra ] = useState(false)
    const [ seleccionTiempo, setSeleccionTiempo ] = useState();

    const { idEmpleado } = useParams();

    const onEliminarTiempoExtra = async (idTiempoExtra) => {
        Swal.fire({
            title: "¿Estas Seguro?",
            text: "Se eliminara el registro de tiempo extra",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!",
            allowOutsideClick: false,
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await toast.promise(axios.delete(`/capital/tiempo_extra/borrar/${idTiempoExtra}`), {
                        pending: 'Eliminando',
                        success: 'Tiempo Extra Eliminado'
                    })
                    setTiempoExtra(data.tiempo_extra.data)
                    setTiempoExtraPagination(data.tiempo_extra.links)
                } catch (error) {
                    console.log(error)
                }
            }
          });
    }

    useEffect(() => {
        const onObtenerTiempoExtra = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(urlPagination ? urlPagination : `/capital/tiempo_extra/empleado/${idEmpleado}`, {
                    params: {
                        'incidencia' : incidenciaFiltro 
                    }
                });
                setTiempoExtra(data.tiempo_extra.data)
                setTiempoExtraPagination(data.tiempo_extra.links)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setErrores(error.response.data)
            }
            setLoading(false)
        }
        onObtenerTiempoExtra()
    }, [idEmpleado, setTiempoExtra, setTiempoExtraPagination, urlPagination, incidenciaFiltro])

    if(Object.keys(errores).length > 0){
        return ''
    }

    return (
        <div className="px-5 py-0 mb-3">
            { modalEditarTiempoExtra && (
                <ModalEditaTiempoExtra
                    setModalEditaTiempoExtra={setModalEditaTiempoExtra}
                    seleccionTiempo={seleccionTiempo}
                    setTiempoExtra={setTiempoExtra}
                    setTiempoExtraPagination={setTiempoExtraPagination}
                /> 
            )}

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Buscar Tiempo Extra</span>
                </label>
                <input type="text" onChange={(e) => setIncidenciaFiltro(e.target.value)} placeholder="..." className="input input-sm input-bordered w-full max-w-xs" />
            </div>

            { loading
                ? <LoadingDiv>Cargando Tiempo Extra</LoadingDiv>
                : (
                    <table className="table table-zebra table-xs my-5">
                        <thead>
                            <tr>
                                <th className="bg-gray-800 text-gray-100 p-2 rounded-tl-lg">Fecha Registro</th>
                                <th className="bg-gray-800 text-gray-100">Detalle</th>
                                { perfilCapital.incidencias.editar_incidencia || perfilCapital.incidencias.eliminar_incidencia ? (
                                    <th className="bg-gray-800 text-gray-100 rounded-tr-lg">Opciones</th>
                                ) : ''}
                            </tr>
                        </thead>
                        <tbody>
                            { tiempoExtra.map((tiempo) => (
                                <tr key={tiempo.id_tiempo_extra}>
                                    <td>
                                        <h1 className='font-semibold'>{ tiempo.fecha_registro }</h1>
                                        <h1 className='font-semibold'>{ tiempo.usuario }</h1>
                                    </td>
                                    <td>
                                        <h1 className='font-semibold'>Fecha: { tiempo.fecha }</h1>
                                        <h1 className='font-bold'>Horas: { tiempo.tiempo } hrs</h1>
                                    </td>
                                    <td>
                                        <div className='flex flex-col justify-start items-start'>
                                            { perfilCapital.incidencias.editar_incidencia && (
                                                <label htmlFor="modal_edita_tiempo_extra" onClick={() => [setModalEditaTiempoExtra(true), setSeleccionTiempo(tiempo.id_tiempo_extra)]} className='font-semibold hover:text-blue-500 cursor-pointer'>Editar</label>
                                            )}
                                            { perfilCapital.incidencias.eliminar_incidencia && (
                                                <button onClick={() => onEliminarTiempoExtra(tiempo.id_tiempo_extra)} className='font-semibold mt-1 hover:text-red-500'>Eliminar</button>
                                            )}
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
                    { tiempoExtraPagination.map((link) => (
                        //console.log(link)
                        link.url && <button onClick={() => setUrlPagination(link.url)} key={link.label} className={`join-item btn ${link.active && 'btn-active'}`}>{link.label}</button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TablaTiempoExtra