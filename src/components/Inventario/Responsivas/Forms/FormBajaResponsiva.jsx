import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';

//APIS
import axios from '../../../../axios/axios.config'
import { toast } from 'react-toastify';

const FormBajaResponsiva = ({ seleccionResponsiva, setResponsivas, setResponsivasPagination }) => {
    
    const [ loading, setLoading ] = useState(false)

    const registroSchema = Yup.object().shape({ 
        fecha_baja: Yup.date().required('Obligatorio'),
        responsiva: Yup.mixed().required('La responsiva es obligatoria')
    })

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            fecha_baja: '',
            responsiva: '',
        },
        onSubmit: (values) => {
            onBajaResponsiva(values)
        },
    })

    const onBajaResponsiva = async (values) => {
        console.log(values)
        setLoading(true)
        try {
            const { data } = await toast.promise(axios.post(`/inventario/responsivas/baja/${seleccionResponsiva}`, values, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }), {
                success: 'Baja Registrada Correctamente'
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
            console.log(error)
        }
        setLoading(false)
    }
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-rows-1 gap-5">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-6 form-control w-full">
                        <label className="label">
                            <span className="label-text">Responsiva</span>
                            {formik.errors.responsiva && formik.touched.responsiva ? (
                                <span className="label-text-alt text-red-500">{formik.errors.responsiva}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="file" name='responsiva' onChange={(event) => formik.setFieldValue('responsiva', event.target.files[0])} className="file-input file-input-sm file-input-bordered w-full" />
                    </div>
                    <div className="col-span-6 form-control w-full">
                        <label className="label">
                            <span className="label-text">Fecha Baja</span>
                            {formik.errors.fecha_baja && formik.touched.fecha_baja ? (
                                <span className="label-text-alt text-red-500">{formik.errors.fecha_baja}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="date" name='fecha_baja' value={formik.values.fecha_baja} onChange={formik.handleChange} className="input input-sm input-bordered w-full" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                    <div className="col-span-1 form-control w-full">
                        {/* <label className="label">
                            <span className="label-text-alt">Alt label</span>
                        </label> */}
                        <button disabled={loading} type='submit' className="btn btn-secondary btn-sm">Realizar Baja</button>
                    </div>
                </div>
                
            </div>
        </form>
    )
}

export default FormBajaResponsiva