import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../../axios/axios.config";
import { toast } from "react-toastify";

const FormContactoEmergencia = ({
  seleccionEmpleado,
  contactoEdit,
  onClose,
}) => {
  const isEditing = !!contactoEdit;

  const formik = useFormik({
    initialValues: {
      nombre: contactoEdit?.nombre || "",
      parentesco: contactoEdit?.parentesco || "",
      telefono: contactoEdit?.telefono || "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Nombre es obligatorio"),
      parentesco: Yup.string().required("Parentesco es obligatorio"),
      telefono: Yup.string().required("Teléfono es obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        const endpoint = isEditing
          ? `/capital/empleados/${seleccionEmpleado}/contactos_emergencia/${contactoEdit.id}`
          : `/capital/empleados/${seleccionEmpleado}/contactos_emergencia`;

        const metodo = isEditing ? axios.put : axios.post;

        await toast.promise(metodo(endpoint, values), {
          pending: isEditing
            ? "Actualizando contacto..."
            : "Guardando contacto...",
          success: "Contacto guardado correctamente",
          error: "Error al guardar el contacto",
        });
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-rows-1">
        <div className="grid grid-cols-3 gap-5">
          <div className="form-control">
            <label className="label">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              className="input input-bordered input-sm"
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <span className="text-red-500 text-xs">{formik.errors.nombre}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">Parentesco</label>
            <input
              type="text"
              name="parentesco"
              value={formik.values.parentesco}
              onChange={formik.handleChange}
              className="input input-bordered input-sm"
            />
            {formik.touched.parentesco && formik.errors.parentesco && (
              <span className="text-red-500 text-xs">
                {formik.errors.parentesco}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formik.values.telefono}
              onChange={formik.handleChange}
              className="input input-bordered input-sm"
            />
            {formik.touched.telefono && formik.errors.telefono && (
              <span className="text-red-500 text-xs">{formik.errors.telefono}</span>
            )}
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-accent btn-sm w-full mt-2">
        {isEditing ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
};

export default FormContactoEmergencia;
