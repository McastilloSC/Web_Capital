import { useContext, useEffect, useState } from "react"
import ModalNuevoEquipo from "../../components/Inventario/Registro/Modales/ModalNuevoEquipo"
import TablaEquipos from "../../components/Inventario/Registro/TablaEquipos"
import { AiOutlineCheck, AiOutlineClose, AiOutlineExclamationCircle, AiOutlineCheckCircle, AiOutlineSync } from "react-icons/ai";

//APIS
import axios from "../../axios/axios.config";

//CONTEXT
import { AuthContext } from "../../context/AuthContext"
import PageError from "../../components/UI/PageError";

const Registro = () => {

    const { sistemasAcceso } = useContext(AuthContext)

    const [ nuevoEquipo, setNuevoEquipo ] = useState(false)
    const [ equipos, setEquipos ] = useState([])
    const [ equiposPagination, setEquiposPagination ] = useState([])
    const [ totales, setTotales ] = useState({})

    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        const onObtenerResumen = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get('/inventario/equipos/resumen/totales')
                setTotales(data.contadores)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
            setLoading(false)
        }
        onObtenerResumen()
    }, [])
    

    if(!sistemasAcceso.inventario) return <PageError/>

    return (
        <div>
            { nuevoEquipo && (
                <ModalNuevoEquipo
                    setNuevoEquipo={setNuevoEquipo}
                    setEquipos={setEquipos}
                    setEquiposPagination={setEquiposPagination}
                /> 
            )}

            <div className="stats shadow mb-5 w-full">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        { loading
                            ? <AiOutlineSync className="text-3xl animate-spin"/>
                            : <AiOutlineCheck className="text-3xl"/>
                        }
                    </div>
                    <div className="stat-title font-semibold">Equipos Excelentes</div>
                    { loading
                        ? <h1 className="font-bold text-xl">Cargando</h1> 
                        : <h1 className="font-bold text-xl">Cant. {totales.equipos_excelentes}</h1>
                    }
                </div>

                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        { loading
                            ? <AiOutlineSync className="text-3xl animate-spin"/>
                            : <AiOutlineCheckCircle className="text-3xl"/>
                        }
                    </div>
                    <div className="stat-title font-semibold">Equipos Buenos</div>
                    { loading
                        ? <h1 className="font-bold text-xl">Cargando</h1> 
                        : <h1 className="font-bold text-xl">Cant. {totales.equipos_buenos}</h1>
                    }
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-warning">
                        { loading
                            ? <AiOutlineSync className="text-3xl animate-spin"/>
                            : <AiOutlineExclamationCircle className="text-3xl"/>
                        }
                    </div>
                    <div className="stat-title font-semibold">Equipos Regulares</div>
                    { loading
                        ? <h1 className="font-bold text-xl">Cargando</h1> 
                        : <h1 className="font-bold text-xl">Cant. {totales.equipos_regulares}</h1>
                    }
                </div>

                <div className="stat">
                    <div className="stat-figure text-error">
                        { loading
                            ? <AiOutlineSync className="text-3xl animate-spin"/>
                            : <AiOutlineClose className="text-3xl"/>
                        }
                    </div>
                    <div className="stat-title font-semibold">Equipos Dañados</div>
                    { loading
                        ? <h1 className="font-bold text-xl">Cargando</h1> 
                        : <h1 className="font-bold text-xl">Cant. {totales.equipos_daniados}</h1>
                    }
                </div>
            </div>

            <div className="card">
                <div className="card-body py-4 bg-white rounded-lg">
                    <TablaEquipos
                        equipos={equipos}
                        setEquipos={setEquipos}
                        equiposPagination={equiposPagination}
                        setEquiposPagination={setEquiposPagination}
                        setNuevoEquipo={setNuevoEquipo}
                    />
                </div>
            </div>
        </div>
    )
}

export default Registro