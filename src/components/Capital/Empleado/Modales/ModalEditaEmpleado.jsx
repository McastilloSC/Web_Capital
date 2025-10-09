import { useEffect, useState }  from 'react'
import { useParams } from 'react-router-dom'
import { BsXLg  } from 'react-icons/bs'

//Components
import FormEditaEmpleado from '../Forms/FormEditaEmpleado'

//APIS
import axios from '../../../../axios/axios.config'
import LoadingDiv from '../../../UI/LoadingDiv'

const ModalEditaEmpleado = ({ setModalEditaEmpleado, setEmpleado }) => {
    
    const { idEmpleado } = useParams();

    const [ empleadoInfo, setEmpleadoInfo ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const onObtenerEmpleado = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/capital/empleado/${idEmpleado}`);
                setEmpleadoInfo(data.empleado)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerEmpleado()
    }, [])
    
    return (
        <div>
            <input type="checkbox" id="modal_edita_empleado" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-12/12 max-w-7xl">
                    <div className='flex justify-between'>
                        <h3 className="font-bold text-lg mb-2">Editar Empleado</h3>
                        <label htmlFor="modal_edita_empleado" onClick={() => setModalEditaEmpleado(false)} className="btn btn-sm btn-accent">
                            <BsXLg className='text-xl'/>
                        </label>
                    </div>
                    { loading
                        ? <LoadingDiv>Cargando Empleado</LoadingDiv>
                        : (
                            <FormEditaEmpleado 
                                empleadoInfo={empleadoInfo}
                                setEmpleado={setEmpleado}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalEditaEmpleado