import { useState } from "react"
import { AiTwotoneSetting } from "react-icons/ai";

//Components
import TablaContactos from "./TablaContactos";
import ModalNuevoContacto from "./Modales/ModalNuevoContacto";

const Contactos = () => {

    const [ modalNuevoContacto, setModalNuevoContacto ] = useState(false)

    const [ contactos, setContactos ] = useState([]);
    const [ contactosPagination, setContactosPagination ] = useState([]);

    return (
        <div>
            { modalNuevoContacto && (
                <ModalNuevoContacto
                    setModalNuevoContacto={setModalNuevoContacto}
                    setContactos={setContactos}
                    setContactosPagination={setContactosPagination}
                />
            )}
            <div className="bg-white flex justify-between p-3 border-b-2 rounded-t-lg border-gray-300">
                <div className="w-full flex justify-between">
                    <div className="flex">
                        <span className="font-semibold">Lista Contactos</span>
                        <AiTwotoneSetting className="text-2xl ml-2 hover:animate-spin" />
                    </div>
                    <label htmlFor="modal_nuevo_contacto"  onClick={() => setModalNuevoContacto(true)} className="btn btn-sm btn-secondary cursor-pointer">Nuevo Contacto</label>
                </div>
            </div>
            <div className="grid grid-rows-1">
                <div className="grid grid-cols-1">

                    <div className="card">
                        <div className="card-body px-5 py-3 bg-gray-100 rounded-b-lg">
                            <TablaContactos
                                contactos={contactos}
                                setContactos={setContactos}
                                contactosPagination={contactosPagination}
                                setContactosPagination={setContactosPagination}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Contactos