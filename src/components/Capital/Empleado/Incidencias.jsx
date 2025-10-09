import { useContext, useState } from 'react'
import Montos from './Incidencias/Montos'
import Generales from './Incidencias/Generales'
import { AuthContext } from '../../../context/AuthContext'
import TiempoExtra from './Incidencias/TiempoExtra'

const Incidencias = ({ setIncidencias, setIncidenciasPagination, setTiempoExtra, setTiempoExtraPagination }) => {

    const { perfilCapital }  = useContext(AuthContext)

    const [ generales, setGenerales ] = useState(true)
    const [ montos, setMontos ] = useState(false)
    const [ timepoExtra, setTimepoExtra ] = useState(false)

    return (
        <div className='card mt-5'>
            <div className='p-3 rounded-t-lg bg-white'>
                <h1 className='font-semibold'>Registro de Incidencias</h1>
            </div>
            
            <div className='card-body p-4 bg-white rounded-b-lg'>
                <div className="tabs">
                    { perfilCapital.incidencias.incidencias_generales && (
                        <a className={`tab tab-lifted ${generales && 'tab-active'}`} onClick={() => [setGenerales(true), setMontos(false), setTimepoExtra(false)]}>Generales</a> 
                    )}
                    { perfilCapital.incidencias.incidencias_montos && (
                        <a className={`tab tab-lifted ${montos && 'tab-active'}`} onClick={() => [setGenerales(false), setMontos(true), setTimepoExtra(false)]}>Montos</a> 
                    )}
                    { perfilCapital.incidencias.tiempo_extra && (
                        <a className={`tab tab-lifted ${timepoExtra && 'tab-active'}`} onClick={() => [setGenerales(false), setMontos(false), setTimepoExtra(true)]}>Tiempo Extra</a> 
                    )}
                </div>

                { perfilCapital.incidencias.incidencias_generales && generales ? (
                    <Generales 
                        setIncidencias={setIncidencias}
                        setIncidenciasPagination={setIncidenciasPagination}
                    />
                ) : ''}

                { perfilCapital.incidencias.incidencias_montos && montos ? ( 
                    <Montos 
                        setIncidencias={setIncidencias}
                        setIncidenciasPagination={setIncidenciasPagination}
                    />
                ) : ''}

                { perfilCapital.incidencias.tiempo_extra && timepoExtra 
                    ? (
                        <TiempoExtra
                            setTiempoExtra={setTiempoExtra}
                            setTiempoExtraPagination={setTiempoExtraPagination}
                        />
                    ) : ''}
            </div>
        </div>
    )
}

export default Incidencias