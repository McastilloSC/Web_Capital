import { useFormik } from 'formik'
import * as Yup from 'yup';

//APIS
import axios from '../../../../axios/axios.config'
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { CatalogosContext } from '../../../../context/CatalogosContext';

const FormEditarEquipo = ({ equipo, setEquipos, setEquiposPagination }) => {

    const { catalogosInventario } = useContext(CatalogosContext)

    const [ loading, setLoading ] = useState(false);

    const registroSchema = Yup.object().shape({      
        tipo: Yup.number().required('Obligatorio'),   
        modelo: Yup.string().required('Obligatorio'),
        marca: Yup.string().required('Obligatorio'),
        serie: Yup.string().required('Obligatorio'),
        estatus: Yup.string().required('Obligatorio'),
        observaciones: Yup.string().required('Obligatorio'),
        imagenes: Yup.array().max(5, 'Maximo 5 Imagenes')
    })

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            tipo: equipo.id_tipo_equipo,
            modelo: equipo.modelo,
            marca: equipo.marca,
            serie: equipo.serie,
            estatus: equipo.estatus,
            observaciones: equipo.observaciones,
            imagenes: [],
        },
        onSubmit: (values) => {
            onActualizarEquipo(values)
        },
    })

    const onActualizarEquipo = async (values) => {
        setLoading(true)
        try {
            const { data } = await axios.post(`/inventario/equipos/${equipo.id_equipo}`, values, {
                headers:{
                    'Content-Type':'multipart/form-data',
                }
            })
            setEquipos(data.equipos.data)
            setEquiposPagination(data.equipos.links)
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
            <div className="grid grid-rows-1 gap-5">
                <div className="grid grid-cols-1">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Imagenes</span>
                            {formik.errors.imagenes && formik.touched.imagenes ? (
                                <span className="label-text-alt text-red-500">{formik.errors.imagenes}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="file" multiple={true} name='imagenes' onChange={(event) => formik.setFieldValue('imagenes', Array.from(event.target.files))} className="file-input file-input-sm file-input-bordered w-full border-2 border-gray-300"  accept="image/png, image/gif, image/jpeg"/>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Tipo</span>
                            {formik.errors.tipo && formik.touched.tipo ? (
                                <span className="label-text-alt text-red-500">{formik.errors.tipo}</span>
                            ) : ''}
                        </label>
                        <select disabled={loading} name='tipo' value={formik.values.tipo} onChange={formik.handleChange} className="border-2 border-gray-300 input input-sm input-bordered w-full">
                            <option defaultValue="">--Selecciona--</option>
                            { catalogosInventario.tipo_equipos.map((tipo) => (
                                <option key={tipo.id_tipo_equipo} value={tipo.id_tipo_equipo}>{tipo.tipo}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Modelo</span>
                            {formik.errors.modelo && formik.touched.modelo ? (
                                <span className="label-text-alt text-red-500">{formik.errors.modelo}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="text" name='modelo' value={formik.values.modelo} onChange={formik.handleChange} placeholder="Type here" className="border-2 border-gray-300 input input-sm input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Marca</span>
                            {formik.errors.marca && formik.touched.marca ? (
                                <span className="label-text-alt text-red-500">{formik.errors.marca}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="text" name='marca' value={formik.values.marca} onChange={formik.handleChange} placeholder="Type here" className="border-2 border-gray-300 input input-sm input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Serie</span>
                            {formik.errors.serie && formik.touched.serie ? (
                                <span className="label-text-alt text-red-500">{formik.errors.serie}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="text" name='serie' value={formik.values.serie} onChange={formik.handleChange} placeholder="Type here" className="border-2 border-gray-300 input input-sm input-bordered w-full max-w-xs" />
                    </div>
                </div>

                <div className='grid grid-cols-12 gap-5'>
                    <div className="col-span-3 form-control w-full">
                        <label className="label">
                            <span className="label-text">Estatus</span>
                            {formik.errors.estatus && formik.touched.estatus ? (
                                <span className="label-text-alt text-red-500">{formik.errors.estatus}</span>
                            ) : ''}
                        </label>
                        <select disabled={loading} name='estatus' value={formik.values.estatus} onChange={formik.handleChange} className="border-2 border-gray-300 input input-sm input-bordered w-full">
                            <option defaultValue="">--Selecciona--</option>
                            <option value="1">Excelente</option>
                            <option value="2">Bueno</option>
                            <option value="3">Regular</option>
                            <option value="4">Dañado</option>
                        </select>
                    </div>
                    <div className="col-span-9 form-control w-full ">
                        <label className="label">
                            <span className="label-text">Observaciones</span>
                            {formik.errors.observaciones && formik.touched.observaciones ? (
                                <span className="label-text-alt text-red-500">{formik.errors.observaciones}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="text" name='observaciones' value={formik.values.observaciones} onChange={formik.handleChange} placeholder="...." className="border-2 border-gray-300 input input-sm input-bordered w-full " />
                    </div>
                </div>

                <button disabled={loading} type='submit' className='btn btn-sm btn-secondary mt-3'>Confirmar Equipo</button>
            </div>
        </form>
    )
}

export default FormEditarEquipo