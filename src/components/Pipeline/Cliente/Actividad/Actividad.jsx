import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { AiOutlineLineChart } from "react-icons/ai";

//APIS
import axios from '../../../../axios/axios.config'

const Actividad = () => {

    const { idCliente } = useParams();

    const [ movimientos, setMovimientos ] = useState([])

    useEffect(() => {
        const onObtenerMovimientos = async () => {
            try {
                const { data } = await axios.get(`/pipeline/movimientos/${idCliente}`);
                setMovimientos(data.movimientos);
            } catch (error) {
                console.log(error)
            }
        }
        onObtenerMovimientos()
    }, [])

    return (
        <div>
            <div className="grid grid-rows-1">
                <div className="grid grid-cols-12">
                    <div className="col-span-4 bg-white rounded-lg border-2 border-gray-300">
                        <div className="bg-white flex p-3 border-b-2 rounded-t-lg border-gray-300">
                            <h1 className="font-semibold">Ultima Actividad</h1>
                            <AiOutlineLineChart className="text-2xl font-semibold ml-3"/>
                        </div>
                        <div className="bg-white p-2 rounded-b-lg">
                            <div className="h-96 overflow-y-auto">
                                { movimientos.map((movimiento) => (
                                    <div key={movimiento.id_movimiento} className="bg-gray-100 p-4">
                                        <h1 className="font-bold text-xs"><span className="text-blue-500 font-semibold">{movimiento.tipo_movimiento}</span> - {movimiento.proceso}</h1>
                                        <p className="font-semibold text-xs text-gray-500">{movimiento.usuario} - Fecha: {movimiento.fecha_registro}</p>
                                    </div>
                                ))}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Actividad