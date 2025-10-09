import { useContext, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify';

//APIS
import axios from '../../../../axios/axios.config'

//Context
import { CatalogosContext } from '../../../../context/CatalogosContext';


const FormEditaIncidenciaMonto = ({ incidencia, setIncidencias, setIncidenciasPagination }) => {

    const [ loading, setLoading ] = useState();

    const { catalogosCapital } = useContext(CatalogosContext)

    const registroSchema = Yup.object().shape({ 
        incidencia: Yup.string().required('Obligatorio'),
        monto: Yup.number().min(1, 'Cantidad minima 1').required('Obligatorio'),
        fecha: Yup.string().required('Obligatorio'),
    })

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            incidencia: incidencia.id_incidencia,
            monto: incidencia.monto,
            fecha: incidencia.fecha_incidencia,
        },
        onSubmit: (values) => {
            onActualizarIncidencia(values)
        },
    })

    const onActualizarIncidencia = async (values) => {
        setLoading(true)
        try {
            const { data } = await toast.promise(axios.patch(`/capital/incidencias/monto/${incidencia.id_incidencia_monto}`, values), {
                pending: 'Actualizando Incidencia',
                success: 'Incidencia Actualizada'
            })
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
                            { catalogosCapital.incidencias_montos.map((monto) => (
                                <option key={monto.id_incidencia} value={monto.id_incidencia}>{ monto.incidencia }</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-3 form-control w-full">
                        <label className="label">
                            <span className="label-text">Monto</span>
                            {formik.errors.monto && formik.touched.monto ? (
                                <span className="label-text-alt text-red-500">{formik.errors.monto}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="number" step={0.01} name='monto' value={formik.values.monto} onChange={formik.handleChange} placeholder='0' className='input input-sm input-bordered'/>
                    </div>
                    <div className="col-span-3 form-control w-full">
                        <label className="label">
                            <span className="label-text">Fecha</span>
                            {formik.errors.fecha && formik.touched.fecha ? (
                                <span className="label-text-alt text-red-500">{formik.errors.fecha}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="date" name='fecha' value={formik.values.fecha} onChange={formik.handleChange} className='input input-sm input-bordered'/>
                    </div>
                    <div className="col-span-3 form-control w-full">
                        <label className="label">
                            <span className="label-text">Confirmar</span>
                        </label>
                        <button disabled={loading} type='submit' className='btn btn-sm btn-secondary'>Actualizar Incidencia</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormEditaIncidenciaMonto