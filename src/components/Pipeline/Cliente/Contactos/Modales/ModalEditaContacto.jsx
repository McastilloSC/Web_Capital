import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

//APIS
import axios from '../../../../../axios/axios.config'
import LoadingDiv from '../../../../UI/LoadingDiv';
import FormEditaContacto from '../Forms/FormEditaContacto';

const ModalEditaContacto = ({ contacto, setModalEditaContacto, setContactos, setContactosPagination }) => {

    const [ contactoInfo, setContactoInfo ] = useState({});
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        const onObtenerContacto = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/pipeline/contactos/contacto/${contacto}`)
                setContactoInfo(data.contacto)
            } catch (error) {
                setLoading(false)
                toast(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            setLoading(false)
        }
        onObtenerContacto()
    }, [])

    return (  
        <div>
            <input type="checkbox" id="modal_edita_contacto" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Editar Contacto</h3>
                    <div className="divider"></div>
                    { loading
                        ? <LoadingDiv>Cargando Contacto</LoadingDiv>
                        : (
                            <FormEditaContacto
                                contactoInfo={contactoInfo}
                                setContactos={setContactos}
                                setContactosPagination={setContactosPagination}
                            />
                        )
                    }
                    <div className="modal-action">
                        <label onClick={() => setModalEditaContacto(false)} htmlFor="modal_edita_contacto" className="btn btn-sm btn-error text-white">Cancelar</label>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default ModalEditaContacto   