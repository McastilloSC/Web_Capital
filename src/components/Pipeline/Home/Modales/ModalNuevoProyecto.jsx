import FormNuevoProyecto from "../Forms/FormNuevoProyecto"

const ModalNuevoProyecto = ({ setNuevoProyecto, setProyectos, setProyectosPagination }) => {
    return (
        <div className="modal" id="modal_nuevo_proyecto">
            <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg">Nuevo Proyecto</h3>
                    <FormNuevoProyecto 
                        setProyectos={setProyectos}
                        setProyectosPagination={setProyectosPagination}
                    />
                <div className="modal-action">
                    <button className="btn btn-sm btn-error" onClick={() => setNuevoProyecto(false)}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalNuevoProyecto