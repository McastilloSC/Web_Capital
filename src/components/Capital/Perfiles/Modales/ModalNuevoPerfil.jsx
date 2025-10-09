import FormNuevoPerfil from "../Forms/FormNuevoPerfil"
import { BsXLg  } from "react-icons/bs";

const ModalNuevoPerfil = ({ setModalNuevoPerfil, setPerfiles, setPerfilesPagination }) => {
    return (
        <div>
            <input type="checkbox" id="modal_nuevo_perfil" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg">Nuevo Perfil</h3>
                        <label htmlFor="modal_edita_perfil" onClick={() => setModalNuevoPerfil(false)} className="hover:text-red-500 cursor-pointer">
                            <BsXLg  className="text-2xl"/> 
                        </label>
                    </div>
                    <FormNuevoPerfil 
                        setPerfiles={setPerfiles}
                        setPerfilesPagination={setPerfilesPagination}
                    />
                </div>
            </div>
        </div>
    )
}

export default ModalNuevoPerfil