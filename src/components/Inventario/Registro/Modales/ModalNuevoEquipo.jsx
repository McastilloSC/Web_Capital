import FormNuevoEquipo from "../Forms/FormNuevoEquipo"

const ModalNuevoEquipo = ({ setNuevoEquipo, setEquipos, setEquiposPagination }) => {
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="modal_nuevo_equipo" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <button onClick={() => setNuevoEquipo(false)} className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">
                        ✕
                    </button>
                    <h3 className="font-bold text-lg">Nuevo Equipo</h3>
                    <div className="divider"></div>
                    <FormNuevoEquipo
                          setEquipos={setEquipos}
                          setEquiposPagination={setEquiposPagination}
                    />
                </div>
            </div>
        </div>
    )
}

export default ModalNuevoEquipo