import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CatalogosContext } from "../../../context/CatalogosContext"
import { BsFileExcelFill } from "react-icons/bs";
import { AiFillCaretUp, AiFillCaretDown  } from "react-icons/ai";

//APIS
import axios from "../../../axios/axios.config"
import { toast } from "react-toastify";
import LoadingTable from "../../UI/LoadingTable";

const TablaProyectos = ({ proyectos, setProyectos, proyectosPagination, setProyectosPagination }) => {

    const { catalogosPipeline } = useContext(CatalogosContext)

    const [ loading, setLoading ] = useState(null)

    const [ url, setUrl ] = useState(null)
    const [ rangoDias, setRangoDias ] = useState(0) 
    const [ fasesFiltro, setFasesFiltro ] = useState([])
    const [ divisionFiltro, setDivisionFiltro ] = useState([])
    const [ proyectoFiltro, setProyectoFiltro ] = useState('')
    const [ clienteFiltro, setClienteFiltro ] = useState('')
    const [ numeroFilas, setNumeroFilas ] = useState(5)
    const [ ordernarTO, setOrdenarTO ] = useState(false)
    const [ valorOrderTO, setValorOrderTO ] = useState(false)
    const [ anioProyecto, setAnioProyecto ] = useState(null)

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

    const onExportarProyectos = async () => {
        try {
            const { data } = await toast.promise(axios.get('/pipeline/proyectos/export/report', 
            { 
                responseType: 'blob' ,
                params:{
                    'rango_dias': rangoDias,
                    'fases': fasesFiltro,
                    'divisiones': divisionFiltro,
                }
            }), {
                pending: 'Generando Reporte',
                success: 'Reporte Generado'
            })

            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            const link = document.createElement('a');
            link.download = 'Reporte_Proyectos.xlsx';
            link.href = URL.createObjectURL(blob);
            link.click();
        } catch (error) {
            console.log(error)
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
    }

    useEffect(() => {
        const onObtenerProyectos = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(url ? url : 'pipeline/proyectos', {
                    params:{
                        'rango_dias': rangoDias,
                        'fases': fasesFiltro,
                        'divisiones': divisionFiltro,
                        'buscador': proyectoFiltro,
                        'cliente_filtro': clienteFiltro,
                        'filas': numeroFilas,
                        'ordernar_to': ordernarTO,
                        'valor_order_to': valorOrderTO,
                        'anio_proyecto': anioProyecto,
                    }
                })
                setProyectos(data.proyectos.data)
                setProyectosPagination(data.proyectos.links)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerProyectos()
    }, [url, rangoDias, fasesFiltro, proyectoFiltro, divisionFiltro, setProyectos, setProyectosPagination, numeroFilas, ordernarTO, valorOrderTO, anioProyecto, clienteFiltro])

    return (
        <div className="overflow-x-auto">
            <div className="flex flex-col justify-between mt-2">
                <div className="flex">
                    <div className="w-3/12 flex flex-col h-36 overflow-y-auto">
                        <label className="label">
                            <span className="label-text font-semibold">Fases</span>
                        </label>
                        <div className="flex flex-col justify-evenly w-full">
                            { catalogosPipeline.fases.map(fase => (
                                <div key={fase.id_fase} className="flex mt-2">
                                    <input  onChange={(e) => onAgregarFasesFiltro(e.target.checked, e.target.value)} type="checkbox" value={fase.id_fase} className="checkbox checkbox-sm" />
                                    <label className="text-sm ml-2">{fase.fase}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-9/12 form-control ml-5">
                        <label className="label">
                            <span className="label-text font-semibold">Division</span>
                        </label>
                        <div className="w-full flex overflow-x-auto">
                            <div className="flex flex-row justify-start w-full mt-1">
                                { catalogosPipeline.divisiones.map(division => (
                                    <div key={division.id_division} className="flex mr-5">
                                        <input onChange={(e) => onAgregarDivisionFiltro(e.target.checked, e.target.value)} type="checkbox" value={division.id_division} className="mr-2 checkbox checkbox-sm" />
                                        <label className="text-sm">{division.division}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <label className="label mt-2">
                            <span className="label-text font-semibold">Rango dias</span>
                        </label>
                        <input type="range" onChange={(e) => setRangoDias(e.target.value)} min={0} max="150" value={rangoDias} className="range range-sm" step="30" />
                        <div className="w-full flex justify-between text-xs px-2">
                            <span>0</span>
                            <span>30</span>
                            <span>60</span>
                            <span>90</span>
                            <span>120</span>
                            <span>+150</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between w-full space-x-5 my-5">
                    <div className="w-8/12 flex space-x-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Buscar Proyectos</span>
                            </label>
                            <input onChange={(e) => setProyectoFiltro(e.target.value)} value={proyectoFiltro} type="text" placeholder="...." className="input border-gray-300 input-sm input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Buscar por Cliente</span>
                            </label>
                            <input onChange={(e) => setClienteFiltro(e.target.value)} value={clienteFiltro} type="text" placeholder="...." className="input border-gray-300 input-sm input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Año</span>
                            </label>
                            <select onChange={(e) => setAnioProyecto(e.target.value)} value={anioProyecto} className='select w-full select-sm select-bordered'>
                                <option value="">-- Filtro Año --</option>
                                <option value={2024}>2024</option>
                                <option value={2023}>2023</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Filas</span>
                            </label>
                            <select value={numeroFilas} onChange={(e) => setNumeroFilas(e.target.value)} className="select select-sm select-bordered">
                                <option value={5}>5 Filas</option>
                                <option value={15}>15 Filas</option>
                                <option value={30}>30 Filas</option>
                                <option value={50}>50 Filas</option>
                                <option value={100}>100 Filas</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-4/12 flex justify-end items-end form-control">
                        <button onClick={() => onExportarProyectos()} className="btn btn-sm">
                            <BsFileExcelFill className='text-lg'/>
                            Exportar Proyectos
                        </button>
                    </div>
                </div>
            </div>

            <table className="table table-zebra table-xs my-5">
                <thead>
                    <tr>
                        <th className="bg-gray-200 text-gray-700">Empresa</th>
                        <th className="bg-gray-200 text-gray-700">Proyecto</th>
                        <th className="bg-gray-200 text-gray-700">
                            <button onClick={() => [setOrdenarTO(true), setValorOrderTO(!valorOrderTO)]} className="flex space-x-5">
                                <h1>TO Anual</h1>
                                { valorOrderTO 
                                    ? <AiFillCaretUp/>
                                    : <AiFillCaretDown/>
                                }
                            </button>
                        </th>
                        <th className="bg-gray-200 text-gray-700">Fase</th>
                        <th className="bg-gray-200 text-gray-700">Informacion</th>
                        <th className="bg-gray-200 text-gray-700">Asignacion</th>
                    </tr>
                </thead>
                <tbody>
                    {loading 
                        ? <LoadingTable columnas={6}/>
                        : proyectos.map((proyecto) => (
                            <tr key={proyecto.id_proyecto}>
                                <td className="font-semibold">
                                    {proyecto.empresa}
                                </td>
                                <td>
                                    <div className="font-bold">
                                        <h1>{proyecto.proyecto}</h1>
                                    </div>
                                    <div className="text-sm opacity-80">
                                        <Link className={'hover:text-blue-500'} target="_blank" to={`/home/pipeline/cliente/${proyecto.id_cliente}`}>Cliente: {proyecto.cliente}</Link>
                                    </div>
                                </td>
                                <td>
                                    <h1 className="font-semibold text-xs">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(proyecto.to_anual)}</h1>
                                </td>
                                <td>
                                    <div className="font-bold">Fase: {proyecto.fase}</div>
                                    <div className="text-sm opacity-80">
                                        { proyecto.id_fase != 6 && proyecto.id_fase != 7 && proyecto.id_fase != 8 && proyecto.id_fase != 9 && proyecto.id_fase != 10 
                                            ? <span className={`badge badge-sm ${proyecto.en_tiempo == 1 ? 'badge-primary text-white' : 'badge-accent'}`}>{`Dias Activo: ${proyecto.dias_vida}`}</span>
                                            : ''
                                        }
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">Division: {proyecto.division}</div>
                                    <div className="text-sm opacity-80">Mercancia: {proyecto.mercancia}</div>
                                </td>
                                <td>
                                    <div className="font-bold">Ejecutivo: {proyecto.ejecutivo}</div>
                                    <div className="text-sm opacity-80">Ingeniero: {proyecto.ingeniero}</div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className="join">
                { proyectosPagination.map((link) => (
                    link.url && ( <button disabled={loading} onClick={() => setUrl(link.url)} key={link.label} className={`join-item btn btn-sm ${link.active && 'btn-active'}`}>{link.label.replace(/["&laq;"]/g, "")}</button>)
                ))}
            </div>
        </div>
    )
}

export default TablaProyectos