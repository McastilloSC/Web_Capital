import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { BsFileExcelFill, BsPlusCircle } from "react-icons/bs";
import { toast } from 'react-toastify'

//API
import axios from '../../../axios/axios.config'
import LoadingTable from '../../UI/LoadingTable';

const TablaClientes = ({ clientes, setClientes, clientesPagination, setClientesPagination, setFormCliente }) => {

    const [ loading, setLoading ] = useState([])
    const [ url, setUrl ] = useState(null)
    const [ cliente, setCliente ] = useState(null)
    const [ estatus, setEstatus ] = useState([])

    //Query Params State
    const [ anioCliente, setAnioCliente ] = useState(null)
    const [ numeroFilas, setNumeroFilas ] = useState(5)

    const onAgregarEstatus = (checked, value) => {
        if(checked){
            setEstatus([...estatus, parseInt(value)])
            return;
        }

        const filtro = estatus.filter(e => {
            return e != value;
        })

        setEstatus(filtro)
    }

    const onExportarClientes = async () => {
        try {
            const { data } = await toast.promise(axios.get('/pipeline/clientes/export/report', { responseType: 'blob' }), {
                pending: 'Generando Reporte',
                success: 'Reporte Generado'
            })

            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            const link = document.createElement('a');
            link.download = 'Reporte_Clientes.xlsx';
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
        const onObtenerClientes = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get( url ? url :'pipeline/clientes', {
                    params: {
                        'estatus': estatus,
                        'cliente': cliente,
                        'filas': numeroFilas,
                        'anio_cliente': anioCliente,
                    }
                });
                setClientes(data.clientes.data)
                setClientesPagination(data.clientes.links)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerClientes();
    }, [estatus, url, cliente, setClientes, setClientesPagination, numeroFilas, anioCliente])

    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between my-3">
                <div className="flex w-full space-x-5 mb-3">
                    <div className='flex w-8/12 space-x-5'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Buscar Clientes</span>
                            </label>
                            <input onChange={(e) => setCliente(e.target.value)} type="text" placeholder="...." className="input input-sm input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Año</span>
                            </label>
                            <select onChange={(e) => setAnioCliente(e.target.value)} value={anioCliente} className='select w-full select-sm select-bordered'>
                                <option value="">-- Filtro Año --</option>
                                <option value={2024}>2024</option>
                                <option value={2023}>2023</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Filas</span>
                            </label>
                            <select onChange={(e) => setNumeroFilas(e.target.value)} value={numeroFilas} className='select w-full select-sm select-bordered'>
                                <option value={5}>5 Filas</option>
                                <option value={10}>10 Filas</option>
                                <option value={15}>15 Filas</option>
                                <option value={30}>30 Filas</option>
                                <option value={50}>50 Filas</option>
                                <option value={100}>100 Filas</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Estatus</span>
                            </label>
                            <div className="flex flex-row justify-start mt-1">
                                <div className="flex mr-4">
                                    <input type="checkbox" onChange={(e) => onAgregarEstatus(e.target.checked, e.target.value)} value={1} className="mr-3 checkbox" />
                                    <label className="text-sm">Activos</label>
                                </div>
                                <div className="flex mr-4">
                                    <input type="checkbox" onChange={(e) => onAgregarEstatus(e.target.checked, e.target.value)} value={0} className="mr-3 checkbox" />
                                    <label className="text-sm">No Activos</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-4/12 space-x-5 flex justify-end items-end'>
                        <button onClick={() => onExportarClientes()} className='btn btn-sm'>
                            <BsFileExcelFill className='text-lg'/>
                            Exportar Clientes
                        </button> 
                        <label htmlFor='drawer-home-pipeline' onClick={() => [setFormCliente(true)]} className='btn btn-sm'>
                            <BsPlusCircle className='text-lg'/>
                            Nuevo Cliente
                        </label> 
                    </div>
                </div>
            </div>

            <table className="table table-zebra table-xs mb-5">
                <thead>
                    <tr>
                        <th className="bg-gray-200 text-gray-700 p-1">Cliente</th>
                        <th className="bg-gray-200 text-gray-700">Estatus</th>
                        <th className="bg-gray-200 text-gray-700">Fecha Registro</th>
                    </tr>
                </thead>
                <tbody>
                    {loading
                        ? <LoadingTable columnas={3} filas={numeroFilas}/>
                        : clientes.map((cliente) => (
                            <tr key={cliente.id_cliente}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold text-xs">
                                                <NavLink className={'hover:text-blue-500'} to={`/home/pipeline/cliente/${cliente.id_cliente}`}>{cliente.cliente}</NavLink>
                                            </div>
                                            <div className="text-xs text-gray-600">Total de proyectos: <span className="font-bold">{cliente.total_proyectos}</span></div>
                                        </div>
                                    </div>
                                </td>
                            
                                <td>
                                    { cliente.estatus == 1 && <div className="badge badge-sm badge-primary mt-1">Activo</div>}
                                    { cliente.estatus == 0 && <div className="badge badge-sm badge-error mt-1">No Activo</div>}
                                </td>
                                
                                <td>{cliente.fecha_registro}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>

            <div className="join">
                { clientesPagination.map(link => (
                    link.url && ( <button disabled={loading} onClick={() => setUrl(link.url)} key={link.label} className={`join-item btn btn-sm ${link.active && 'btn-active'}`}>{link.label.replace(/["&laq;"]/g, "")}</button>)
                ))}
            </div>
        </div>
    )
}

export default TablaClientes