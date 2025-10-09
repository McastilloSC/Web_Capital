import FormNuevoProyecto from '../Forms/FormNuevoProyecto'

const ModalNuevoProyecto = ({ setModalNuevoProyecto, setProyectos, setProyectosPagination }) => {
    return (
        <div>
            <input type="checkbox" id="modal_nuevo_proyecto" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Nuevo Proyecto</h3>
                    
                    <FormNuevoProyecto
                        setProyectos={setProyectos}
                        setProyectosPagination={setProyectosPagination}
                    />

                    <div className="modal-action">
                        <label onClick={() => setModalNuevoProyecto(false)} htmlFor="modal_nuevo_proyecto" className="btn btn-error text-white btn-sm">Cancelar Registro</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalNuevoProyecto