import { useState, useEffect } from 'react';
import axios from '../../../axios/axios.config';
import { toast } from 'react-toastify';
import FormContactoEmergencia from './Forms/FormContactoEmergencia';
import ModalContactoEmergencia from './Modales/ModalContactoEmergencia';

const ContactosEmergencia = ({ empleadoId }) => {
    const [contactos, setContactos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [contactoEdit, setContactoEdit] = useState(null);
    const [mostrarModalContactoEmergencia, setMostrarModalContactoEmergencia] = useState(false);

    useEffect(() => {
        if (empleadoId) {
            cargarContactos();
        }
    }, [empleadoId]); // <-- solo se dispara cuando empleadoId existe

    const cargarContactos = async () => {
        try {
            const { data } = await axios.get(`/capital/empleados/${empleadoId}/contactos_emergencia`);
            setContactos(data);
        } catch (error) {
            console.error(error);
            toast.error('Error al cargar contactos');
        }
    };

    const handleEditar = (contacto) => {
        setContactoEdit({
            id: contacto.id_contacto,
            nombre: contacto.nombre_contacto, 
            parentesco: contacto.parentesco,
            telefono: contacto.telefono,
        });
    setMostrarModalContactoEmergencia(true);
    };

    const handleAgregar = () => {
        setContactoEdit(null);
        setMostrarModalContactoEmergencia(true);
    };

    const handleEliminar = async (id) => {
        if (confirm("¿Seguro que deseas eliminar este contacto?")) {
            try {
                await axios.delete(`/capital/empleados/${empleadoId}/contactos_emergencia/${id}`);
                toast.success('Contacto eliminado');
                cargarContactos();
            } catch (error) {
                toast.error('Error al eliminar contacto');
            }
        }
    };

    return (
        <div className="card mt-5">
            <div className="p-3 rounded-t-lg bg-white flex justify-between items-center">
                <h1 className="font-semibold">Contactos de Emergencia</h1>                
                {/* <button onClick={() => {setContactoEdit(null); setMostrarModalContactoEmergencia(true); }} className="btn btn-primary btn-sm">+ Agregar</button> */}
                <button onClick={handleAgregar} className="btn btn-primary btn-sm">Agregar Contacto</button>

            </div>

            <div className="card-body p-4 bg-white rounded-b-lg">
                <table className="table table-zebra table-sm text-center">
                    <thead className="bg-gray-900 text-gray-100">
                        <tr>
                            <th>Nombre</th>
                            <th>Parentesco</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactos.map(c => (
                            <tr key={c.id_contacto}>
                                <td>{c.nombre_contacto}</td>
                                <td>{c.parentesco}</td>
                                <td>{c.telefono}</td>
                                <td className="space-x-2">
                                    <button onClick={() => handleEditar(c)} className="btn btn-xs btn-warning">Editar</button>
                                    <button onClick={() => handleEliminar(c.id_contacto)} className="btn btn-xs btn-error">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {contactos.length === 0 && (
                            <tr><td colSpan="4" className="text-center text-gray-400">No hay contactos registrados</td></tr>
                        )}
                    </tbody>
                </table>

                {mostrarFormulario && (
                    <div className="mt-4">
                        <FormContactoEmergencia
                            seleccionEmpleado={empleadoId}
                            contactoEdit={contactoEdit}
                            onClose={() => {
                                setMostrarFormulario(false);
                                cargarContactos();
                            }}
                        />
                    </div>
                )}
            </div>

            {mostrarModalContactoEmergencia && (
            <ModalContactoEmergencia
                setModalContactoEmergencia={setMostrarModalContactoEmergencia}
                seleccionEmpleado={empleadoId}
                contactoEdit={contactoEdit}
                onClose={() => {
                setMostrarModalContactoEmergencia(false);
                cargarContactos();
                }}
            />
            )}
        </div>
    );
};

export default ContactosEmergencia;
