import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

//APIS
import axios from '../../../../../axios/axios.config'
import { CatalogosContext } from '../../../../../context/CatalogosContext';
import { useParams } from 'react-router-dom';

const FormNuevoProyecto = ({ setProyectos, setProyectosPagination }) => {

    const { idCliente } = useParams()

    const { catalogosPipeline } = useContext(CatalogosContext)

    const [ loading, setLoading ] = useState(false);

    const clienteSchema = Yup.object().shape({ 
        empresa: Yup.number().required('Obligatorio'),
        ejecutivo: Yup.number().required('Obligatorio'),
        ingeniero: Yup.number().required('Obligatorio'),
        proyecto: Yup.string().required('Obligatorio'),
        tipo_proyecto: Yup.string().required('Obligatorio'),
        division: Yup.number().required('Obligatorio'),
        producto: Yup.string().required('Obligatorio'),
        mercancia: Yup.string().required('Obligatorio'),
        to_anual: Yup.number().required('Obligatorio'),
    })

    const formik = useFormik({
        validationSchema: clienteSchema,
        initialValues: {
            empresa: '',
            ejecutivo: '',
            ingeniero: '',
            proyecto: '',
            tipo_proyecto: '',
            division: '',
            producto: '',
            mercancia: '',
            to_anual: 0,
        },
        onSubmit: (values) => {
            onRegistroProyecto(values)
        },
    })

    const onRegistroProyecto = async (values) => {
        setLoading(true)
        try {
            const { data } = await toast.promise(axios.post(`/pipeline/proyectos/cliente/${idCliente}`, values), {
                success: 'Proyecto Registrado Correctamente'
            })
            console.log(data)
            setProyectos(data.proyectos.data)
            setProyectosPagination(data.proyectos.links)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-rows-1 gap-5">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-4 form-control w-full">
                        <label className="label">
                            <span className="label-text">Empresa</span>
                            {formik.errors.empresa && formik.touched.empresa 
                                ? <span className="label-text-alt text-red-500">{formik.errors.empresa}</span>
                                : ''
                            }
                        </label>
                        <select disabled={loading} name="empresa" onChange={formik.handleChange} value={formik.values.empresa} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>-- Selecciona --</option>
                            { catalogosPipeline.empresas.map((empresa) => (
                                <option key={empresa.id_empresa} value={empresa.id_empresa}>{empresa.empresa}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-4 form-control w-full">
                        <label className="label">
                            <span className="label-text">Proyecto</span>
                            {formik.errors.proyecto && formik.touched.proyecto 
                                ? <span className="label-text-alt text-red-500">{formik.errors.proyecto}</span>
                                : ''
                            }
                        </label>
                        <input disabled={loading} name="proyecto" onChange={formik.handleChange} value={formik.values.proyecto} type="text" placeholder="..." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="col-span-4 form-control w-full">
                        <label className="label">
                            <span className="label-text">Division</span>
                            {formik.errors.division && formik.touched.division 
                                ? <span className="label-text-alt text-red-500">{formik.errors.division}</span>
                                : ''
                            }
                        </label>
                        <select disabled={loading} name="division" onChange={formik.handleChange} value={formik.values.division} className="input input-sm input-bordered w-full">
                            <option defaultValue={''}>-- Selecciona --</option>
                            { catalogosPipeline.divisiones.map(division => (
                                <option key={division.id_division} value={division.id_division}>{division.division}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Tipo Proyecto</span>
                            {formik.errors.tipo_proyecto && formik.touched.tipo_proyecto 
                                ? <span className="label-text-alt text-red-500">{formik.errors.tipo_proyecto}</span>
                                : ''
                            }
                        </label>
                        <input disabled={loading} name="tipo_proyecto" onChange={formik.handleChange} value={formik.values.tipo_proyecto} type="text" placeholder="..." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Ingeniero</span>
                            {formik.errors.ingeniero && formik.touched.ingeniero 
                                ? <span className="label-text-alt text-red-500">{formik.errors.ingeniero}</span>
                                : ''
                            }
                        </label>
                        <select disabled={loading} name="ingeniero" onChange={formik.handleChange} value={formik.values.ingeniero} className="input input-sm input-bordered w-full">
                            <option defaultValue={''}>-- Selecciona --</option>
                            { catalogosPipeline.ingenieros.map(ingeniero => (
                                <option key={ingeniero.id_ingeniero} value={ingeniero.id_ingeniero}>{ingeniero.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Ejecutivo</span>
                            {formik.errors.ejecutivo && formik.touched.ejecutivo 
                                ? <span className="label-text-alt text-red-500">{formik.errors.ejecutivo}</span>
                                : ''
                            }
                        </label>
                        <select disabled={loading} name="ejecutivo" onChange={formik.handleChange} value={formik.values.ejecutivo} className="input input-sm input-bordered w-full">
                            <option defaultValue={''}>-- Selecciona --</option>
                            { catalogosPipeline.ejecutivos.map(ejecutivo => (
                                <option key={ejecutivo.id_ejecutivo} value={ejecutivo.id_ejecutivo}>{ejecutivo.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Producto</span>
                            {formik.errors.producto && formik.touched.producto 
                                ? <span className="label-text-alt text-red-500">{formik.errors.producto}</span>
                                : ''
                            }
                        </label>
                        <input disabled={loading} name="producto" onChange={formik.handleChange} value={formik.values.producto} type="text" placeholder="..." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Mercancia</span>
                            {formik.errors.mercancia && formik.touched.mercancia 
                                ? <span className="label-text-alt text-red-500">{formik.errors.mercancia}</span>
                                : ''
                            }
                        </label>
                        <input disabled={loading} name="mercancia" onChange={formik.handleChange} value={formik.values.mercancia} type="text" placeholder="..." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">TO Anual</span>
                            {formik.errors.to_anual && formik.touched.to_anual 
                                ? <span className="label-text-alt text-red-500">{formik.errors.to_anual}</span>
                                : ''
                            }
                        </label>
                        <input disabled={loading} name="to_anual" onChange={formik.handleChange} value={formik.values.to_anual} type="number" placeholder="$0" className="input input-sm input-bordered w-full" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Confirmar</span>
                        </label>
                        <button disabled={loading} type='submit' className="btn btn-sm btn-secondary text-white">
                            { loading
                                ? <AiOutlineLoading3Quarters className='animate-spin text-lg font-bold'/>
                                : 'Registrar Proyecto'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormNuevoProyecto