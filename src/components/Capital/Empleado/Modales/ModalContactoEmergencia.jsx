import FormContactoEmergencia from "../Forms/FormContactoEmergencia";
import { BsXLg } from "react-icons/bs";

const ModalContactoEmergencia = ({
  setModalContactoEmergencia,
  seleccionEmpleado,
  contactoEdit,
  onClose,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        id="modal_contacto_emergencia"
        className="modal-toggle"
        checked={true}
        readOnly
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">
              {contactoEdit ? "Editar" : "Agregar"} Contacto de Emergencia
            </h3>
            <button
              onClick={() => setModalContactoEmergencia(false)}
              className="hover:text-red-500 cursor-pointer"
            >
              <BsXLg className="text-2xl" />
            </button>
          </div>
          <div className="divider"></div>
          <FormContactoEmergencia
            seleccionEmpleado={seleccionEmpleado}
            contactoEdit={contactoEdit}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalContactoEmergencia;
