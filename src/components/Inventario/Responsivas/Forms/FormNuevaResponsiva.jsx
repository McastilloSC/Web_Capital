import { useFormik } from 'formik'
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { CatalogosContext } from '../../../../context/CatalogosContext';

//APIS
import axios from '../../../../axios/axios.config'

const FormNuevaResponsiva = ({ setResponsivas, setResponsivasPagination }) => {

    const { catalogosInventario } = useContext(CatalogosContext)

    const [ equipos, setEquipos ] = useState([])
    const [ empleados, setEmpleados ] = useState([])
    const [ loading, setLoading ] = useState(false)

    const registroSchema = Yup.object().shape({ 
        tipo: Yup.number().required('Obligatorio'),
        equipo: Yup.string().required('Obligatorio'),
        fecha_asignacion: Yup.string().required('Obligatorio'),
        area: Yup.number().required('Obligatorio'),
        empleado: Yup.mixed().required('Obligatorio'),
        responsiva: Yup.mixed().required('La responsiva es obligatoria')
    })

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            tipo: '',
            equipo: '',
            fecha_asignacion: '',
            area: '',
            empleado: '',
            responsiva: '',
        },
        onSubmit: (values) => {
            onRegistroAsignacion(values)
        },
    })

    const onBuscarEquiposTipos = async (seleccion) => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/inventario/catalogos/tipo_equipo/${seleccion}`);
            setEquipos(data.equipos)
        } catch (error) {
            setLoading(false)
            toast(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setLoading(false)
    }

    const onBuscarEmpleados = async (area) => {
        setEmpleados([])
        setLoading(true)
        try {
            const { data } = await axios.get(`/capital/empleado/area/${area}`);
            setEmpleados(data.empleados)
        } catch (error) {
            setLoading(false)
            toast(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setLoading(false)
    }

    const onRegistroAsignacion = async (values) => {
        setLoading(true)
        try {
            const { data } = await toast.promise(axios.post('/inventario/responsivas', values, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }), {
                pending: 'Registrando Responsiva',
                success: 'Responsiva Registrada'
            })
            setResponsivas(data.responsivas.data)
            setResponsivasPagination(data.responsivas.links)
        } catch (error) {
            setLoading(false)
            toast(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setLoading(false)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-rows-1 gap-5">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-4 form-control w-full">
                        <label className="label">
                            <span className="label-text">Tipo</span>
                            {formik.errors.tipo && formik.touched.tipo ? (
                                <span className="label-text-alt text-red-500">{formik.errors.tipo}</span>
                            ) : ''}
                        </label>
                        <select disabled={loading} type="text" name='tipo' value={formik.values.tipo} onChange={(e) => [formik.setFieldValue('tipo', e.target.value), onBuscarEquiposTipos(e.target.value)]} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            { catalogosInventario.tipo_equipos.map((tipo) => (
                                <option key={tipo.id_tipo_equipo} value={tipo.id_tipo_equipo}>{tipo.tipo}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-4 form-control w-full">
                        <label className="label">
                            <span className="label-text">Equipo</span>
                            {formik.errors.equipo && formik.touched.equipo ? (
                                <span className="label-text-alt text-red-500">{formik.errors.equipo}</span>
                            ) : ''}
                        </label>
                        <select disabled={loading} name='equipo' value={formik.values.equipo} onChange={formik.handleChange} placeholder="Type here" className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            { equipos.map((equipo) => (
                                <option key={equipo.id_equipo} value={equipo.id_equipo}>{ equipo.marca } - { equipo.modelo } - { equipo.serie }</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-4 form-control w-full">
                        <label className="label">
                            <span className="label-text">Fecha Asignacion</span>
                            {formik.errors.fecha_asignacion && formik.touched.fecha_asignacion ? (
                                <span className="label-text-alt text-red-500">{formik.errors.fecha_asignacion}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="date" name='fecha_asignacion' value={formik.values.fecha_asignacion} onChange={formik.handleChange} placeholder="...." className="input input-sm input-bordered w-full" />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-4 form-control w-full">
                        <label className="label">
                            <span className="label-text">Area</span>
                            {formik.errors.area && formik.touched.area ? (
                                <span className="label-text-alt text-red-500">{formik.errors.area}</span>
                            ) : ''}
                        </label>
                        <select disabled={loading} name='area' value={formik.values.area} onChange={(e) => [formik.setFieldValue('area', e.target.value), onBuscarEmpleados(e.target.value)]} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            { catalogosInventario.areas_ch.map((area) => (
                                 <option key={area.id_area} value={area.id_area} >{area.area}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-8 form-control w-full">
                        <label className="label">
                            <span className="label-text">Empleado</span>
                            {formik.errors.empleado && formik.touched.empleado ? (
                                <span className="label-text-alt text-red-500">{formik.errors.empleado}</span>
                            ) : ''}
                        </label>
                        <select disabled={loading} name='empleado' value={formik.values.empleado} onChange={formik.handleChange} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            { empleados.map(empleado => (
                                 <option value={empleado.id_empleado} key={empleado.id_empleado}>{empleado.nombre} {empleado.apellidos}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-12 form-control w-full">
                        <label className="label">
                            <span className="label-text">Responsiva</span>
                            {formik.errors.responsiva && formik.touched.responsiva ? (
                                <span className="label-text-alt text-red-500">{formik.errors.responsiva}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="file" name='responsiva' onChange={(e) => formik.setFieldValue('responsiva', e.target.files[0])} className="file-input file-input-sm file-input-bordered w-full" multiple={false} accept='.pdf'/>
                    </div>
                </div>

                <button disabled={loading} type='submit' className="btn btn-sm btn-secondary mt-2">Registrar Asignacion</button>
            </div>
        </form>
    )
}

export default FormNuevaResponsiva