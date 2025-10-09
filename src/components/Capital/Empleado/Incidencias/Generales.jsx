import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';

//Context
import { CatalogosContext } from '../../../../context/CatalogosContext';

//APIS
import axios from '../../../../axios/axios.config';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Generales = ({ setIncidencias, setIncidenciasPagination }) => {

    const [ loading, setLoading ] = useState(false)

    const { catalogosCapital } = useContext(CatalogosContext)
    const { idEmpleado } = useParams()

    const registroSchema = Yup.object().shape({ 
        incidencia: Yup.string().required('Obligatorio'),
        fecha_inicio: Yup.string().required('Obligatorio'),
        fecha_fin: Yup.string().required('Obligatorio'),
    })

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            incidencia: '',
            fecha_inicio: '',
            fecha_fin: '',
        },
        onSubmit: (values,action) => {
            onRegistroIncidencia(values, action)
        },
    })

    const onRegistroIncidencia = async (values, action) => {
        setLoading(true)
        try {
            const { data } = await toast.promise(axios.post(`/capital/incidencias/generales/${idEmpleado}`, values), {
                pending: 'Registrando Incidencia',
                success: 'Incidencia Registrada'
            })
            action.resetForm()
            setIncidencias(data.incidencias.data)
            setIncidenciasPagination(data.incidencias.links)
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
            <div className='grid grid-rows-1'>
                <div className='grid grid-cols-12 gap-5'>
                    <div className="col-span-3 form-control w-full">
                        <label className="label">
                            <span className="label-text">Incidencia</span>
                            {formik.errors.incidencia && formik.touched.incidencia ? (
                                <span className="label-text-alt text-red-500">{formik.errors.incidencia}</span>
                            ) : ''}
                        </label>
                        <select disabled={loading} type="text" name='incidencia' value={formik.values.incidencia} onChange={formik.handleChange} placeholder="Type here" className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>-- Selecciona --</option>
                            { catalogosCapital.incidencias_generales.map((general) => (
                                <option key={general.id_incidencia} value={general.id_incidencia}>{ general.incidencia }</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-3 form-control w-full">
                        <label className="label">
                            <span className="label-text">Fecha Inicio</span>
                            {formik.errors.fecha_inicio && formik.touched.fecha_inicio ? (
                                <span className="label-text-alt text-red-500">{formik.errors.fecha_inicio}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="date" name='fecha_inicio' value={formik.values.fecha_inicio} onChange={formik.handleChange} className='input input-sm input-bordered'/>
                    </div>
                    <div className="col-span-3 form-control w-full">
                        <label className="label">
                            <span className="label-text">Fecha Fin</span>
                            {formik.errors.fecha_fin && formik.touched.fecha_fin ? (
                                <span className="label-text-alt text-red-500">{formik.errors.fecha_fin}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="date" name='fecha_fin' value={formik.values.fecha_fin} onChange={formik.handleChange} className='input input-sm input-bordered'/>
                    </div>
                    <div className="col-span-3 form-control w-full">
                        <label className="label">
                            <span className="label-text">Confirmar</span>
                        </label>
                        <button disabled={loading} type='submit' className='btn btn-sm btn-secondary'>Registrar Incidencia</button>
                    </div>
                </div>
                <p className='text-xs text-center mt-4'>Si la incidencia es de un solo dia, porfavor coloca la misma fecha</p>
            </div>
        </form>
    )
}

export default Generales