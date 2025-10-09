import { useEffect, useState } from 'react'

//APIS
import axios from '../../../axios/axios.config'
import LoadingDiv from '../../UI/LoadingDiv'
import ModalImagenes from './Modales/ModalImagenes'
import ModalEditarEquipo from './Modales/ModalEditarEquipo'

const TablaEquipos = ({ equipos, setEquipos, equiposPagination, setEquiposPagination, setNuevoEquipo }) => {

    const [ loading , setLoading ] = useState(false)
    const [ modalImagenes, setModalImagenes ] = useState(false)
    const [ modalEditarEquipo, setModalEditarEquipo ] = useState(false)
    const [ seleccionEquipo, setSeleccionEquipo ] = useState();

    //Query Params
    const [ urlPagination, setUrlPagination ] = useState()
    const [ numeroSerieFiltro, setNumeroSerieFiltro ] = useState('');
    const [ estatusFiltro, setEstatusFiltro ] = useState([])

    const onFiltroEstatus = (checked, value) => {
        if(checked){
            setEstatusFiltro([...estatusFiltro, value])
            return;
        }

        const noExiste = estatusFiltro.filter(f => {
            return f != value
        })

        setEstatusFiltro(noExiste)
    }

    useEffect(() => {
        const onObtenerEquipos = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(urlPagination ? urlPagination : '/inventario/equipos', {
                    params: {
                        'numero_serie' : numeroSerieFiltro,
                        "estatus" : estatusFiltro,
                    }
                })
                setEquipos(data.equipos.data)
                setEquiposPagination(data.equipos.links)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerEquipos()
    }, [setEquipos, setEquiposPagination, urlPagination, numeroSerieFiltro, estatusFiltro])

    return (
        <div>
            { modalImagenes && (
                <ModalImagenes
                    setModalImagenes={setModalImagenes}
                    seleccionEquipo={seleccionEquipo}
                />
            )}

            { modalEditarEquipo && (
                <ModalEditarEquipo
                    setModalEditarEquipo={setModalEditarEquipo}
                    seleccionEquipo={seleccionEquipo}
                    setEquipos={setEquipos}
                    setEquiposPagination={setEquiposPagination}
                />
            )}

            <div className="flex justify-between">
                <div className='flex'>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">No.Serie</span>
                        </label>
                        <input type="text" value={numeroSerieFiltro} onChange={(e) => setNumeroSerieFiltro(e.target.value)} placeholder="..." className="border-2 border-gray-300 input input-sm input-bordered w-full max-w-xs" />
                    </div>
                    <div className="flex justify-center items-end ml-5 space-x-3">
                        <div className='flex items-end'>
                            <input type="checkbox" value={1} onChange={(e) => onFiltroEstatus(e.target.checked, e.target.value)} className='checkbox checkbox-primary checkbox-md border-2 border-gray-300' />
                            <label className='ml-2 font-semibold text-sm'>Excelente</label>
                        </div>
                        <div className='flex items-end'>
                            <input type="checkbox" value={2} onChange={(e) => onFiltroEstatus(e.target.checked, e.target.value)} className='checkbox checkbox-info checkbox-md border-2 border-gray-300' />
                            <label className='ml-2 font-semibold text-sm'>Bueno</label>
                        </div>
                        <div className='flex items-end'>
                            <input type="checkbox" value={3} onChange={(e) => onFiltroEstatus(e.target.checked, e.target.value)} className='checkbox checkbox-warning checkbox-md border-2 border-gray-300' />
                            <label className='ml-2 font-semibold text-sm'>Regular</label>
                        </div>
                        <div className='flex items-end'>
                            <input type="checkbox" value={4} onChange={(e) => onFiltroEstatus(e.target.checked, e.target.value)} className='checkbox checkbox-error checkbox-md border-2 border-gray-300' />
                            <label className='ml-2 font-semibold text-sm'>Dañado</label>
                        </div>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nuevo Registro</span>
                    </label>
                    <label htmlFor="modal_nuevo_equipo" onClick={() => setNuevoEquipo(true)} className="btn btn-secondary btn-sm w-52">Registrar Equipo</label>
                </div>
            </div>
            { loading 
                ? <LoadingDiv>Cargando Equipos</LoadingDiv>
                : (
                    <table className="table table-sm table-zebra my-4">
                        <thead>
                            <tr>
                                <th className="bg-gray-800 text-white rounded-tl-lg">Marca</th>
                                <th className="bg-gray-800 text-white">Modelo</th>
                                <th className="bg-gray-800 text-white">Detalles</th>
                                <th className="bg-gray-800 text-white rounded-tr-lg text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            { equipos.map((equipo) => (
                                <tr key={equipo.id_equipo}>
                                    <td>
                                        <h1 className='font-semibold'>{equipo.tipo} - {equipo.marca}</h1>
                                        <h1 className='text-xs font-semibold'>Estatus: 
                                            { equipo.estatus == 1 &&  <div className="ml-2 badge badge-sm badge-primary text-white">Excelente</div>}
                                            { equipo.estatus == 2 &&  <div className="ml-2 badge badge-sm badge-info text-white">Bueno</div>}
                                            { equipo.estatus == 3 &&  <div className="ml-2 badge badge-sm badge-warning">Regular</div>}
                                            { equipo.estatus == 4 &&  <div className="ml-2 badge badge-sm badge-accent">Dañado</div>}
                                        </h1>
                                    </td>
                                    <td>
                                        <h1 className='font-semibold text-sm'>{equipo.modelo}</h1>
                                        <h1 className='text-xs'>SERIE: <span className='font-bold'>{equipo.serie}</span></h1>
                                    </td>
                                    <td>
                                        <h1>Personas Asignadas: {equipo.total_responsivas}</h1>
                                        <h1 className='text-xs font-semibold'>Comentario: {equipo.observaciones}</h1>    
                                    </td>
                                    <td className='text-center'>
                                        <div className='flex flex-col justify-start items-start space-y-1'>
                                            <label htmlFor="modal_editar_equipo" onClick={() => [setModalEditarEquipo(true), setSeleccionEquipo(equipo.id_equipo)]} className='font-semibold text-xs cursor-pointer hover:text-blue-500'>Editar Equipo</label>
                                            <label htmlFor='modal_imagenes' onClick={() => [setModalImagenes(true), setSeleccionEquipo(equipo.id_equipo)]} className='font-semibold text-xs cursor-pointer hover:text-blue-500'>Mostrar Imagenes</label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) 
            }

            {!loading && (
                <div className="join mt-2">
                    { equiposPagination.map((link) => (
                        //console.log(link)
                        link.url && <button onClick={() => setUrlPagination(link.url)} key={link.label} className={`join-item btn ${link.active && 'btn-active'}`}>{link.label}</button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TablaEquipos