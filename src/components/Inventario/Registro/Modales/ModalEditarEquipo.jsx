import { useEffect, useState } from "react"

//APIS
import axios from '../../../../axios/axios.config'
import LoadingDiv from "../../../UI/LoadingDiv";
import FormEditarEquipo from "../Forms/FormEditarEquipo";

const ModalEditarEquipo = ({ setModalEditarEquipo, seleccionEquipo, setEquipos, setEquiposPagination }) => {

    seleccionEquipo
    
    const [ equipo, setEquipo ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const onObtenerImagenes = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/inventario/equipos/${seleccionEquipo}`)
                setEquipo(data.equipo)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
            setLoading(false)
        }
        onObtenerImagenes()
    }, [seleccionEquipo])

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="modal_editar_equipo" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <button onClick={() => setModalEditarEquipo(false)} className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">
                        ✕
                    </button>
                    <h3 className="font-bold text-lg">Editar Equipo</h3>
                    <div className="divider"></div>
                    { loading
                        ? <LoadingDiv>Cargando Imagenes</LoadingDiv> 
                        : (
                            <FormEditarEquipo
                                equipo={equipo}
                                setEquipos={setEquipos}
                                setEquiposPagination={setEquiposPagination}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalEditarEquipo