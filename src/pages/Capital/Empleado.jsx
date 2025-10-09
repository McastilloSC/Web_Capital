import { useContext, useState } from "react";
import { useParams } from 'react-router-dom';

//Components
import PanelOpciones from "../../components/Capital/Empleado/PanelOpciones";
import TablaIncidencias from "../../components/Capital/Empleado/TablaIncidencias";
import Incidencias from "../../components/Capital/Empleado/Incidencias";
import { AuthContext } from "../../context/AuthContext";
import PageError from "../../components/UI/PageError";
import TablaTiempoExtra from "../../components/Capital/Empleado/TablaTiempoExtra";
import ContactosEmergencia from "../../components/Capital/Empleado/ContactosEmergencia";

const Empleado = () => {

    const { sistemasAcceso } = useContext(AuthContext)

    const [ capturaIncidencias, setCapturaIncidencias ] = useState(false);
    const [ mostrarContactos, setMostrarContactos ] = useState();
    const { idEmpleado } = useParams();

    //Tablas
    const [ tablaIncidencias, setTablaIncidencias ] = useState(true)
    const [ tablaTiempoExtra, setTablaTiempoExtra ] = useState(false)

    const [ incidencias, setIncidencias ] = useState([])
    const [ incidenciasPagination, setIncidenciasPagination ] = useState([])

    const [ tiempoExtra, setTiempoExtra ] = useState([])
    const [ tiempoExtraPagination, setTiempoExtraPagination ] = useState([])

    if(!sistemasAcceso.capital) return <PageError/>

    return (
        <div className="h-auto bg-gray-200 ">
            <PanelOpciones 
                capturaIncidencias={capturaIncidencias}
                setCapturaIncidencias={setCapturaIncidencias}
                mostrarContactos={mostrarContactos}
                setMostrarContactos={setMostrarContactos}
                idEmpleado={idEmpleado}
            />

            { mostrarContactos && (
                <ContactosEmergencia empleadoId={idEmpleado} />
            )}

            { capturaIncidencias && (
                <Incidencias 
                    setIncidencias={setIncidencias}
                    setIncidenciasPagination={setIncidenciasPagination}
                    setTiempoExtra={setTiempoExtra}
                    setTiempoExtraPagination={setTiempoExtraPagination}
                />
            )}

            <div className="grig grid-rows-1 mt-5">
                <div className="grid-cols-1">
                    <div className="card-body p-2 bg-white rounded-lg border-gray-300 border-2">

                    <div className="flex justify-between p-3 border-b-2 border-gray-300">
                        <h1 className="font-semibold">Historial de Incidencias</h1>

                        <div role="tablist" className="tabs tabs-bordered">
                            <a role="tab" onClick={() => [setTablaIncidencias(true), setTablaTiempoExtra(false)]} className={`tab ${tablaIncidencias && 'tab-active'}`}>Incidencias</a>
                            <a role="tab" onClick={() => [setTablaIncidencias(false), setTablaTiempoExtra(true)]} className={`tab ${tablaTiempoExtra && 'tab-active'}`}>Tiempo Extra</a>
                        </div>
                    </div>
                        
                    { tablaIncidencias && (
                        <TablaIncidencias 
                            incidencias={incidencias}
                            setIncidencias={setIncidencias}
                            incidenciasPagination={incidenciasPagination}
                            setIncidenciasPagination={setIncidenciasPagination}
                        />
                    )}

                    { tablaTiempoExtra && (
                        <TablaTiempoExtra 
                            tiempoExtra={tiempoExtra}
                            setTiempoExtra={setTiempoExtra}
                            tiempoExtraPagination={tiempoExtraPagination}
                            setTiempoExtraPagination={setTiempoExtraPagination}
                        />
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Empleado