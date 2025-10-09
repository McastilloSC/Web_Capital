import FormNuevoContacto from '../Forms/FormNuevoContacto'

const ModalNuevoContacto = ({ setModalNuevoContacto, setContactos, setContactosPagination }) => {
    return (
        <div>
            <input type="checkbox" id="modal_nuevo_contacto" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Nuevo Contacto</h3>
                    <div className="divider"></div>
                    {<FormNuevoContacto 
                        setContactos={setContactos}
                        setContactosPagination={setContactosPagination}
                    />}
                    <div className="modal-action">
                        <label onClick={() => setModalNuevoContacto(false)} htmlFor="modal_nuevo_contacto" className="btn btn-sm btn-error text-white">Cancelar</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalNuevoContacto