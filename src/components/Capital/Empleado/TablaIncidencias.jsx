import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

//AXIOS
import axios from '../../../axios/axios.config'
import LoadingDiv from '../../UI/LoadingDiv';
import ModalEditaIncidenciaGeneral from './Modales/ModalEditaIncidenciaGeneral';
import ModalEditaIncidenciaMonto from './Modales/ModalEditaIncidenciaMonto';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext';

const TablaIncidencias = ({ incidencias, setIncidencias, incidenciasPagination, setIncidenciasPagination }) => {

    const { perfilCapital } = useContext(AuthContext)

    //Query States
    const [ urlPagination, setUrlPagination ] = useState();
    const [ incidenciaFiltro, setIncidenciaFiltro ] = useState('');

    const [ errores, setErrores ] = useState({})
    const [ loading, setLoading ] = useState(false);

    const [ modalIncidenciaGeneral, setModalIncidenciaGeneral ] = useState(false);
    const [ modalIncidenciaMonto, setModalIncidenciaMonto ] = useState(false);

    const [ seleccionIncidenciaGeneral, setSeleccionIncidenciaGeneral ] = useState();
    const [ seleccionIncidenciaMonto, setSeleccionIncidenciaMonto ] = useState();

    const { idEmpleado } = useParams();

    const onEliminarIncidenciaGeneral = (idGeneral) => {
        if(perfilCapital.incidencias.editar_incidencia){
            Swal.fire({
            title: "¿Estas Seguro?",
            text: "Se eliminara el registro de la incidencia",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            allowOutsideClick: false,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const { data } = await toast.promise(axios.delete(`/capital/incidencias/general/${idGeneral}`), {
                            pending: 'Eliminando Registro',
                            success: 'Registro Eliminado'
                        });
                        setIncidencias(data.incidencias.data)
                        setIncidenciasPagination(data.incidencias.links)
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        }
    }

    const onEliminarIncidenciaMonto = (idGeneralMonto) => {
        if(perfilCapital.incidencias.eliminar_incidencia){
            Swal.fire({
                title: "¿Estas Seguro?",
                text: "Se eliminara el registro de la incidencia",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Eliminar",
                allowOutsideClick: false,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const { data } = await  toast.promise(axios.delete(`/capital/incidencias/monto/${idGeneralMonto}`), {
                            pending: 'Eliminando Registro',
                            success: 'Registro Eliminado'
                        });
                        setIncidencias(data.incidencias.data)
                        setIncidenciasPagination(data.incidencias.links)
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        }
    }

    useEffect(() => {
        const onObtenerIncidencias = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(urlPagination ? urlPagination : `/capital/incidencias/empleado/${idEmpleado}`, {
                    params: {
                        'incidencia' : incidenciaFiltro 
                    }
                });
                setIncidencias(data.incidencias.data)
                setIncidenciasPagination(data.incidencias.links)
            } catch (error) {
                setLoading(false)
                setErrores(error.response.data)
            }
            setLoading(false)
        }
        onObtenerIncidencias()
    }, [idEmpleado, setIncidencias, setIncidenciasPagination, urlPagination, incidenciaFiltro])

    if(Object.keys(errores).length > 0){
        return ''
    }

    return (
        <div className="px-5 py-0 mb-3">
            { modalIncidenciaGeneral && (
                <ModalEditaIncidenciaGeneral
                    seleccionIncidenciaGeneral={seleccionIncidenciaGeneral}
                    setModalIncidenciaGeneral={setModalIncidenciaGeneral}
                    setIncidencias={setIncidencias}
                    setIncidenciasPagination={setIncidenciasPagination}
                />
            )}

            { modalIncidenciaMonto && (
                <ModalEditaIncidenciaMonto 
                    seleccionIncidenciaMonto={seleccionIncidenciaMonto}
                    setModalIncidenciaMonto={setModalIncidenciaMonto}
                    setIncidencias={setIncidencias}
                    setIncidenciasPagination={setIncidenciasPagination}
                /> 
            )}

            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Buscar Incidencia</span>
                </label>
                <input type="text" onChange={(e) => setIncidenciaFiltro(e.target.value)} placeholder="..." className="input input-sm input-bordered w-full max-w-xs" />
            </div>

            { loading
                ? <LoadingDiv>Cargando Incidencias</LoadingDiv>
                : (
                    <table className="table table-zebra table-xs my-5">
                        <thead>
                            <tr>
                                <th className="bg-gray-800 text-gray-100 p-2 rounded-tl-lg">Fecha Registro</th>
                                <th className="bg-gray-800 text-gray-100">Incidencia</th>
                                <th className="bg-gray-800 text-gray-100">Fecha</th>
                                <th className="bg-gray-800 text-gray-100">Dias Totales / Monto</th>
                                { perfilCapital.incidencias.editar_incidencia || perfilCapital.incidencias.eliminar_incidencia 
                                    ? <th className="bg-gray-800 text-gray-100 rounded-tr-lg">Opciones</th>
                                    : ''
                                }
                            </tr>
                        </thead>
                        <tbody>
                            { incidencias.map((incidencia, index) => (
                                <tr key={index}>
                                    <td>
                                        <h1 className='font-semibold'>{ incidencia.fecha_registro }</h1>
                                        <h1 className='font-semibold'>{ incidencia.usuario }</h1>
                                    </td>
                                    <td>
                                        <h1 className='font-semibold'>{ incidencia.incidencia }</h1>
                                    </td>
                                    <td>
                                        <span className='font-semibold'>De: { incidencia.fecha_inicio }</span>
                                        <span className='font-semibold'>{ incidencia.fecha_fin && ' / '}{incidencia.fecha_fin}</span>
                                    </td>
                                    <td>
                                        <h1 className='font-semibold'>
                                            { incidencia.tipo == 'GENERAL' 
                                                ? incidencia.total_dias_montos
                                                : `$ ${incidencia.total_dias_montos}`
                                            }
                                        </h1>
                                    </td>
                                    <td>
                                        <div className='flex flex-col justify-start items-start'>
                                            { perfilCapital.incidencias.editar_incidencia && (
                                                <label 
                                                    htmlFor={ incidencia.tipo == 'GENERAL' ? 'modal_edita_incidencia_general' : 'modal_edita_incidencia_monto' }
                                                    onClick={() =>  incidencia.tipo == 'GENERAL' ? [setSeleccionIncidenciaGeneral(incidencia.id_incidencia_general), setModalIncidenciaGeneral(true)] : [setSeleccionIncidenciaMonto(incidencia.id_incidencia_general), setModalIncidenciaMonto(true)] } 
                                                    className='font-semibold hover:text-green-500 cursor-pointer'
                                                >
                                                    Editar
                                                </label>
                                            )}
                                            { perfilCapital.incidencias.eliminar_incidencia && (
                                                <button onClick={() =>  incidencia.tipo == 'GENERAL' ? [onEliminarIncidenciaGeneral(incidencia.id_incidencia_general)] : [onEliminarIncidenciaMonto(incidencia.id_incidencia_general)] }  className='font-semibold hover:text-red-500 cursor-pointer mt-1'>Eliminar</button>
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
                    { incidenciasPagination.map((link) => (
                        //console.log(link)
                        link.url && <button onClick={() => setUrlPagination(link.url)} key={link.label} className={`join-item btn ${link.active && 'btn-active'}`}>{link.label}</button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TablaIncidencias