import { useEffect, useState } from "react"

//APIS
import axios from '../../../../axios/axios.config'
import LoadingDiv from "../../../UI/LoadingDiv"
import FormEditarUsuario from "../Forms/FormEditarUsuario"

const ModalEditaUsuario = ({ setModalEditaUsuario, setUsuarios, setUsuariosPagination, usuario }) => {
    
    const [ loading, setLoading ] = useState(false)
    const [ userInfo, setUserInfo ] = useState({})

    useEffect(() => {
        const onObtenerUsuario = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/capital/usuarios/${usuario}`)
                setUserInfo(data.usuario)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerUsuario()
    }, [usuario])
    
    return (
        <div>
            <input type="checkbox" id="capital_modal_edita_usuario" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Editar Usuario</h3>
                    <div className="divider"></div>
                    { loading
                        ? <LoadingDiv>Cargando Usuario</LoadingDiv>
                        : (
                            <FormEditarUsuario
                                userInfo={userInfo}
                                setUsuarios={setUsuarios} 
                                setUsuariosPagination={setUsuariosPagination}
                                setModalEditaUsuario={setModalEditaUsuario}
                            />
                        )
                    }
                    <div className="modal-action">
                        <label htmlFor="capital_modal_edita_usuario" onClick={() => setModalEditaUsuario(false)} className="btn btn-sm btn-accent">Cancelar</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditaUsuario