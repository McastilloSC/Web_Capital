import FormBajaEmpleado from "../Forms/FormBajaEmpleado";
import { BsXLg } from "react-icons/bs";

const ModalBajaEmpleado = ({ setModalBajaEmpleado, seleccionEmpleado }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-11/12 max-w-5xl rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Baja Empleado</h3>
                    <button
                        onClick={() => setModalBajaEmpleado(false)}
                        className="hover:text-red-500 cursor-pointer"
                    >
                        <BsXLg className="text-2xl" />
                    </button>
                </div>
                <div className="divider"></div>
                <FormBajaEmpleado seleccionEmpleado={seleccionEmpleado} />
            </div>
        </div>
    );
};

export default ModalBajaEmpleado;
