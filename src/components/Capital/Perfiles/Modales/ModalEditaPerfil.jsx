import { useEffect, useState } from "react"
import FormEditaPerfil from "../Forms/FormEditaPerfil"
import { BsXLg  } from "react-icons/bs";

//APIS
import axios from '../../../../axios/axios.config'
import LoadingDiv from "../../../UI/LoadingDiv"

const ModalEditaPerfil = ({ perfil, setModalEditaPerfil, setPerfiles, setPerfilesPagination }) => {
    
    const [ loading, setLoading ] = useState(false)
    const [ perfilInfo, setPerfilInfo ] = useState({})

    useEffect(() => {
        const onObtenerPerfil = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/capital/perfiles/${perfil}`)
                setPerfilInfo(data.perfil)
            } catch (error) {
                setLoading(true)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerPerfil()
    }, [perfil])
    
    return (
        <div>
            <input type="checkbox" id="modal_edita_perfil" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg">Editar Perfil</h3>
                        <label htmlFor="modal_edita_perfil" onClick={() => setModalEditaPerfil(false)} className="hover:text-red-500 cursor-pointer">
                            <BsXLg  className="text-2xl"/> 
                        </label>
                    </div>
                    { loading
                        ? <LoadingDiv>Cargando Perfil</LoadingDiv>
                        : (
                            <FormEditaPerfil 
                                perfilInfo={perfilInfo}
                                setPerfiles={setPerfiles}
                                setPerfilesPagination={setPerfilesPagination}
                            />
                       )
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalEditaPerfil