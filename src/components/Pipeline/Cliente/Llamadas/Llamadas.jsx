import { useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";

//Components
import MoldalNuevaLlamada from "./Modales/ModalNuevaLlamada";
import TablaLlamadas from "./TablaLlamadas";

const Llamadas = () => {

    const [ llamadas, setLlamadas ] = useState([])
    const [ llamadasPagination, setLlamadasPagination ] = useState([]);
    const [ modalNuevaLlamada, setModalNuevaLlamada ] = useState(false)

    return (
        <div>

            { modalNuevaLlamada && (
                <MoldalNuevaLlamada
                    setModalNuevaLlamada={setModalNuevaLlamada}
                    setLlamadas={setLlamadas}
                    setLlamadasPagination={setLlamadasPagination}
                />
            )}



            <div className="bg-white flex justify-between p-3 border-b-2 rounded-t-lg border-gray-300">
                <div className="w-full flex justify-between">
                    <div className="flex">
                        <span className="font-semibold">Bitacora Llamadas</span>
                        <AiTwotoneSetting className="text-2xl ml-2 hover:animate-spin" />
                    </div>
                    <label htmlFor="modal_nueva_llamada" onClick={() => setModalNuevaLlamada(true)} className="btn btn-sm btn-secondary cursor-pointer">Nueva Llamada</label>
                </div>
            </div>
            <div className="grid grid-rows-1">
                <div className="grid grid-cols-1">

                    <div className="card">
                        <div className="card-body px-5 py-3 bg-gray-100 rounded-b-lg">
                            <TablaLlamadas
                                llamadas={llamadas}
                                setLlamadas={setLlamadas}
                                llamadasPagination={llamadasPagination}
                                setLlamadasPagination={setLlamadasPagination}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Llamadas