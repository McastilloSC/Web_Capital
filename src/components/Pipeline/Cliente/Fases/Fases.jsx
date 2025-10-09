import { useEffect, useState } from 'react'
import axios from '../../../../axios/axios.config';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Fases = () => {

    const { idCliente } = useParams()

    const [ proyectos, setProyectos ] = useState([])

    const onStartDrag = async (event, proyecto) => {
        //Extrae del objeto el id del proyecto
        event.dataTransfer.setData('id_proyecto', proyecto.id_proyecto)
    }

    const onDragginOver = async (event) =>{
        event.preventDefault();
    }

    const onDrop = async (event, fase) => {

        const proyectoID = event.dataTransfer.getData('id_proyecto');
        
        /* Proceso Manual
        const proyecto = listaProyectos.find((lista) => lista.id_proyecto == proyectoID);

        //Le asignamos la la fase nueva
        proyecto.id_fase = fase;

        const nuevaLista = proyectos.filter((proyecto) => {
            return proyecto.id_proyecto != proyectoID; 
        })
 
        nuevaLista.push(proyecto)
 
        nuevaLista.sort((a, b) => a.id_proyecto - b.id_proyecto)
 
        setProyectos(nuevaLista)*/

        try {
            const { data } = await toast.promise(axios.put(`/pipeline/proyectos/${proyectoID}/fase/${fase}`), {
                pending: 'Actualizando Fase',
                success: 'Fase Actualizada'
            });
            setProyectos(data.lista_proyectos)
        } catch (error) {
            console.log(error)
            return;
        }
    }

    const getListaProyectos = (fase) => {
        return proyectos.filter((lista) => lista.id_fase === fase)
    }

    useEffect(() => {
        const onObtenerUltimaFaseProyectos = async () => {
            try {
                const { data } = await toast.promise(axios.get(`/pipeline/proyectos/ultima_fase/cliente/${idCliente}`), {
                    pending: 'Obteniendo Fases',
                    success: 'Fases Obtenidas'
                });
                setProyectos(data.lista_proyectos)
            } catch (error) {
                console.log(error)
                return;
            }
        }
        onObtenerUltimaFaseProyectos()
    }, [])

    return (
        <div>
            <div className="grid grid-rows-1 rounded-lg">
                <div className="grid grid-cols-5 gap-5">
                    
                    <div className="bg-gray-100 rounded-lg w-full">
                        <div className="bg-white rounded-t-lg border-b-2 border-gray-300">
                            <h1 className="font-semibold text-center p-2">Adquisicion</h1>
                        </div>
                        <div 
                            className="p-2" 
                            droppable="true" 
                            onDragOver={(event) => onDragginOver(event)}
                            onDrop={(event) => onDrop(event, 1)}
                        >
                            { getListaProyectos(1).map((a) => (
                                <div key={a.id_proyecto} draggable onDragStart={(event) => onStartDrag(event, a)} className="bg-white p-2 border-2 border-gray-300 rounded-lg mb-3 cursor-pointer">
                                    <h1 className="text-sm font-semibold">{a.proyecto}</h1>
                                    <p className="text-sm text-gray-500">Division: {a.division}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-100 w-full">
                        <div className="bg-white rounded-t-lg border-b-2 border-gray-300">
                            <h1 className="font-semibold text-center p-2">Oportunidad</h1>
                        </div>
                        <div 
                            className="p-2 h-auto" 
                            droppable="true" 
                            onDragOver={(event) => onDragginOver(event)}
                            onDrop={(event) => onDrop(event, 2)}
                        >
                            { getListaProyectos(2).map((o) => (
                                <div key={o.id_proyecto} draggable onDragStart={(event) => onStartDrag(event, o)} className="bg-white p-2 border-2 border-gray-300 rounded-lg mb-3 cursor-pointer">
                                    <h1 className="text-sm font-semibold">{o.proyecto}</h1>
                                    <p className="text-sm text-gray-500">Division: {o.division}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-100 w-full">
                        <div className="bg-white rounded-t-lg border-b-2 border-gray-300">
                            <h1 className="font-semibold text-center p-2">Definicion</h1>
                        </div>
                        <div 
                            className="p-2" 
                            droppable="true" 
                            onDragOver={(event) => onDragginOver(event)}
                            onDrop={(event) => onDrop(event, 3)}
                        >
                            { getListaProyectos(3).map((o) => (
                                <div key={o.id_proyecto} draggable onDragStart={(event) => onStartDrag(event, o)} className="bg-white p-2 border-2 border-gray-300 rounded-lg mb-3 cursor-pointer">
                                    <h1 className="text-sm font-semibold">{o.proyecto}</h1>
                                    <p className="text-sm text-gray-500">Division: {o.division}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-100 w-full">
                        <div className="bg-white rounded-t-lg border-b-2 border-gray-300">
                            <h1 className="font-semibold text-center p-2">Cotizacion</h1>
                        </div>
                        <div 
                            className="p-2" 
                            droppable="true" 
                            onDragOver={(event) => onDragginOver(event)}
                            onDrop={(event) => onDrop(event, 4)}
                        >
                            { getListaProyectos(4).map((o) => (
                                <div key={o.id_proyecto} draggable onDragStart={(event) => onStartDrag(event, o)} className="bg-white p-2 border-2 border-gray-300 rounded-lg mb-3 cursor-pointer">
                                    <h1 className="text-sm font-semibold">{o.proyecto}</h1>
                                    <p className="text-sm text-gray-500">Division: {o.division}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-100 w-full">
                        <div className="bg-white rounded-t-lg border-b-2 border-gray-300">
                            <h1 className="font-semibold text-center p-2">Acuerdo Verbal</h1>
                        </div>
                        <div 
                            className="p-2" 
                            droppable="true" 
                            onDragOver={(event) => onDragginOver(event)}
                            onDrop={(event) => onDrop(event, 5)}
                        >
                            { getListaProyectos(5).map((o) => (
                                <div key={o.id_proyecto} draggable onDragStart={(event) => onStartDrag(event, o)} className="bg-white p-2 border-2 border-gray-300 rounded-lg mb-3 cursor-pointer">
                                    <h1 className="text-sm font-semibold">{o.proyecto}</h1>
                                    <p className="text-sm text-gray-500">Division: {o.division}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    
                    <div className="bg-gray-100 w-full">
                        <div className="bg-white rounded-t-lg border-b-2 border-gray-300">
                            <h1 className="font-semibold text-center p-2">Firma Contrato</h1>
                        </div>
                        <div 
                            className="p-2" 
                            droppable="true" 
                            onDragOver={(event) => onDragginOver(event)}
                            onDrop={(event) => onDrop(event, 6)}
                        >
                            { getListaProyectos(6).map((o) => (
                                <div key={o.id_proyecto} draggable onDragStart={(event) => onStartDrag(event, o)} className="bg-white p-2 border-2 border-gray-300 rounded-lg mb-3 cursor-pointer">
                                    <h1 className="text-sm font-semibold">{o.proyecto}</h1>
                                    <p className="text-sm text-gray-500">Division: {o.division}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    
                    <div className="bg-gray-100 w-full">
                        <div className="bg-white rounded-t-lg border-b-2 border-gray-300">
                            <h1 className="font-semibold text-center p-2">Implementacion</h1>
                        </div>
                        <div 
                            className="p-2" 
                            droppable="true" 
                            onDragOver={(event) => onDragginOver(event)}
                            onDrop={(event) => onDrop(event, 7)}
                        >
                            { getListaProyectos(7).map((o) => (
                                <div key={o.id_proyecto} draggable onDragStart={(event) => onStartDrag(event, o)} className="bg-white p-2 border-2 border-gray-300 rounded-lg mb-3 cursor-pointer">
                                    <h1 className="text-sm font-semibold">{o.proyecto}</h1>
                                    <p className="text-sm text-gray-500">Division: {o.division}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-100 w-full">
                        <div className="bg-white rounded-t-lg border-b-2 border-gray-300">
                            <h1 className="font-semibold text-center p-2">Transicion Operaciones</h1>
                        </div>
                        <div 
                            className="p-2" 
                            droppable="true" 
                            onDragOver={(event) => onDragginOver(event)}
                            onDrop={(event) => onDrop(event, 8)}
                        >
                            { getListaProyectos(8).map((o) => (
                                <div key={o.id_proyecto} draggable onDragStart={(event) => onStartDrag(event, o)} className="bg-white p-2 border-2 border-gray-300 rounded-lg mb-3 cursor-pointer">
                                    <h1 className="text-sm font-semibold">{o.proyecto}</h1>
                                    <p className="text-sm text-gray-500">Division: {o.division}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-100 w-full">
                        <div className="bg-white rounded-t-lg border-b-2 border-gray-300">
                            <h1 className="font-semibold text-center p-2">Suspendida</h1>
                        </div>
                        <div 
                            className="p-2" 
                            droppable="true" 
                            onDragOver={(event) => onDragginOver(event)}
                            onDrop={(event) => onDrop(event, 9)}
                        >
                            { getListaProyectos(9).map((o) => (
                                <div key={o.id_proyecto} draggable onDragStart={(event) => onStartDrag(event, o)} className="bg-white p-2 border-2 border-gray-300 rounded-lg mb-3 cursor-pointer">
                                    <h1 className="text-sm font-semibold">{o.proyecto}</h1>
                                    <p className="text-sm text-gray-500">Division: {o.division}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-100 w-full">
                        <div className="bg-white rounded-t-lg border-b-2 border-gray-300">
                            <h1 className="font-semibold text-center p-2">Cancelada</h1>
                        </div>
                        <div 
                            className="p-2" 
                            droppable="true" 
                            onDragOver={(event) => onDragginOver(event)}
                            onDrop={(event) => onDrop(event, 10)}
                        >
                            { getListaProyectos(10).map((o) => (
                                <div key={o.id_proyecto} draggable onDragStart={(event) => onStartDrag(event, o)} className="bg-white p-2 border-2 border-gray-300 rounded-lg mb-3 cursor-pointer">
                                    <h1 className="text-sm font-semibold">{o.proyecto}</h1>
                                    <p className="text-sm text-gray-500">Division: {o.division}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fases