import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify'

//APIS
import axios from '../../../../../axios/axios.config'

const FormNuevaLlamada = ({ setLlamadas, setLlamadasPagination }) => {

    const { idCliente } = useParams()

    const [ loading, setLoading ] = useState(false);

    const registroSchema = Yup.object().shape({ 
        duracion: Yup.number().min(0.01, 'Minimo 0.01').required('Obligatorio'),
        fecha: Yup.date().required('Obligatorio'),
        motivo: Yup.string().required('Obligatorio'),
        observaciones: Yup.string().nullable(),
        oportunidad: Yup.boolean().nullable(),
        cita: Yup.boolean().nullable(),
    })

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            duracion: 0.00,
            fecha: '',
            motivo: '',
            observaciones: '',
            oportunidad: false,
            cita: false
        },
        onSubmit: (values) => {
            onRegistroLlamada(values)
        },
    })

    const onRegistroLlamada = async (values) => {
        setLoading(true)
            try {
                const { data } = await toast.promise(axios.post(`/pipeline/llamadas/${idCliente}`, values), {
                    pending: 'Registrando Llamada',
                    success: 'Llamada Registrada'
                });
                setLlamadas(data.llamadas.data)
                setLlamadasPagination(data.llamadas.links)
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
                    <div className="col-span-3 form-control w-full">
                        <label className="label">
                            <span className="label-text">Duracion (Minutos)</span>
                            {formik.errors.duracion && formik.touched.duracion ? (
                                <span className="label-text-alt text-red-500">{formik.errors.duracion}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} name="duracion" onChange={formik.handleChange} value={formik.values.duracion} type="number" step={0.01} placeholder="0.00" className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="col-span-4 form-control w-full">
                        <label className="label">
                            <span className="label-text">Fecha</span>
                            {formik.errors.fecha && formik.touched.fecha ? (
                                <span className="label-text-alt text-red-500">{formik.errors.fecha}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} name="fecha" onChange={formik.handleChange} value={formik.values.fecha} type="date" className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="col-span-5 form-control w-full">
                        <label className="label">
                            <span className="label-text">Motivo</span>
                            {formik.errors.motivo && formik.touched.motivo ? (
                                <span className="label-text-alt text-red-500">{formik.errors.motivo}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} name="motivo" onChange={formik.handleChange} value={formik.values.motivo} type="text" placeholder="..." className="input input-sm input-bordered w-full" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Observaciones</span>
                            {formik.errors.observaciones && formik.touched.observaciones ? (
                                <span className="label-text-alt text-red-500">{formik.errors.observaciones}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} name="observaciones" onChange={formik.handleChange} value={formik.values.observaciones} type="text" placeholder="..." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <label className="font-semibold">¿ Oportunidad Identificada ?</label>
                        <input name="oportunidad" onChange={formik.handleChange} value={formik.values.oportunidad} type="checkbox" className="checkbox border-2 ml-5"/>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <label className="font-semibold">¿ Genero Cita ?</label>
                        <input name="cita" onChange={formik.handleChange} value={formik.values.cita} type="checkbox" className="checkbox border-2 ml-5"/>
                    </div>
                </div>

                <div className="grid grid-cols-1">
                    <button disabled={loading} type="submit" className="btn btn-sm btn-secondary w-full">Registrar Llamada</button>
                </div>
            </div>
        </form>
    )
}

export default FormNuevaLlamada