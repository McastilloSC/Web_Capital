import { useContext, useEffect, useState } from 'react'
import { AiFillFileExcel, AiOutlinePlusCircle  } from "react-icons/ai";
import { toast } from 'react-toastify';

//APIS
import axios from '../../../axios/axios.config'
import { Link } from 'react-router-dom'

//Context
import { AuthContext } from '../../../context/AuthContext'
import useTables from '../../../hooks/useTables';

//Components
import LoadingTable from '../../UI/LoadingTable';
import Paginacion from '../../UI/Paginacion';


const TablaEmpleados = ({ empleados, setEmpleados, setModalNuevoEmpleado }) => {

    const { currentPage, setCurrentPage, lastPage, setLastPage, params, setParams } = useTables();
    const { perfilCapital, administradores } = useContext(AuthContext)

    const [ loading, setLoading ] = useState(false)

    //Query Params States
    const [ filtroEmpresa, setFiltroEmpresa ] = useState(params.filtro_empresa)
    const [ filtroEmpleado, setFiltroEmpleado ] = useState(params.filtro_nombre)
    const [ filtroPuesto, setFiltroPuesto] = useState(params.filtro_puesto)
    const [ filtroArea, setFiltroArea ] = useState(params.filtro_area)
    const [ filtroReferencias, setFiltroReferencias ] = useState(params.filtro_referencias)
    const [ mostrarBajas, setMostrarBajas ] = useState(false)

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            const params = {
                'filtro_empresa': filtroEmpresa,
                'filtro_nombre': filtroEmpleado,
                'filtro_puesto': filtroPuesto,
                'filtro_area': filtroArea,
                'filtro_referencias': filtroReferencias,
                'bajas': mostrarBajas
            }
            setParams(params)
        }
    };

    const onGenerarReporteEmpleados = async () => {
        try {
            const { data } = await toast.promise(axios.get('/capital/empleado/reportes/empleados', {
                params: {
                    'bajas' : mostrarBajas,
                },
                responseType: 'blob'
            }), {
                pending: 'Generando Reporte',
                success: 'Reporte Generado'
            })

            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            const link = document.createElement('a');
            link.download = 'Reporte_Empleados.xlsx';
            link.href = URL.createObjectURL(blob);
            link.click();
        } catch (error) {
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
        const onObtenerEmpleados = async () =>{
            try {
                setLoading(true);
                //Selects o Checks
                params.bajas = mostrarBajas;
                const { data } = await axios.get(`/capital/empleado?page=${currentPage}` , {
                    params: params
                });
                console.log(data)
                setEmpleados(data.empleados.data)
                setLastPage(data.empleados.last_page)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
                setParams(params)
            }
        
        }
        onObtenerEmpleados();
    }, [setEmpleados, params, setParams, mostrarBajas, currentPage])

    return (
        <div className='card'>
            <div className='card-body bg-white py-4 rounded-lg'>
                <div className='flex justify-between items-end mb-4'>
                    <div>
                        { administradores.capital && (
                            <div className="flex space-x-3 items-center w-full max-w-xs">
                                <input type="checkbox" value={mostrarBajas} onChange={(e) => setMostrarBajas(e.target.checked)} className='checkbox checkbox-sm checkbox-accent'/>
                                <span className="label-text">Mostrar Bajas</span>
                            </div>
                        )}
                    </div>
                    <div className='flex space-x-3 items-end justify-end'>
                        { perfilCapital.empleado.registro_empleado && (
                            <label htmlFor="modal_form" onClick={() => setModalNuevoEmpleado(true)} className='btn btn-sm bg-gray-300'>
                                <AiOutlinePlusCircle className='text-xl'/>
                                Nuevo Empleado
                            </label>
                        )}
                    
                        { administradores.capital && (
                            <button onClick={() => onGenerarReporteEmpleados()} className='btn btn-sm bg-gray-300'>
                                <AiFillFileExcel className='text-xl'/>
                                Generar Reporte
                            </button>
                        )}
                    </div>
                </div>

                <table className='table bg-white table-xs table-zebra'>
                    <thead>
                        <tr>
                            <th className='bg-gray-200 text-gray-600 uppercase'>Empresa</th>
                            <th className='bg-gray-200 text-gray-600 uppercase'>Nombre</th>
                            <th className='bg-gray-200 text-gray-600 uppercase'>Puesto</th>
                            <th className='bg-gray-200 text-gray-600 uppercase'>Area</th>
                            <th className='bg-gray-200 text-gray-600 uppercase'>Referencias</th>
                        </tr>
                        <tr>
                            <th className='bg-gray-200 text-gray-600 uppercase'>
                                <input type="text" placeholder='Filtro Empresa' value={filtroEmpresa} onChange={(e) => setFiltroEmpresa(e.target.value)} onKeyUp={onKeyPress} className='input input-bordered input-xs w-full'/>
                            </th>
                            <th className='bg-gray-200 text-gray-600 uppercase'>
                                <input type="text" placeholder='Filtro Nombre' value={filtroEmpleado} onChange={(e) => setFiltroEmpleado(e.target.value)} onKeyUp={onKeyPress} className='input input-bordered input-xs w-full'/>
                            </th>
                            <th className='bg-gray-200 text-gray-600 uppercase'>
                                <input type="text" placeholder='Filtro Puesto' value={filtroPuesto} onChange={(e) => setFiltroPuesto(e.target.value)} onKeyUp={onKeyPress} className='input input-bordered input-xs w-full'/>
                            </th>
                            <th className='bg-gray-200 text-gray-600 uppercase'>
                                <input type="text" placeholder='Filtro Area' value={filtroArea} onChange={(e) => setFiltroArea(e.target.value)} onKeyUp={onKeyPress} className='input input-bordered input-xs w-full'/>
                            </th>
                            <th className='bg-gray-200 text-gray-600 uppercase'>
                                <input type="text" placeholder='Filtro Referencias' value={filtroReferencias} onChange={(e) => setFiltroReferencias(e.target.value)} onKeyUp={onKeyPress} className='input input-bordered input-xs w-full'/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { loading 
                            ? <LoadingTable columnas={5}/>
                            : empleados.map((empleado) => (
                                <tr key={empleado.id_empleado}>
                                    <td className='text-xs'>
                                        <h1 className='font-semibold'>{empleado.empresa}</h1>
                                        <p className='font-semibold text-gray-500'>{empleado.tipo_pago}</p>
                                    </td>
                                    <td className='text-xs'>
                                        <Link to={`/home/capital_humano/empleado/${empleado.id_empleado}`} className='transition font-semibold hover:text-blue-500 duration-300'>{empleado.nombre}</Link>
                                        <p className='font-semibold text-gray-500'>Nomina: {empleado.numero_nomina}</p>
                                    </td>
                                    <td className='text-xs'>
                                        <h1 className='font-semibold uppercase'>Tipo Puesto: <span className='font-bold'>{empleado.tipo_puesto}</span></h1>
                                        <p className='font-semibold text-gray-500'>PUESTO: <span className='font-bold'>{empleado.puesto}</span></p>
                                    </td>
                                    <td className='text-xs'>
                                        <h1 className='font-semibold'>AREA: {empleado.area}</h1>
                                        Estatus: { empleado.deleted_at
                                            ? <span className='badge badge-error badge-sm'>Baja</span>
                                            : <span className='badge badge-primary badge-sm'>Activo</span>
                                        }
                                    </td>
                                    <td className='text-xs'>
                                        <h1 className='font-semibold'>RFC: {empleado.rfc}</h1>
                                        <p className='font-semibold text-gray-500'>NSS: {empleado.nss}</p>
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>

                <Paginacion
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    lastPage={lastPage}
                />
            </div>
        </div>
    )
}

export default TablaEmpleados