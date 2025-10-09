import { useEffect, useState } from "react";
import LoadingDiv from "../../../UI/LoadingDiv";

//APIS
import axios from '../../../../axios/axios.config'
import FormEditaIncidenciaGeneral from "../Forms/FormEditaIncidenciaGeneral";

const ModalEditaIncidenciaGeneral = ({ seleccionIncidenciaGeneral, setModalIncidenciaGeneral, setIncidencias, setIncidenciasPagination }) => {

    const [ loading, setLoading ] = useState(true);
    const [ incidencia, setIncidencia ] = useState({})

    useEffect(() => {
        const onObtenerIncidenciaGeneral = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/capital/incidencias/general/${seleccionIncidenciaGeneral}`);
                setIncidencia(data.incidencia)
            } catch (error) {
                setLoading(false)
                console.log(error)   
            }
            setLoading(false)
        }
        onObtenerIncidenciaGeneral()
    }, [seleccionIncidenciaGeneral])

    return (
        <div>
            <input type="checkbox" id="modal_edita_incidencia_general" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Editar Incidencia General</h3>
                    <div className="divider"></div>
                    { loading
                        ? <LoadingDiv>Cargando Registro</LoadingDiv>
                        : ( 
                            <FormEditaIncidenciaGeneral
                                incidencia={incidencia}
                                setIncidencias={setIncidencias}
                                setIncidenciasPagination={setIncidenciasPagination}
                            />
                        )
                    }
                    <div className="modal-action">
                        <label htmlFor="modal_edita_incidencia_general" onClick={() => setModalIncidenciaGeneral(false)} className="btn btn-sm btn-accent">Cancelar</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditaIncidenciaGeneral