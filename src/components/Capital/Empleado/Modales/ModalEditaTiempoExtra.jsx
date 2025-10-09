import { useEffect, useState } from 'react'
import FormEditarTiempoExtra from '../Forms/FormEditarTiempoExtra'
import LoadingDiv from '../../../UI/LoadingDiv';

//APIS
import axios from '../../../../axios/axios.config'

const ModalEditaTiempoExtra = ({ setModalEditaTiempoExtra, seleccionTiempo, setTiempoExtra, setTiempoExtraPagination }) => {

    const [ loading, setLoading ] = useState(true);
    const [ tiempoExtraInfo, setTiempoExtraInfo ] = useState({});

    useEffect(() => {
        const onObtenerTiempoExtra = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/capital/tiempo_extra/detalle/${seleccionTiempo}`)
                setTiempoExtraInfo(data.tiempo_extra)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
            setLoading(false)
        }
        onObtenerTiempoExtra()
    }, [seleccionTiempo])

    return (
        <div>
            <input type="checkbox" id="modal_edita_tiempo_extra" className="modal-toggle" />
                <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Editar Tiempo Extra {seleccionTiempo}</h3>
                    <div className='divider'></div>
                    { loading
                        ? <LoadingDiv>Cargando Registro</LoadingDiv>
                        : (
                            <FormEditarTiempoExtra
                                tiempoExtraInfo={tiempoExtraInfo}
                                setTiempoExtra={setTiempoExtra}
                                setTiempoExtraPagination={setTiempoExtraPagination}
                            />
                        ) 
                    }
                    <div className="modal-action">
                        <label htmlFor="modal_edita_tiempo_extra" onClick={() => setModalEditaTiempoExtra(false)} className="btn btn-sm btn-accent">Cancelar</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditaTiempoExtra