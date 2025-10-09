import { useEffect, useState } from 'react';
import FormEditarResponsiva from '../Forms/FormEditarResponsiva';

//APIS
import axios from '../../../../axios/axios.config'
import LoadingDiv from '../../../UI/LoadingDiv';

const ModalEditarResponsiva = ({ setModalEditarResponsiva, setResponsivas, setResponsivasPagination, seleccionResponsiva }) => {
    
    const [ loading, setLoading ] = useState(false);
    const [ responsiva, setResponsiva ] = useState({})

    useEffect(() => {
        const onObtenerResponsiva = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/inventario/responsivas/${seleccionResponsiva}`);
                setResponsiva(data.responsiva)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerResponsiva()
    }, [seleccionResponsiva])
    
    return (  
        <div>
            <input type="checkbox" id="modal_editar_responsiva" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <button onClick={() => setModalEditarResponsiva(false)} className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">
                        ✕
                    </button>
                    <h3 className="font-bold text-lg">Editar Responsiva</h3>
                    <div className="divider"></div>
                    { loading
                        ? <LoadingDiv>Cargando Responsiva</LoadingDiv>
                        : (
                            <FormEditarResponsiva 
                                setResponsivas={setResponsivas}
                                setResponsivasPagination={setResponsivasPagination}
                                responsiva={responsiva}
                            />
                        ) 
                    }
                </div>
            </div>
        </div>
    ) 
}

export default ModalEditarResponsiva 