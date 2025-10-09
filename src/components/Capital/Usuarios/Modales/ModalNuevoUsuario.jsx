import FormNuevoUsuario from "../Forms/FormNuevoUsuario"

const ModalNuevoUsuario = ({ setModalNuevoUsuario, setUsuarios, setUsuariosPagination }) => {
    return (
        <div>
            <input type="checkbox" id="capital_modal_nuevo_usuario" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Nuevo Usuario</h3>
                    <FormNuevoUsuario
                        setUsuarios={setUsuarios}
                        setUsuariosPagination={setUsuariosPagination}
                    />
                    <div className="modal-action">
                        <label htmlFor="capital_modal_nuevo_usuario" onClick={() => setModalNuevoUsuario(false)} className="btn btn-sm btn-accent">Cancelar</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalNuevoUsuario