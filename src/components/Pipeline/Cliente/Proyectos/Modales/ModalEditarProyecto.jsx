import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import LoadingDiv from '../../../../UI/LoadingDiv'
import axios from '../../../../../axios/axios.config';
import FormEditarProyecto from '../Forms/FormEditarProyecto';

const ModalEditarProyecto = ({proyecto, setModalEditarProyecto, setProyectos, setProyectosPagination}) => {

    const [ loading, setLoading ] = useState(false);
    const [ infoProyecto, setinfoProyecto ] = useState({})

    useEffect(() => {
        const onObtenerProyecto = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/pipeline/proyectos/${proyecto}`);
                setinfoProyecto(data.proyecto)
            } catch (error) {
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
                setLoading(false)
            }
            setLoading(false)
        }
        onObtenerProyecto()
    }, [proyecto])

    return (
        <div>
            <input type="checkbox" id="modal_editar_proyecto" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Nuevo Proyecto</h3>
                    
                    { loading
                        ? <LoadingDiv>Buscando Proyecto</LoadingDiv> 
                        : (
                            <FormEditarProyecto
                                infoProyecto={infoProyecto}
                                setProyectos={setProyectos}
                                setProyectosPagination={setProyectosPagination}
                            />
                        )
                    }

                    <div className="modal-action">
                        <label onClick={() => setModalEditarProyecto(false)} htmlFor="modal_editar_proyecto" className="btn btn-error text-white btn-sm">Cancelar Edicion</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditarProyecto