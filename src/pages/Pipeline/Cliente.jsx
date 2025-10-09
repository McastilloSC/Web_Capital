import { useContext, useState } from "react";
import { AiOutlineUser, AiOutlineSelect, AiOutlinePhone, AiOutlineBook, AiOutlineDrag, AiOutlineSchedule   } from "react-icons/ai";
import Actividad from "../../components/Pipeline/Cliente/Actividad/Actividad";
import DetalleCliente from "../../components/Pipeline/Cliente/DetalleCliente";
import Proyectos from "../../components/Pipeline/Cliente/Proyectos/Proyectos";
import Llamadas from "../../components/Pipeline/Cliente/Llamadas/Llamadas";
import Fases from "../../components/Pipeline/Cliente/Fases/Fases";
import Contactos from "../../components/Pipeline/Cliente/Contactos/Contactos";
import { AuthContext } from "../../context/AuthContext";
import PageError from "../../components/UI/PageError";
import Agenda from "../../components/Pipeline/Cliente/Agenda/Agenda";

const Cliente = () => {

    const [ actividad, setActividad ] = useState(true);
    const [ detalleCliente, setDetalleCliente ] = useState(false);
    const [ proyectos, setProyectos ] = useState(false);
    const [ fases, setFaces ] = useState(false);
    const [ llamadas, setLlamadas ] = useState(false);
    const [ contactos, setContactos ] = useState(false);
    const [ agenda, setAgenda ] = useState(false)

    const { sistemasAcceso } = useContext(AuthContext)

    const accionesProyecto = [
        { accion: 'Cliente', icono: <AiOutlineUser className="text-3xl mb-2"/>, menu: setDetalleCliente },
        { accion: 'Proyectos', icono: <AiOutlineSelect className="text-3xl mb-2"/>, menu: setProyectos },
        { accion: 'Fases', icono: <AiOutlineDrag className="text-3xl mb-2"/>, menu: setFaces },
        { accion: 'Llamadas', icono: <AiOutlinePhone className="text-3xl mb-2"/>, menu: setLlamadas },
        { accion: 'Contactos', icono: <AiOutlineBook className="text-3xl mb-2"/>, menu: setContactos },
        { accion: 'Agenda', icono: <AiOutlineSchedule  className="text-3xl mb-2"/>, menu: setAgenda }
    ]

    const onhandleClickMenu = (stateUpdater) => {
        setActividad(false);
        setDetalleCliente(false);
        setProyectos(false);
        setFaces(false);
        setLlamadas(false);
        setContactos(false);
        setAgenda(false);
        stateUpdater(true);
    };

    if(!sistemasAcceso.pipeline) return <PageError/>

    return (
        <>
           <div className="bg-white border-2 border-gray-300 rounded-lg w-full">
                <div className="bg-white flex justify-between p-3 border-b-2 rounded-t-lg border-gray-300">
                    <div className="flex">
                        <span className="font-semibold">Acciones Disponibles</span>
                    </div>
                    <button onClick={() => [setActividad(true), setDetalleCliente(false), setDetalleCliente(false), setProyectos(false), setFaces(false), setLlamadas(false), setContactos(false)]} className="font-semibold text-xs">Ultima Actividad</button>
                </div>
                
                <div className="flex bg-gray-100 space-x-5 p-5 rounded-b-lg">
                    { accionesProyecto.map((accion, index) => (
                        <button key={index} onClick={() => onhandleClickMenu(accion.menu)} className="transition duration-200 flex flex-col w-28 h-24 text-sky-700 border-2 border-gray-400 bg-white rounded-lg justify-center items-center p-2 hover:bg-gray-300 hover:text-gray-900">
                            { accion.icono }
                            <div className="h-0.5 rounded-full w-full bg-gray-900 mb-1"></div>
                            <h1 className="text-xs font-semibold text-center">{ accion.accion }</h1>
                        </button>
                    ))}
                </div>
            </div> 

            <div className="divider"></div>


            { actividad && <Actividad /> }
            { detalleCliente && <DetalleCliente /> }
            { proyectos && <Proyectos/> }
            { llamadas && <Llamadas/> }
            { fases && <Fases/>}
            { contactos && <Contactos/>}
            { agenda && <Agenda/> }
        </>
    )
}

export default Cliente