import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from 'react-router-dom' 
import { AiOutlinePlusCircle  } from "react-icons/ai";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

//Components
import FormAgenda from "./Forms/FormAgenda";
import LoadingDiv from "../../../UI/LoadingDiv";

//AXIOS
import axios from '../../../../axios/axios.config'

const Agenda = () => {

    const { idCliente } = useParams();
    const localizer = momentLocalizer(moment)

    //Crear un Red de del label para agregar citas
    const labelRef = useRef(null)
    const labelRefClose = useRef(null)

    const [ loading, setLoading ] = useState(false)
    const [ errores, setErrores ] = useState({})
    const [ citas, setCitas ] = useState([])

    //Formualario
    const [ formAgenda, setFormAgenda ] = useState(false)
    const [ seleccionCita, setSeleccionCita ] = useState(null);

    const { messages } = useMemo(() => ({
        defaultDate: new Date(),
        messages: {
            week: "Semana",
            work_week: "Semana",
            day: "Día",
            month: "Mes",
            previous: "Mes Anterior",
            next: "Mes Siguiente",
            today: "Hoy",
            agenda: "El Diario",
            showMore: (total) => `+${total} más`,
        },
    }), []);

    const onEditarFecha = (value) => {
        setSeleccionCita(value.id)
        labelRef.current.click()
    }

    useEffect(() => {
        const onObtenerCitas = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/pipeline/citas/cliente/${idCliente}`);
                const citas = data.citas.map((cita) => {
                    const objCita = {
                        id: cita.id_cita,
                        title: cita.motivo,
                        start: new Date(cita.anio, cita.mes - 1, cita.dia),
                        end: new Date(cita.anio, cita.mes - 1, cita.dia),
                    }
                    return objCita;
                })
                setCitas(citas)
            } catch (error) {
                setErrores(error.response.data)
            } finally{
                setLoading(false)
            }
        }
        onObtenerCitas()
    }, [idCliente])

    return (
        <div className="drawer drawer-end">
            <input id="drawer-agenda" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className='p-3 rounded-t-lg bg-white border-b-2 border-gray-300'>
                    <div className='flex justify-between items-end'>
                        <h1 className='font-semibold'>Citas Registradas</h1>
                        <label ref={labelRef} htmlFor="drawer-agenda" onClick={() => setFormAgenda(true)} className='btn btn-sm cursor-pointer'>
                            <AiOutlinePlusCircle className="text-xl"/>
                            Nueva Cita
                        </label>
                    </div>
                </div>
                <div className='p-3 bg-white z-40'>
                    { Object.keys(errores).length > 0 && (
                        <div className="mt-3 mb-5">
                            <h1 className="text-red-500">{ errores.message }</h1>
                        </div>
                    )}
                    { loading
                        ? <LoadingDiv>Cargando Citas</LoadingDiv>
                        : (
                            <Calendar
                                onSelectEvent={(e) => onEditarFecha(e)}
                                localizer={localizer}
                                events={citas}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 600 }}
                                messages={messages}
                            />
                        )
                    }
                    
                </div>
            </div> 
            <div className="drawer-side z-50">
                <label ref={labelRefClose} htmlFor="drawer-agenda" onClick={() => [setFormAgenda(false), setSeleccionCita(null)]} aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    { formAgenda && (
                        <FormAgenda
                            citas={citas}
                            setCitas={setCitas}
                            seleccionCita={seleccionCita}
                            labelRefClose={labelRefClose}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Agenda