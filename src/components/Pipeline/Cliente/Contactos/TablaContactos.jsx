import { useEffect, useState } from "react"
import LoadingDiv from "../../../UI/LoadingDiv";
import axios from "../../../../axios/axios.config";
import { useParams } from "react-router-dom";
import ModalEditaContacto from "./Modales/ModalEditaContacto";

const TablaContactos = ({ contactos, setContactos, contactosPagination, setContactosPagination }) => {    

    const { idCliente } = useParams();

    //Query Statues
    const [ urlPagination, setUrlPagination ] = useState();
    const [ inputNombre, setInputNombre ] = useState('');
    const [ numeroFilas, setNumeroFilas ] = useState(5);

    const [ loading, setLoading ] = useState(false);
    const [ modalEditaContacto, setModalEditaContacto ] = useState(false)
    const [ contacto, setContacto ] = useState()

    useEffect(() => {
        const onObtenerContactos = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(urlPagination ? urlPagination : `/pipeline/contactos/${idCliente}`, {
                    params:{
                        'nombre': inputNombre,
                        'filas': numeroFilas
                    }
                })
                setContactos(data.contactos.data)
                setContactosPagination(data.contactos.links)
            } catch (error) {
                setLoading(false);
                console.log(error)
            }
            setLoading(false);
        }
        onObtenerContactos()
    }, [setContactos, setContactosPagination, idCliente, urlPagination, inputNombre, numeroFilas])

    return (
        <div>
            { modalEditaContacto && (
                <ModalEditaContacto 
                    contacto={contacto}
                    setModalEditaContacto={setModalEditaContacto}
                    setContactos={setContactos}
                    setContactosPagination={setContactosPagination}
                />
            )}

            <div className="flex space-x-5 mb-4">
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Buscar por Nombre</span>
                    </label>
                    <input type="text" onChange={(e) => setInputNombre(e.target.value)} value={inputNombre} placeholder="...." className="input input-sm border-2 border-gray-300 input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-44">
                    <label className="label">
                        <span className="label-text">Filas</span>
                    </label>
                    <select onChange={(e) => setNumeroFilas(e.target.value)} value={numeroFilas} className="select select-sm border-2 border-gray-300 select-bordered w-full max-w-xs">
                        <option value={5}>5 Filas</option>
                        <option value={10}>10 Filas</option>
                        <option value={15}>15 Filas</option>
                        <option value={30}>30 Filas</option>
                        <option value={50}>50 Filas</option>
                    </select>
                </div>
            </div>

            { loading
                ? <LoadingDiv>Cargando Contactos</LoadingDiv>
                : (
                    <table className="table table-sm table-zebra">
                        <thead>
                            <tr>
                                <th className="bg-gray-200 text-gray-700">Nombre Completo</th>
                                <th className="bg-gray-200 text-gray-700">Puesto</th>
                                <th className="bg-gray-200 text-gray-700">Contacto</th>
                                <th className="bg-gray-200 text-gray-700">Comentarios</th>
                                <th className="bg-gray-200 text-gray-700">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            { contactos.map((contacto) => (
                                <tr key={contacto.id_contacto}>
                                    <td>{contacto.nombre}</td>
                                    <td>{contacto.puesto}</td>
                                    <td>
                                        <h1>Telefono: {contacto.telefono}</h1>
                                        <p>Email: <span className="font-semibold">{contacto.email}</span></p>
                                    </td>
                                    <td>{contacto.observaciones}</td>
                                    <td>
                                        <div className="flex justify-evenly">
                                            <label htmlFor="modal_edita_contacto" onClick={() => [ setModalEditaContacto(true), setContacto(contacto.id_contacto) ]} className="font-semibold text-xs cursor-pointer">Editar</label>
                                            <button className="font-semibold text-xs">Eliminar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }

            { !loading && (
                <div className="join mt-2">
                    { contactosPagination.map((link) => (
                        //console.log(link)
                        link.url && <button onClick={() => setUrlPagination(link.url)} key={link.label} className={`join-item btn ${link.active && 'btn-active'}`}>{link.label}</button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TablaContactos