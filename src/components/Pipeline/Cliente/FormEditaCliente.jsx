import axios from '../../../axios/axios.config';
import { useFormik } from 'formik'
import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify'

const FormEditaCliente = ({ cliente }) => {

    const [ loading, setLoading ] = useState(false)

    const clienteSchema = Yup.object().shape({ 
        cliente: Yup.string().required('Obligatorio'),
        rfc: Yup.string().required('Obligatorio'),
        direccion: Yup.string().required('Obligatorio'),
        estatus: Yup.boolean().nullable(),
    })

    const formik = useFormik({
        validationSchema: clienteSchema,
        initialValues: {
            cliente: cliente.cliente,
            rfc: cliente.rfc,
            direccion: cliente.direccion,
            estatus: cliente.estatus,
        },
        onSubmit: (values) => {
            onUpdateCliente(values)
        },
    })

    const onUpdateCliente = async (values) => {
        setLoading(true)
        try {
            const { data } = await toast.promise(axios.patch(`/pipeline/clientes/${cliente.id_cliente}`, values), {
                pending: 'Actualizando Cliente',
                success: 'Cliente Actualizado'
            });
            console.log(data)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-rows-1 gap-5">
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-4 form-control w-full">
                        <label className="label">
                            <span className="label-text">Cliente</span>
                            {formik.errors.cliente && formik.touched.cliente ? (
                                <span className="label-text-alt text-red-500">{formik.errors.cliente}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="text" name='cliente' value={formik.values.cliente} onChange={formik.handleChange} placeholder="...." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="col-span-4 form-control w-full">
                        <label className="label">
                            <span className="label-text">RFC</span>
                            {formik.errors.rfc && formik.touched.rfc ? (
                                <span className="label-text-alt text-red-500">{formik.errors.rfc}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="text" name='rfc' value={formik.values.rfc} onChange={formik.handleChange} placeholder="XAX...." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="col-span-4 flex justify-center items-center">
                        <label className="font-semibold">Activo</label>
                        <input disabled={loading} name='estatus' type="checkbox" checked={formik.values.estatus} value={formik.values.estatus} onChange={formik.handleChange} className="checkbox checkbox-lg border-2 border-gray-400 ml-5" />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Direccion</span>
                            {formik.errors.direccion && formik.touched.direccion ? (
                                <span className="label-text-alt text-red-500">{formik.errors.direccion}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="text" name='direccion' value={formik.values.direccion} onChange={formik.handleChange} placeholder="...." className="input input-sm input-bordered w-full" />
                    </div>
                </div>

                <button disabled={loading} type='submit' className='btn btn-secondary btn-sm'>Actualizar Cliente</button>
            </div>
        </form>
    )
}

export default FormEditaCliente