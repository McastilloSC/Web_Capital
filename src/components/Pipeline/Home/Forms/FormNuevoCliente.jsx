import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

//APIS
import axios from '../../../../axios/axios.config'
import { CatalogosContext } from '../../../../context/CatalogosContext';
import { useParams } from 'react-router-dom';

const FormNuevoCliente = ({ setClientes, setClientesPagination, setGrafica }) => {

    const { catalogosPipeline } = useContext(CatalogosContext)

    const [ loading, setLoading ] = useState(false);

    const clienteSchema = Yup.object().shape({
        empresa: Yup.number().required('Obligatorio'), 
        logo: Yup.mixed(),
        cliente: Yup.string().required('Obligatorio'),
        rfc: Yup.string().min(12, 'Minimo 12 Caracteres').max(12, 'Maximo 12 Caracteres'),
        direccion: Yup.string(),
    })

    const formik = useFormik({
        validationSchema: clienteSchema,
        initialValues: {
            empresa: '',
            logo: '',
            cliente: '',
            rfc: '',
            direccion: '',
        },
        onSubmit: (values) => {
            onRegistroCliente(values)
        },
    })

    const onRegistroCliente = async (values) => {
        setLoading(true)
        console.log('Datos enviados:', values)
        try {
            const { data } = await toast.promise(axios.post('/pipeline/clientes', values, {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }), {
                success: 'Cliente Registrado Correctamente'
            })
            setGrafica(data.stats.stats)
            setClientes(data.clientes.data)
            setClientesPagination(data.clientes.links)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-rows-1 gap-5">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 form-control w-full">
                        <label className="label">
                            <span className="label-text">Empresa</span>
                            {formik.errors.empresa && formik.touched.empresa
                                ? <span className="label-text-alt text-red-500">{formik.errors.empresa}</span>
                                : ''
                            }
                        </label>
                        <select disabled={loading} name="empresa" onChange={formik.handleChange} value={formik.values.empresa} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>-- Selecciona --</option>
                            {catalogosPipeline.empresas.map((empresa) => (
                                <option key={empresa.id_empresa} value={empresa.id_empresa}>{empresa.empresa}</option>
                            ))}
                        </select>
                    </div>                    
                    <div className="col-span-12 form-control w-full">
                        <label className="label">
                            <span className="label-text">Imagen Cliente</span>
                            {formik.errors.logo && formik.touched.logo 
                                ? <span className="label-text-alt text-red-500">{formik.errors.logo}</span>
                                : <span className="label-text-alt">Opcional</span>
                            }
                        </label>
                        <input disabled={loading} name='logo' onChange={(event) => formik.setFieldValue('logo', event.target.files[0])} accept='image/*'  type="file" className="file-input file-input-sm file-input-bordered w-full" />
                    </div>
                    <div className="col-span-12 form-control w-full">
                        <label className="label">
                            <span className="label-text">Cliente</span>
                            {formik.errors.cliente && formik.touched.cliente 
                                ? <span className="label-text-alt text-red-500">{formik.errors.cliente}</span>
                                : ''
                            }
                        </label>
                        <input disabled={loading} name="cliente" onChange={formik.handleChange} value={formik.values.cliente} type="text" placeholder="..." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="col-span-12 form-control w-full">
                        <label className="label">
                            <span className="label-text">RFC</span>
                            {formik.errors.rfc && formik.touched.rfc 
                                ? <span className="label-text-alt text-red-500">{formik.errors.rfc}</span>
                                : <span className="label-text-alt">Opcional</span>
                            }
                        </label>
                        <input disabled={loading} name="rfc" onChange={formik.handleChange} value={formik.values.rfc} type="text" placeholder="..." maxLength={12} className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="col-span-12 form-control w-full">
                        <label className="label">
                            <span className="label-text">Direccion</span>
                            {formik.errors.direccion && formik.touched.direccion 
                                ? <span className="label-text-alt text-red-500">{formik.errors.direccion}</span>
                                : <span className="label-text-alt">Opcional</span>
                            }
                        </label>
                        <input disabled={loading} name="direccion" onChange={formik.handleChange} value={formik.values.direccion} type="text" placeholder="..." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="col-span-12 form-control w-full">
                        <button disabled={loading} type='submit' className="btn btn-sm btn-success text-white">
                            { loading
                                ? <AiOutlineLoading3Quarters className='animate-spin text-lg font-bold'/>
                                : 'Registrar Cliente'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormNuevoCliente