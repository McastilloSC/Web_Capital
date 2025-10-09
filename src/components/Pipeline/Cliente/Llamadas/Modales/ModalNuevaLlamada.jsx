import FormNuevaLlamada from "../Forms/FormNuevaLlamada"

const MoldalNuevaLlamada = ({ setModalNuevaLlamada, setLlamadas, setLlamadasPagination }) => {
    return (
        <div>
            <input type="checkbox" id="modal_nueva_llamada" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Nueva Llamada</h3>
                    <div className="divider"></div>
                    <FormNuevaLlamada 
                        setLlamadas={setLlamadas}
                        setLlamadasPagination={setLlamadasPagination}
                    />
                    <div className="modal-action">
                        <label onClick={() => setModalNuevaLlamada(false)} htmlFor="modal_nueva_llamada" className="btn btn-sm btn-error text-white">Cancelar</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoldalNuevaLlamada