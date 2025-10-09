import { useEffect, useState } from "react";
import FormBajaResponsiva from "../Forms/FormBajaResponsiva"
import { toast } from "react-toastify";

//AXIOS
import axios from '../../../../axios/axios.config'
import LoadingDiv from "../../../UI/LoadingDiv";

const ModalBajaResponsiva = ({ setModalBajaResponsiva, seleccionResponsiva, setResponsivas, setResponsivasPagination }) => {

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
        onObtenerResponsiva()
    }, [seleccionResponsiva])

    return (
        <div>
            <input type="checkbox" id="modal_baja_responsiva" className="modal-toggle" />
                <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <button onClick={() => setModalBajaResponsiva(false)} className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">
                        ✕
                    </button>
                    <h3 className="font-bold text-lg">Remover Responsiva</h3>
                    <div className="divider"></div>
                    { loading
                        ? <LoadingDiv>Cargando Responsiva</LoadingDiv>
                        : Object.keys(responsiva).length > 0 && (
                            <FormBajaResponsiva
                                seleccionResponsiva={seleccionResponsiva}
                                setResponsivas={setResponsivas}
                                setResponsivasPagination={setResponsivasPagination}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalBajaResponsiva