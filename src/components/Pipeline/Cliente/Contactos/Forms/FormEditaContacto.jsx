import { useFormik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify'

//API 
import axios from '../../../../../axios/axios.config'
import { useState } from 'react';


const FormEditaContacto = ({ contactoInfo, setContactos, setContactosPagination }) => {

    const [ loading, setLoading ] = useState(false)

    const registroSchema = Yup.object().shape({ 
        nombre: Yup.string().required('Obligatorio'),
        puesto: Yup.string().required('Obligatorio'),
        telefono: Yup.string().required('Obligatorio'),
        email: Yup.string().email().required('Obligatorio'),
        observaciones: Yup.string().nullable(),
    })

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            nombre: contactoInfo.nombre,
            puesto: contactoInfo.puesto,
            telefono: contactoInfo.telefono,
            email: contactoInfo.email,
            observaciones: contactoInfo.observaciones,
        },
        onSubmit: (values) => {
            onUpdateContacto(values)
        },
    })

    const onUpdateContacto = async (values) => {
        setLoading(true)
        try {
            const { data } = await toast.promise(axios.patch(`/pipeline/contactos/${contactoInfo.id_contacto}`, values), {
                pending: 'Actualizando Contacto',
                success: 'Contacto Actualizdo'
            });
            setContactos(data.contactos.data)
            setContactosPagination(data.contactos.links)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-rows-1 gap-5'>
                    <div className='grid grid-cols-12 gap-5'>
                        <div className="col-span-7 form-control w-full">
                            <label className="label">
                                <span className="label-text">Nombre</span>
                                {formik.errors.nombre && formik.touched.nombre ? (
                                    <span className="label-text-alt text-red-500">{formik.errors.nombre}</span>
                                ) : ''}
                            </label>
                            <input disabled={loading} name="nombre" onChange={formik.handleChange} value={formik.values.nombre} type="text" placeholder="...." className="input input-sm input-bordered w-full" />
                        </div>
                        <div className="col-span-5 form-control w-full">
                            <label className="label">
                                <span className="label-text">Puesto</span>
                                {formik.errors.puesto && formik.touched.puesto ? (
                                    <span className="label-text-alt text-red-500">{formik.errors.puesto}</span>
                                ) : ''}
                            </label>
                            <input disabled={loading} name="puesto" onChange={formik.handleChange} value={formik.values.puesto} type="text" placeholder="...." className="input input-sm input-bordered w-full" />
                        </div>
                    </div>

                    <div className='grid grid-cols-12 gap-5'>
                        <div className="col-span-6 form-control w-full">
                            <label className="label">
                                <span className="label-text">Telefono</span>
                                {formik.errors.telefono && formik.touched.telefono ? (
                                    <span className="label-text-alt text-red-500">{formik.errors.telefono}</span>
                                ) : ''}
                            </label>
                            <input disabled={loading} name="telefono" onChange={formik.handleChange} value={formik.values.telefono} type="text" placeholder="55-" className="input input-sm input-bordered w-full" />
                        </div>
                        <div className="col-span-6 form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                                {formik.errors.email && formik.touched.email ? (
                                    <span className="label-text-alt text-red-500">{formik.errors.email}</span>
                                ) : ''}
                            </label>
                            <input disabled={loading} name="email" onChange={formik.handleChange} value={formik.values.email} type="email" placeholder="@" className="input input-sm input-bordered w-full" />
                        </div>
                    </div>

                    <div className='grid grid-cols-12 gap-5'>
                        <div className="col-span-12 form-control w-full">
                            <label className="label">
                                <span className="label-text">Observaciones</span>
                                {formik.errors.observaciones && formik.touched.observaciones ? (
                                    <span className="label-text-alt text-red-500">{formik.errors.observaciones}</span>
                                ) : ''}
                            </label>
                            <input disabled={loading} name="observaciones" onChange={formik.handleChange} value={formik.values.observaciones} type="text" placeholder="...." className="input input-sm input-bordered w-full" />
                        </div>
                    </div>

                    <button disabled={loading} type='submit' className='btn btn-secondary btn-sm'>Actualizar Contacto</button>
                </div>
            </form>
        </div>
    )
}

export default FormEditaContacto