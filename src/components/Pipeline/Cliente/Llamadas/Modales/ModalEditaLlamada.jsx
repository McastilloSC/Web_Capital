import { useEffect, useState } from 'react'
import FormEditaLlamada from '../Forms/FormEditaLlamada'

//APIS
import axios from '../../../../../axios/axios.config'
import LoadingDiv from '../../../../UI/LoadingDiv'

const ModalEditaLlamada = ({ setModalEditaLlamada, llamada, setLlamadas, setLlamadasPagination }) => {

    const [ loading, setLoading ] = useState(false)
    const [ infoLlamada, setInfoLlamada ] = useState({});

    useEffect(() => {
        const onObtenerLlamada = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/pipeline/llamadas/${llamada}`)
                setInfoLlamada(data.llamada)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerLlamada()
    }, [])

    return (
        <div>
            <input type="checkbox" id="modal_edita_llamada" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Editar Llamada</h3>
                    <div className='divider'></div>
                    { loading
                        ? <LoadingDiv>Cargando Llamada</LoadingDiv>
                        : (
                            <FormEditaLlamada
                                infoLlamada={infoLlamada}
                                setLlamadas={setLlamadas}
                                setLlamadasPagination={setLlamadasPagination}
                            />
                        ) 
                    }
                    <div className="modal-action">
                        <label onClick={() => setModalEditaLlamada(false)} htmlFor="modal_edita_llamada" className="btn btn-sm btn-error text-white">Cancelar</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditaLlamada