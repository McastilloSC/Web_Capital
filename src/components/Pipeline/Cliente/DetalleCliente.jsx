import { useEffect, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { useParams } from 'react-router-dom'

//APIS
import axios from '../../../axios/axios.config'
import FormEditaCliente from "./FormEditaCliente";
import LoadingDiv from "../../UI/LoadingDiv";

const DetalleCliente = () => {
    
    const { idCliente } = useParams()

    const [ loading, setLoading ] = useState(false)
    const [ cliente, setCliente ] = useState({})

    useEffect(() => {
        const onbtenerCliente = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/pipeline/clientes/${idCliente}`);
                setCliente(data.cliente)
            } catch (error) {
                setLoading(false);
                console.log(error)
            }
            setLoading(false);
        }
        onbtenerCliente();
    }, [])
    
    return (
        <div>
            <div className="bg-white flex justify-between p-3 border-b-2 rounded-t-lg border-gray-300">
                <div className="flex">
                    <span className="font-semibold">Editar Informacion</span>
                    <AiTwotoneSetting className="text-2xl ml-2 hover:animate-spin" />
                </div>
            </div>
            <div className="grid grid-rows-1">
                <div className="grid grid-cols-1">
                    <div className="card">
                        <div className="card-body p-3 bg-gray-50 rounded-lg">
                            { loading
                                ? <LoadingDiv>Cargando Datos</LoadingDiv>
                                : (
                                    <FormEditaCliente 
                                        cliente={cliente}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalleCliente