import { useContext, useEffect, useState } from "react"
import { CatalogosContext } from "../../../../context/CatalogosContext"
import ModalNuevoProyecto from "./Modales/ModalNuevoProyecto"
import ModalEditarProyecto from "./Modales/ModalEditarProyecto"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import axios from '../../../../axios/axios.config'
import LoadingDiv from "../../../UI/LoadingDiv"
import Swal from 'sweetalert2'


const TablaProyectos = ({ setProyectos, proyectos, setProyectosPagination, proyectosPagination }) => {

    const { idCliente } = useParams();

    const { catalogosPipeline } = useContext(CatalogosContext)

    //Filtros
    const [ rangoDias, setRangoDias ] = useState(0);
    const [ divisionFiltro, setDivisionFiltro ] = useState([]);
    const [ fasesFiltro, setFasesFiltro ] = useState([]);
    const [ filtroProyectos, setFiltroProyectos ] = useState();
    const [ urlPagination, setUrlPagination ] = useState()
    const [ loading, setLoading ] = useState(false)

    const [ modalNuevoproyecto, setModalNuevoProyecto ] = useState(false)
    const [ modalEditarProyecto, setModalEditarProyecto ] = useState(false)

    const [ proyecto, setProyecto ] = useState();

    const onAgregarDivisionFiltro = (checked, value) => {
        if(checked){
            setDivisionFiltro([...divisionFiltro, value])
            return;
        }

        const noExiste = divisionFiltro.filter(f => {
            return f != value
        })

        setDivisionFiltro(noExiste)
    }

    const onAgregarFasesFiltro = (checked, value) => {
        if(checked){
            setFasesFiltro([...fasesFiltro, value])
            return;
        }

        const noExiste = fasesFiltro.filter(f => {
            return f != value
        })

        setFasesFiltro(noExiste)
    }

    const onSuspenderProyecto = async (idProyecto) => {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Este proyecto sera suspendido",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, suspender!',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await toast.promise(axios.put(`/pipeline/proyectos/suspender/${idProyecto}`), {
                        pending: 'Suspendiendo Proyecto',
                        success: 'Proyecto Suspendido'
                    })
                    setProyectos(data.proyectos.data)
                    setProyectosPagination(data.proyectos.links)
                } catch (error) {
                    console.log(error)
                }
            }
        })
    } 
    
    useEffect(() => {
        const onObtenerProyectos = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(urlPagination ? urlPagination : `/pipeline/proyectos/cliente/${idCliente}`, {
                    params: {
                        'fases' : fasesFiltro,
                        'proyectos' : filtroProyectos,
                        'rango_dias_vida' : rangoDias,
                        'division' : divisionFiltro,
                    }
                });
                setProyectos(data.proyectos.data)
                setProyectosPagination(data.proyectos.links)
            } catch (error) {
                setLoading(false)
                toast(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            setLoading(false)
        }
        onObtenerProyectos()
    }, [idCliente, urlPagination, fasesFiltro, divisionFiltro, rangoDias, filtroProyectos, setProyectos, setProyectosPagination])

    return (
        <>
            { modalNuevoproyecto && (
                <ModalNuevoProyecto 
                    setModalNuevoProyecto={setModalNuevoProyecto} 
                    setProyectos={setProyectos}
                    setProyectosPagination={setProyectosPagination}
                />
            )}

            { modalEditarProyecto && (
                <ModalEditarProyecto 
                    proyecto={proyecto}
                    setModalEditarProyecto={setModalEditarProyecto} 
                    setProyectos={setProyectos}
                    setProyectosPagination={setProyectosPagination}
                />
            )}
            
            <div className="flex flex-col justify-between mb-3 bg-white rounded-lg border-2 border-gray-300 p-5">
                <div className="flex">
                    <div className="w-3/12 flex flex-col h-36 overflow-y-auto">
                        <label className="label">
                            <span className="label-text font-semibold">Fases</span>
                        </label>
                        <div className="flex flex-col justify-evenly w-full">
                            { catalogosPipeline.fases.map(fase => (
                                <div key={fase.id_fase} className="flex mt-2">
                                    <input type="checkbox" onChange={(e) => onAgregarFasesFiltro(e.target.checked, e.target.value)} value={fase.id_fase} className="checkbox checkbox-sm" />
                                    <label className="text-xs font-semibold ml-2">{fase.fase}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-9/12 form-control ml-5">
                        <div className="flex">
                            <div className="flex w-full">
                                <div className="form-control mb-2 w-1/2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Buscar Proyectos</span>
                                    </label>
                                    <input type="text" onChange={(e) => setFiltroProyectos(e.target.value)} value={filtroProyectos} placeholder="...." className="input input-sm input-bordered w-full" />
                                </div>
                                <div className="w-1/2 ml-10">
                                    <label className="label">
                                        <span className="label-text font-semibold">Division</span>
                                    </label>
                                    <div className="w-full flex overflow-x-auto">
                                        <div className="flex flex-row justify-start items-center w-full mt-1">
                                            { catalogosPipeline.divisiones.map(division => (
                                                <div key={division.id_division} className="flex mr-5">
                                                    <input onChange={(e) => onAgregarDivisionFiltro(e.target.checked, e.target.value)} type="checkbox" value={division.id_division} className="mr-2 checkbox checkbox-md" />
                                                    <label className="text-sm font-semibold">{division.division}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <label className="label mt-2">
                            <span className="label-text font-semibold">Rango dias</span>
                        </label>
                        <input type="range" onChange={(e) => setRangoDias(e.target.value)} value={rangoDias}  min={0} max="120" className="range range-sm" step="30" />
                        <div className="w-full flex justify-between text-xs px-2">
                            <span>0</span>
                            <span>30</span>
                            <span>60</span>
                            <span>90</span>
                            <span>+120</span>
                        </div>
                    </div>
                </div>
            </div>
            

            <div className="flex justify-end mb-2">
                <label onClick={() => setModalNuevoProyecto(true)} htmlFor="modal_nuevo_proyecto" className="btn btn-sm btn-secondary">Nuevo Proyecto</label>          
            </div>
            
            { 
                loading
                ? <LoadingDiv>Cargando Proyectos</LoadingDiv>
                : (
                    <table className="table table-sm table-zebra bg-white">
                        <thead>
                            <tr>
                                <th className="bg-gray-200 text-gray-500">Empresa</th>
                                <th className="bg-gray-200 text-gray-500">Proyecto</th>
                                <th className="bg-gray-200 text-gray-500">Divison / Fase</th>
                                <th className="bg-gray-200 text-gray-500">Producto</th>
                                <th className="bg-gray-200 text-gray-500">Asignacion</th>
                                <th className="bg-gray-200 text-gray-500">Fecha Registro</th>
                                <th className="bg-gray-200 text-gray-500 text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            { proyectos.map((proyecto) => (
                                <tr key={proyecto.id_proyecto}>
                                     <td>
                                        <h1 className="font-semibold text-xs">{proyecto.empresa}</h1>
                                    </td>
                                    <td>
                                        <h1 className="font-semibold text-xs">{proyecto.proyecto}</h1>
                                        <p className="font-semibold text-xs text-gray-500">Dias Vida: {proyecto.dias_vida}</p>
                                    </td>
                                    <td>
                                        <h1 className="font-semibold text-xs">Fase:{' '}
                                            { proyecto.fase == 'SUSPENDIDA'
                                                ? <div className="badge badge-sm badge-warning text-xs">{proyecto.fase}</div>
                                                : proyecto.fase == 'PERDIDA' 
                                                    ? <div className="badge badge-sm badge-accent text-xs">{proyecto.fase}</div>
                                                    : <div className="badge badge-sm badge-secondary text-xs">{proyecto.fase}</div>
                                            }
                                        </h1>
                                        <p className="font-semibold text-xs text-gray-500">Division: {proyecto.division}</p>
                                    </td>
                                    <td>
                                        <h1 className="font-semibold text-xs">{proyecto.producto}</h1>
                                        <p className="font-semibold text-xs text-gray-500">Mercancia: {proyecto.mercancia}</p>
                                    </td>
                                    <td>
                                        <h1 className="font-semibold text-xs">Ingeniero: {proyecto.ingeniero}</h1>
                                        <p className="font-semibold text-xs text-gray-500">Ejecutivo: {proyecto.ejecutivo}</p>
                                    </td>
                                    <td className="font-semibold text-xs">{ proyecto.fecha_registro }</td>
                                    <td>
                                        <div className="flex justify-evenly">
                                            <label onClick={() => [setModalEditarProyecto(true), setProyecto(proyecto.id_proyecto)]} htmlFor="modal_editar_proyecto" className="font-semibold text-xs cursor-pointer hover:text-green-500">
                                                Editar
                                            </label>    
                                            { proyecto.fase != 'SUSPENDIDA' && (<button onClick={() => onSuspenderProyecto(proyecto.id_proyecto)} className="font-semibold text-xs hover:text-orange-500">Suspender</button>)} 
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) 
            }


            <div className="join mt-2">
                { proyectosPagination.map((link) => (
                    //console.log(link)
                    link.url && <button onClick={() => setUrlPagination(link.url)} key={link.label} className={`join-item btn ${link.active && 'btn-active'}`}>{link.label}</button>
                ))}
            </div>
        </>
    )
}

export default TablaProyectos