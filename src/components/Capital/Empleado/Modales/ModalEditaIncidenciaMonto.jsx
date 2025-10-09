import { useEffect, useState } from "react"
import LoadingDiv from "../../../UI/LoadingDiv";

//APIS
import axios from '../../../../axios/axios.config'
import FormEditaIncidenciaMonto from "../Forms/FormEditaIncidenciaMonto";

const ModalEditaIncidenciaMonto = ({ seleccionIncidenciaMonto, setModalIncidenciaMonto, setIncidencias, setIncidenciasPagination }) => {

    const [ loading, setLoading ] = useState(true);
    const [ incidencia, setIncidencia ] = useState({})

    useEffect(() => {
        const onObtenerIncidenciaMonto = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/capital/incidencias/monto/${seleccionIncidenciaMonto}`);
                setIncidencia(data.incidencia)
            } catch (error) {
                setLoading(false)
                console.log(error)   
            }
            setLoading(false)
        }
        onObtenerIncidenciaMonto()
    }, [seleccionIncidenciaMonto])

    return (
        <div>
            <input type="checkbox" id="modal_edita_incidencia_monto" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Editar Incidencia Monto</h3>
                    <div className="divider"></div>
                    { loading
                        ? <LoadingDiv>Cargando Registro</LoadingDiv>
                        : (
                            <FormEditaIncidenciaMonto
                                incidencia={incidencia}
                                setIncidencias={setIncidencias}
                                setIncidenciasPagination={setIncidenciasPagination}
                            />
                        )
                    }
                    <div className="modal-action">
                        <label htmlFor="modal_edita_incidencia_monto" onClick={() => setModalIncidenciaMonto(false)} className="btn btn-sm btn-accent">Cancelar</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditaIncidenciaMonto