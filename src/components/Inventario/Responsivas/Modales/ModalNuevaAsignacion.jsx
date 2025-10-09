import FormNuevaResponsiva from '../Forms/FormNuevaResponsiva';

const ModalNuevaAsignacion = ({ setModalAsignacion, setResponsivas, setResponsivasPagination }) => {
    return (  
        <div>
            <input type="checkbox" id="modal_asigignacion" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <button onClick={() => setModalAsignacion(false)} className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">
                        ✕
                    </button>
                    <h3 className="font-bold text-lg">Nueva Asignacion</h3>
                    <div className="divider"></div>
                    <FormNuevaResponsiva 
                        setResponsivas={setResponsivas}
                        setResponsivasPagination={setResponsivasPagination}
                    />
                </div>
            </div>
        </div>
    ) 
}

export default ModalNuevaAsignacion 