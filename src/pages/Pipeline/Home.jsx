import { useContext, useEffect, useState } from "react";
import { AiOutlineUser, AiOutlinePlusCircle } from "react-icons/ai";

//Components
import TablaClientes from "../../components/Pipeline/Home/TablaClientes";
import GraficaClientesProyectos from "../../components/Pipeline/Home/GraficaClientesProyectos";
import TablaProyectos from "../../components/Pipeline/Home/TablaProyectos";

//API
import axios from "../../axios/axios.config";
import { AuthContext } from "../../context/AuthContext";
import PageError from "../../components/UI/PageError";
import FormNuevoCliente from "../../components/Pipeline/Home/Forms/FormNuevoCliente";

const Home = () => {
  
    const [ tablaClientes, setTablaClientes ] = useState(true);
    const [ tablaProyectos, setTablaProyectos ] = useState(false);

    const [ clientes, setClientes ] = useState([]);
    const [ clientesPagination, setClientesPagination ] = useState([])

    const [ proyectos, setProyectos ] = useState([]);
    const [ proyectosPagination, setProyectosPagination ] = useState([])

    const [ loading, setLoading ] = useState({})
    const [ grafica, setGrafica ] = useState({})

    const [ totalClientes, setTotalClientes ] = useState(0)
    const [ ultimosClientes, setUltimosClientes ] = useState(0)
    const [ ultimosProyectos, setUltimosProyectos ] = useState(0)

    //FORMS
    const [ formCliente, setFormCliente ] = useState(false);

    useEffect(() => {
        const onObtenerStats = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get('pipeline/stats/home');
                setUltimosProyectos(data.ultimos_proyectos)
                setUltimosClientes(data.ultimos_clientes)
                setTotalClientes(data.total_clientes)
                setGrafica(data.stats)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerStats();
    }, [])

    const { sistemasAcceso } = useContext(AuthContext)

    if(!sistemasAcceso.pipeline) return <PageError/>

    return(
        <div className="drawer drawer-end">
            <input id="drawer-home-pipeline" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className="grid grid-rows-1 gap-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6">
                            <div className="card shadow-lg">
                                <div className="card-body p-2 w-full border-2 border-gray-300 rounded-lg bg-white">
                                    {!loading && <GraficaClientesProyectos grafica={grafica}/>}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="stats shadow w-full">
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <AiOutlinePlusCircle className="text-3xl font-bold"/>
                                    </div>
                                    <div className="stat-title font-semibold text-sm">Clientes Agregados</div>
                                    <div className="stat-value text-xl">{ultimosClientes}</div>
                                    <div className="stat-desc font-semibold text-green-500">En el ultimo mes</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <AiOutlinePlusCircle className="text-3xl font-bold"/>
                                    </div>
                                    <div className="stat-title font-semibold text-sm">Proyectos Agregados</div>
                                    <div className="stat-value text-xl">{ultimosProyectos}</div>
                                    <div className="stat-desc font-semibold text-blue-500">En el ultimo mes</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <AiOutlineUser className="text-3xl font-bold"/>
                                    </div>
                                    <div className="stat-title font-semibold text-sm">Total Clientes</div>
                                    <div className="stat-value text-xl">{totalClientes}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-1">
                        <div className="card">
                            <div className="card-body rounded-lg bg-white">
                                <div role="tablist" className="tabs tabs-lifted">
                                    <a className={`tab tab-sm  ${tablaClientes && 'tab-active'}`} onClick={() => [ setTablaClientes(true), setTablaProyectos(false) ]}>Clientes</a> 
                                    <a className={`tab tab-sm  ${tablaProyectos && 'tab-active'}`} onClick={() => [ setTablaClientes(false), setTablaProyectos(true) ]}>Proyectos</a> 
                                </div>
                                
                                { tablaClientes && (
                                    <TablaClientes 
                                        clientes={clientes} 
                                        setClientes={setClientes} 
                                        clientesPagination={clientesPagination} 
                                        setClientesPagination={setClientesPagination}
                                        setFormCliente={setFormCliente}
                                    /> 
                                )}

                                { tablaProyectos && (
                                    <TablaProyectos
                                        proyectos={proyectos}
                                        setProyectos={setProyectos}
                                        proyectosPagination={proyectosPagination}
                                        setProyectosPagination={setProyectosPagination}
                                    /> 
                                )}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div> 
            <div className="drawer-side">
                <label htmlFor="drawer-home-pipeline" onClick={() => [setFormCliente(false)]} aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu p-4 w-3/12 min-h-full bg-base-200 text-base-content">
                    { formCliente && (
                        <FormNuevoCliente
                            setClientes={setClientes}
                            setClientesPagination={setClientesPagination}
                            setGrafica={setGrafica}
                        />             
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home