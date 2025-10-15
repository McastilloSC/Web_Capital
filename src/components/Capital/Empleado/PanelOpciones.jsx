import { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
import { BsPersonFillGear, BsPersonWorkspace, BsPersonFillDash, BsTv, BsTelephoneFill, BsFillPersonLinesFill } from "react-icons/bs";


//APIS
import axios from "../../../axios/axios.config";
import LoadingDiv from '../../UI/LoadingDiv';
import { AuthContext } from '../../../context/AuthContext';
import ModalEquipoAsignado from './Modales/ModalEquipoAsignado';
import ModalBajaEmpleado from './Modales/ModalBajaEmpleado';
import ModalContactoEmergencia from './Modales/ModalContactoEmergencia';
import PageError from '../../UI/PageError';
import Modal from '../../UI/Modal';
import FormEditaEmpleado from './Forms/FormEditaEmpleado';


const PanelOpciones = ({ capturaIncidencias, setCapturaIncidencias, mostrarContactos, setMostrarContactos }) => {

    const { perfilCapital } = useContext(AuthContext);

    const { idEmpleado } = useParams();

    const [errores, setErrores] = useState({})
    const [loading, setLoading] = useState(false);
    const [empleado, setEmpleado] = useState({})
    const [seleccionEmpleado, setSeleccionEmpleado] = useState();

    const [isOpen, setIsOpen] = useState(false)
    const [modalEquipoEmpleado, setModalEquipoEmpleado] = useState(false)
    const [modalBajaEmpleado, setModalBajaEmpleado] = useState(false)
    const [mostrarModalContactoEmergencia, setMostrarModalContactoEmergencia] = useState(false)


    useEffect(() => {
        const onObtenerEmpleado = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/capital/empleado/${idEmpleado}`)
                setEmpleado(data.empleado)
            } catch (error) {
                setLoading(false)
                setErrores(error.response.data)
            }
            setLoading(false)
        }
        onObtenerEmpleado()
    }, [idEmpleado])

    if (Object.keys(errores).length > 0) {
        return <PageError />
    }

    return (
        <div className="grid grid-rows-1 mt-5">
            {isOpen && perfilCapital.incidencias.registro_incidencia ? (
                <Modal title={'Editar Empleado'} size={'max-w-7xl'} setIsOpen={setIsOpen}>
                    <FormEditaEmpleado
                        empleadoInfo={empleado}
                        setEmpleado={setEmpleado}
                    />
                </Modal>
            ) : ''}

            {modalEquipoEmpleado && (
                <ModalEquipoAsignado
                    setModalEquipoEmpleado={setModalEquipoEmpleado}
                    seleccionEmpleado={seleccionEmpleado}
                />
            )}

            {perfilCapital.empleado.baja_empleado && modalBajaEmpleado
                ? (
                    <ModalBajaEmpleado
                        setModalBajaEmpleado={setModalBajaEmpleado}
                        seleccionEmpleado={seleccionEmpleado}
                    />
                ) : ''
            }

            {mostrarModalContactoEmergencia && (
                <ModalContactoEmergencia
                    setModalContactoEmergencia={setMostrarModalContactoEmergencia}
                    seleccionEmpleado={seleccionEmpleado}
                />
            )}



            <div className="card-body px-3 py-5 bg-white rounded-lg border-gray-300 border-2">
                {loading
                    ? <LoadingDiv>Cargando Empleado</LoadingDiv>
                    : (
                        <div className="grid grid-cols-12 gap-5">

                            <div className="col-span-2">                                
                                {empleado.foto ? (
                                    <img src={empleado.foto} alt="empleado_foto" className='rounded-md' />
                                ) : (
                                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-md text-gray-500">
                                        <span>Sin foto</span>
                                    </div>
                                )}
                            </div>

                            <div className="col-span-10">

                                <div className="flex justify-between">
                                    <div>
                                        <h1 className="font-semibold uppercase">Nombre: {empleado.nombre} {empleado.apellidos}</h1>
                                        <h1 className="font-semibold uppercase">Nomina: {empleado.numero_nomina}</h1>
                                    </div>
                                    {empleado.fecha_baja
                                        ? (
                                            <div className='flex flex-col justify-center items-center bg-red-500 w-32 h-auto rounded-lg'>
                                                <h1 className='text-white font-semibold uppercase text-sm'>Baja</h1>
                                                <h1 className='text-xs text-white'>{empleado.fecha_baja}</h1>
                                            </div>
                                        )
                                        : (
                                            <div className='flex flex-col justify-center items-center bg-green-500 w-32 h-auto rounded-lg'>
                                                <h1 className='text-white font-semibold uppercase text-sm'>Activo</h1>
                                                <h1 className='text-xs text-white'>{empleado.fecha_alta}</h1>
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="divider mb-5">Selecciona una opcion</div>

                                <div className='grid grid-rows-1'>
                                    <div className='grid grid-cols-4 gap-5'>
                                        {perfilCapital.empleado.editar_empleado && !empleado.fecha_baja ? (
                                            <label htmlFor="modal_form" onClick={() => setIsOpen(true)} className='btn h-auto bg-gray-200 p-1 border-2 border-gray-400'>
                                                <div className='flex flex-row space-x-5'>
                                                    <div className='w-2/12'>
                                                        <div className='h-9 w-9 p-2 flex flex-col justify-center items-center rounded-full bg-gray-900'>
                                                            <BsPersonFillGear className='text-white text-xl' />
                                                        </div>
                                                    </div>
                                                    <div className='w-10/12 ml-2 flex flex-col justify-center items-start'>
                                                        <h1 className='font-semibold text-xs'>Editar Informacion</h1>
                                                        <h1 className='text-gray-500 text-xs'>Mostrar Información</h1>
                                                    </div>
                                                </div>
                                            </label>
                                        ) : ''}

                                        {!empleado.fecha_baja ? (
                                        <button
                                            onClick={() => {
                                                setMostrarContactos(!mostrarContactos);
                                                if (!mostrarContactos) setCapturaIncidencias(false);
                                            }}
                                            className={`btn h-auto ${mostrarContactos ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-200'} p-1 border-2 border-gray-400`}
                                        >
                                            <div className='flex flex-row justify-center items-center space-x-5'>
                                                <div className='w-2/12'>
                                                    <div className='h-9 w-9 p-2 flex flex-col justify-center items-center rounded-full bg-gray-900'>
                                                        <BsFillPersonLinesFill className='text-white text-xl' />
                                                    </div>
                                                </div>
                                                <div className='w-10/12 ml-2 flex flex-col justify-center items-start'>
                                                    <h1 className={`${mostrarContactos && 'text-white'} font-semibold text-xs`}>Contactos De Emergencia</h1>
                                                    <h1 className={`${mostrarContactos ? 'text-gray-100' : 'text-gray-500'} text-xs`}>{mostrarContactos ? 'Ocultar' : 'Mostrar'} Contactos</h1>
                                                </div>
                                            </div>
                                        </button>
                                        ): ''}


                                        {perfilCapital.incidencias.registro_incidencia && !empleado.fecha_baja ? (
                                            <button
                                                onClick={() => { setCapturaIncidencias(!capturaIncidencias); if (!capturaIncidencias) setMostrarContactos(false); }}
                                                className={`btn h-auto ${capturaIncidencias ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-200'} p-1 border-2 border-gray-400`}
                                            >
                                                <div className='flex flex-row justify-center items-center space-x-5'>
                                                    <div className='w-2/12'>
                                                        <div className='h-9 w-9 p-2 flex flex-col justify-center items-center rounded-full bg-gray-900'>
                                                            <BsPersonWorkspace className='text-white text-xl' />
                                                        </div>
                                                    </div>
                                                    <div className='w-10/12 ml-2 flex flex-col justify-center items-start'>
                                                        <h1 className={`${capturaIncidencias && 'text-white'} font-semibold text-xs`}>Registrar Incidencias</h1>
                                                        <h1 className={`${capturaIncidencias ? 'text-gray-100' : 'text-gray-500'} text-xs`}>{capturaIncidencias ? 'Ocultar' : 'Mostrar'} Captura</h1>
                                                    </div>
                                                </div>
                                            </button>
                                        ) : ''}

                                        {perfilCapital.empleado.baja_empleado && !empleado.fecha_baja ? (
                                            <button
                                                onClick={() => {
                                                    setModalBajaEmpleado(true);
                                                    setSeleccionEmpleado(idEmpleado);
                                                }}
                                                className="btn h-auto bg-gray-200 p-1 border-2 border-gray-400"
                                            >
                                                <div className="flex flex-row space-x-5">
                                                    <div className="w-2/12">
                                                        <div className="h-9 w-9 p-2 flex flex-col justify-center items-center rounded-full bg-gray-900">
                                                            <BsPersonFillDash className="text-white text-xl" />
                                                        </div>
                                                    </div>
                                                    <div className="w-10/12 ml-2 flex flex-col justify-center items-start">
                                                        <h1 className="font-semibold text-xs">Baja Empleado</h1>
                                                        <h1 className="text-gray-500 text-xs">Generar Baja</h1>
                                                    </div>
                                                </div>
                                            </button>
                                        ) : ''}

                                        {/* <button
                                            onClick={() => {
                                                setModalEquipoEmpleado(true);
                                                setSeleccionEmpleado(idEmpleado);
                                            }}
                                            className="btn h-auto bg-gray-200 p-1 border-2 border-gray-400"
                                        >
                                            <div className="flex flex-row space-x-5">
                                                <div className="w-2/12">
                                                    <div className="h-9 w-9 p-2 flex flex-col justify-center items-center rounded-full bg-gray-900">
                                                        <BsTv className="text-white text-xl" />
                                                    </div>
                                                </div>
                                                <div className="w-10/12 flex flex-col justify-center items-start">
                                                    <h1 className="font-semibold text-xs">Equipos</h1>
                                                    <h1 className="text-gray-500 text-xs">Equipos Asignados</h1>
                                                </div>
                                            </div>
                                        </button> */}


                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PanelOpciones