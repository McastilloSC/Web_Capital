import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

//Axios
import axios from '../../../../../axios/axios.config'

const FormAgenda = ({ citas, setCitas, seleccionCita, labelRefClose }) => {

    const { idCliente } = useParams()

    const [ loading, setLoading ] = useState(false)
    const [ errores, setErrores ] = useState({})

    const registroSchema = Yup.object().shape({ 
        fecha_cita: Yup.date().required('Obligatorio'),
        motivo: Yup.string().min(1, 'Minimo 1 Palabra').max(30, 'Maximo 30 Palabras').required('Obligatorio'),
        comentarios: Yup.string().max(100, 'Maximo 100 palabras').nullable(''),
    })

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            fecha_cita: '',
            motivo: '',
            comentarios: ''
        },
        onSubmit: (values) => {
            seleccionCita ? onUpdateCita(values) : onRegistroAgenda(values)
        },
    })

    const onEliminarCita = async (idCita) => {
        Swal.fire({
            title: "¿Estas Seguro?",
            text: "Se eliminara la cita",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar Cita",
            cancelButtonText: 'Cancelar',
            allowEnterKey: false,
            allowEscapeKey: false, 
            allowOutsideClick: false
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true)
                    const { data } = await toast.promise(axios.delete(`/pipeline/citas/${idCita}`), {
                        pending: 'Eliminando Cita',
                        success: 'Cita Eliminada'
                    })
                    setCitas(citas.filter(( cita ) => { return cita.id != data.cita }))
                    labelRefClose.current.click()
                } catch (error) {
                    setErrores(error.response.data)
                }finally{
                    setLoading(true)
                }
            }
        });
    }

    const onRegistroAgenda = async (values) => {
        setErrores({})
        try {
            setLoading(true);
            const { data } = await toast.promise(axios.post(`/pipeline/citas/${idCliente}`, values), {
                success: 'Cita Registrada Correctamente'
            });
            const cita = {
                id: data.cita.id_cita,
                title: data.cita.motivo,
                start: new Date(data.cita.anio, data.cita.mes - 1, data.cita.dia),
                end: new Date(data.cita.anio, data.cita.mes - 1, data.cita.dia),
            }
            setCitas([...citas, cita])
        } catch (error) {
            setErrores(error.response.data)
        } finally {
            setLoading(false);
        }
    }

    const onUpdateCita = async (values) => {
        setErrores({})
        try {
            setLoading(true);
            const { data } = await toast.promise(axios.patch(`/pipeline/citas/${seleccionCita}`, values), {
                success: 'Cita Actualizada Correctamente'
            });

            const citaResponse = {
                id: data.cita.id_cita,
                title: data.cita.motivo,
                start: new Date(data.cita.anio, data.cita.mes - 1, data.cita.dia),
                end: new Date(data.cita.anio, data.cita.mes - 1, data.cita.dia),
            }

            const citasMap = citas.map((cita) => {
                if(cita.id === citaResponse.id){
                    cita.title = citaResponse.title,
                    cita.start = citaResponse.start,
                    cita.end = citaResponse.end
                }
                return cita
            })

            setCitas(citasMap)
        } catch (error) {
            setErrores(error.response.data)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(seleccionCita){
            const onObtenerCita = async () => {
                try {
                    setLoading(true)
                    const { data } = await axios.get(`/pipeline/citas/${seleccionCita}`);
                    formik.values.fecha_cita = data.cita.fecha_cita;
                    formik.values.motivo = data.cita.motivo;
                    formik.values.comentarios = data.cita.comentarios;
                } catch (error) {
                    setErrores(error.response.data)
                } finally {
                    setLoading(false)
                }
            }
            onObtenerCita()
        }
    }, [seleccionCita])

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-rows-1">
                <div className="grid grid-cols-12 gap-y-3">
                    <label className="col-span-12 form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Fecha Visita</span>
                            {formik.errors.fecha_cita && formik.touched.fecha_cita ? (
                                <span className="label-text-alt text-red-500">{formik.errors.fecha_cita}</span>
                            ) : ''}
                        </div>
                        <input disabled={loading} type="date" name={'fecha_cita'} value={formik.values.fecha_cita} onChange={formik.handleChange} className="input input-sm input-bordered w-full" />
                    </label>

                    <label className="col-span-12 form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Motivo</span>
                            {formik.errors.motivo && formik.touched.motivo ? (
                                <span className="label-text-alt text-red-500">{formik.errors.motivo}</span>
                            ) : ''}
                        </div>
                        <input disabled={loading} type="text" maxLength={30} name={'motivo'} value={formik.values.motivo} onChange={formik.handleChange} className="input input-sm input-bordered w-full" />
                    </label>

                    <label className="col-span-12 form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Comentarios</span>
                            {formik.errors.comentarios && formik.touched.comentarios ? (
                                <span className="label-text-alt text-red-500">{formik.errors.comentarios}</span>
                            ) : ''}
                        </div>
                        <input disabled={loading} type="text" name={'comentarios'} value={formik.values.comentarios} onChange={formik.handleChange} className="input input-sm input-bordered w-full" />
                    </label>

                    { Object.keys(errores).length > 0 && (
                        <div className='p-2'>
                            <h1 className='text-red-500'>{ errores.message }</h1>
                        </div>
                    )}

                    <div className='col-span-12 mt-2'>
                        <button disabled={loading} type='submit' className='w-full btn btn-sm btn-secondary'>
                            { loading 
                                ? (
                                    <div className='flex'>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        <h1 className='ml-3'>Cargando...</h1>
                                    </div>
                                )
                                : seleccionCita ? 'Editar Cita': 'Registrar Cita'
                            }
                        </button>
                    </div>

                    { seleccionCita && (
                        <div className='col-span-12 mt-2'>
                            <button type='button' onClick={() => onEliminarCita(seleccionCita)} className='w-full btn btn-sm text-white btn-accent'>
                                Eliminar Cita
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </form>
    )
}

export default FormAgenda