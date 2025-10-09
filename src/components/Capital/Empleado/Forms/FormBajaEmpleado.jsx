// import { useFormik } from 'formik'
// import * as Yup from 'yup';
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom';

// //APIS
// import axios from '../../../../axios/axios.config'
// import { useState, useEffect } from 'react';

// const FormBajaEmpleado = ({ seleccionEmpleado }) => {

//     const navigate = useNavigate();

//     const [ loading, setLoading ] = useState();
//     const [ errores, setErrores ] = useState({})
//     const [tiposBaja, setTiposBaja] = useState([]);
//     const [motivosBaja, setMotivosBaja] = useState([]);

//     useEffect(() => {
        
//         const obtenerTiposBaja = async () => {
//             try {
//                 const { data } = await axios.get('/capital/tipos_baja');
//                 setTiposBaja(data);
//             } catch (error) {
//                 console.error('Error al obtener tipos de baja', error);
//             }
//         };

//         const obtenerMotivosBaja = async () => {
//             try {
//                 const { data } = await axios.get('/capital/motivos_baja'); // <== ESTA ES LA LLAVE
//                 setMotivosBaja(data);
//             } catch (error) {
//                 console.error('Error al obtener motivos de baja', error);
//             }
//         };

//         obtenerTiposBaja();
//         obtenerMotivosBaja();
//     }, []);

//     const registroSchema = Yup.object().shape({ 
//         fecha_baja: Yup.date().required('Obligatorio'),
//         tipo_baja: Yup.string().required('Selecciona una opción'),
//         motivo: Yup.string().max(30, 'Maximo 30 caracteres').required('Obligatorio'),
//         motivos_baja: Yup.string().required('Selecciona una opción'),
//     })

//     const formik = useFormik({
//         validationSchema: registroSchema,
//         initialValues: {
//             fecha_baja: '',
//             tipo_baja: '',
//             motivo: '',
//             motivos_baja: '',
//         },
//         onSubmit: (values) => {
//             onBajaEmpleado(values)
//         },
//     })

//     const onBajaEmpleado = async (values) => {
//         setErrores({})
//         setLoading(true)
//         try {
//             await toast.promise(axios.post(`/capital/empleado/baja/${seleccionEmpleado}`, values), {
//                 success: 'Baja Registrada Correctamente, Espera, Seras redireccionado',
//             })
//             setTimeout(() => {
//                 navigate('/home/capital_humano')
//             }, 3000);
//         } catch (error) {
//             setLoading(false)
//             setErrores(error.response.data)
//         }
//         setLoading(false)
//     }

//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div className="grid grid-rows-1">
//                 <div className="grid grid-cols-2 gap-5">

//                     <div className="form-control w-full">
//                         <label className="label">
//                             <span className="label-text">Fecha Baja</span>
//                             {formik.errors.fecha_baja && formik.touched.fecha_baja ? (
//                                 <span className="label-text-alt text-red-500">{formik.errors.fecha_baja}</span>
//                             ) : ''}
//                         </label>
//                         <input disabled={loading} type="date" name='fecha_baja' value={formik.values.fecha_baja} onChange={formik.handleChange} className="input input-sm border-2 border-gray-300 input-bordered w-full" />
//                     </div>
                    
//                     <div cclassName="form-control w-full">
//                         <label className="label">
//                             <span className="label-text">Tipo Baja</span>
//                             { formik.errors.tipo_baja && formik.touched.tipo_baja 
//                                 ? <span className="label-text-alt text-red-500">{formik.errors.tipo_baja}</span>
//                                 : null
//                             }
//                         </label>
//                         <select disabled={loading} name="tipo_baja" onChange={formik.handleChange} value={formik.values.tipo_baja} className="select select-sm border-2 border-gray-300 select-bordered w-full">
//                             <option value=''>--Selecciona--</option>
//                             {tiposBaja.map((tipo) => (
//                                 <option key={tipo.id} value={tipo.id}>{tipo.descripcion}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div cclassName="form-control w-full">
//                         <label className="label">
//                             <span className="label-text">Motivos Baja</span>
//                             { formik.errors.motivos_baja && formik.touched.motivos_baja 
//                                 ? <span className="label-text-alt text-red-500">{formik.errors.motivos_baja}</span>
//                                 : null
//                             }
//                         </label>
//                         <select disabled={loading} name="motivos_baja" onChange={formik.handleChange} value={formik.values.motivos_baja} className="select select-sm border-2 border-gray-300 select-bordered w-full">
//                             <option value=''>--Selecciona--</option>
//                             {motivosBaja.map((motivos) => (
//                                 <option key={motivos.id} value={motivos.id}>{motivos.descripcion}</option>
//                             ))}
//                         </select>
//                     </div>

                    
//                 </div>
//                 <div className="form-control w-full">
//                     <label className="label">
//                         {/* <span className="label-text">Confimar</span> */}
//                         {Object.keys(errores).length > 0 ? (
//                             <span className="label-text-alt text-red-500">{errores.message}</span>
//                         ) : ''}
//                     </label>
//                     <button disabled={loading} type="submit" className="btn btn-sm btn-accent">Generar Baja</button>
//                 </div>
//             </div>
//         </form>
//     )
// }

