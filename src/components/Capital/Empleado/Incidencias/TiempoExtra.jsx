import axios from '../../../../axios/axios.config';
import { useFormik } from 'formik'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const TiempoExtra = ({ setTiempoExtra, setTiempoExtraPagination }) => {

    const { idEmpleado } = useParams()

    const [ loading, setLoading ] = useState(false)

    const registroSchema = Yup.object().shape({ 
        fecha: Yup.date().required('Obligatorio'),
        tiempo: Yup.number().min(0.01, 'Minimo 0.01').required('Obligatorio'),
    })

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            fecha: '',
            tiempo: 0,
        },
        onSubmit: (values, action) => {
            onRegistroTiempoExtra(values, action)
        },
    })

    const onRegistroTiempoExtra = async (values, action) => {
        setLoading(true)
        try {
            const { data } = await toast.promise(axios.post(`/capital/tiempo_extra/registro/${idEmpleado}`, values), {
                pending: 'Registrando Tiempo Extra',
                success: 'Tiempo Extra Registrado',
            })
            setTiempoExtra(data.tiempo_extra.data)
            setTiempoExtraPagination(data.tiempo_extra.links)
            action.resetForm();
        } catch (error) {
            setLoading(false)
            console.log(error)
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
            <div className='grid grid-rows-1 my-2'>
                <div className='grid grid-cols-3 gap-5'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Fecha</span>
                            {formik.errors.fecha && formik.touched.fecha ? (
                                <span className="label-text-alt text-red-500">{formik.errors.fecha}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="date" name='fecha' value={formik.values.fecha} onChange={formik.handleChange} className="input input-sm border-2 input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Tiempo (Horas)</span>
                            {formik.errors.tiempo && formik.touched.tiempo ? (
                                <span className="label-text-alt text-red-500">{formik.errors.tiempo}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="number" step={0.1} name='tiempo' value={formik.values.tiempo} onChange={formik.handleChange} placeholder="0.0" className="input input-sm border-2 input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Confirmar</span>
                        </label>
                        <button disabled={loading} type='submit' className='btn btn-sm btn-secondary'>Registrar Tiempo Extra</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default TiempoExtra