// export default FormBajaEmpleado

import { useFormik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import axios from '../../../../axios/axios.config'
import { useState, useEffect } from 'react';

const FormBajaEmpleado = ({ seleccionEmpleado }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [errores, setErrores] = useState({});
    const [tiposBaja, setTiposBaja] = useState([]);
    const [motivosBaja, setMotivosBaja] = useState([]);

    // ✅ Cargar tipos de baja
    useEffect(() => {
        const obtenerTiposBaja = async () => {
            try {
                const { data } = await axios.get('/capital/tipos_baja');
                setTiposBaja(data);
            } catch (error) {
                console.error('Error al obtener tipos de baja', error);
            }
        };

        obtenerTiposBaja();
    }, []);

    // ✅ Formik setup
    const registroSchema = Yup.object().shape({
        fecha_baja: Yup.date().required('Obligatorio'),
        tipo_baja: Yup.string().required('Selecciona una opción'),
        motivos_baja: Yup.string().required('Selecciona una opción'),
        motivo: Yup.string().required('El motivo es obligatorio'),
    });

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            fecha_baja: '',
            tipo_baja: '',
            motivos_baja: '',
            motivo: '',
        },
        onSubmit: (values) => {
            onBajaEmpleado(values);
        },
    });

    // ✅ Cargar motivos cuando cambia tipo_baja
    useEffect(() => {
        if (formik.values.tipo_baja) {
            const obtenerMotivosPorTipo = async () => {
                try {
                    const { data } = await axios.get(`/capital/motivos_baja/${formik.values.tipo_baja}`);
                    setMotivosBaja(data);
                } catch (error) {
                    console.error('Error al obtener motivos filtrados', error);
                }
            };

            obtenerMotivosPorTipo();
        } else {
            setMotivosBaja([]);
            formik.setFieldValue('motivos_baja', '');
            formik.setFieldValue('motivo', '');
        }
    }, [formik.values.tipo_baja]);

    // ✅ Al cambiar motivo (ID), actualizar también el campo texto
    const handleMotivoChange = (e) => {
        const idSeleccionado = e.target.value;
        const motivoSeleccionado = motivosBaja.find(m => m.id == idSeleccionado);
        formik.setFieldValue('motivos_baja', idSeleccionado);
        formik.setFieldValue('motivo', motivoSeleccionado?.descripcion || '');
    };

    const onBajaEmpleado = async (values) => {
        setErrores({});
        setLoading(true);
        try {
            await toast.promise(axios.post(`/capital/empleado/baja/${seleccionEmpleado}`, values), {
                success: 'Baja Registrada Correctamente, Espera, Serás redireccionado',
            });
            setTimeout(() => {
                navigate('/home/capital_humano');
            }, 3000);
        } catch (error) {
            setLoading(false);
            setErrores(error.response.data);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-rows-1">
                <div className="grid grid-cols-3 gap-5">

                    {/* Fecha de baja */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Fecha Baja</span>
                            {formik.errors.fecha_baja && formik.touched.fecha_baja && (
                                <span className="label-text-alt text-red-500">{formik.errors.fecha_baja}</span>
                            )}
                        </label>
                        <input
                            disabled={loading}
                            type="date"
                            name="fecha_baja"
                            value={formik.values.fecha_baja}
                            onChange={formik.handleChange}
                            className="input input-sm border-2 border-gray-300 input-bordered w-full"
                        />
                    </div>

                    {/* Tipo de baja */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Tipo Baja</span>
                            {formik.errors.tipo_baja && formik.touched.tipo_baja && (
                                <span className="label-text-alt text-red-500">{formik.errors.tipo_baja}</span>
                            )}
                        </label>
                        <select
                            disabled={loading}
                            name="tipo_baja"
                            onChange={formik.handleChange}
                            value={formik.values.tipo_baja}
                            className="select select-sm border-2 border-gray-300 select-bordered w-full"
                        >
                            <option value="">--Selecciona--</option>
                            {tiposBaja.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>{tipo.descripcion}</option>
                            ))}
                        </select>
                    </div>

                    {/* Motivos de baja */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Motivo de Baja</span>
                            {formik.errors.motivos_baja && formik.touched.motivos_baja && (
                                <span className="label-text-alt text-red-500">{formik.errors.motivos_baja}</span>
                            )}
                        </label>
                        <select
                            disabled={loading}
                            name="motivos_baja"
                            value={formik.values.motivos_baja}
                            onChange={handleMotivoChange}
                            className="select select-sm border-2 border-gray-300 select-bordered w-full"
                        >
                            <option value="">--Selecciona--</option>
                            {motivosBaja.map((motivo) => (
                                <option key={motivo.id} value={motivo.id}>{motivo.descripcion}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Botón + errores */}
                <div className="form-control w-full mt-3">
                    {Object.keys(errores).length > 0 && (
                        <span className="label-text-alt text-red-500">{errores.message}</span>
                    )}
                    <button disabled={loading} type="submit" className="btn btn-sm btn-accent mt-2">
                        Generar Baja
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormBajaEmpleado;
