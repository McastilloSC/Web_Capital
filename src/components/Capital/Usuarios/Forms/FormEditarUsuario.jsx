import { useFormik } from 'formik'
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Swal from 'sweetalert2'

//APIS
import axios from '../../../../axios/axios.config'
import { toast } from 'react-toastify';


const FormEditarUsuario = ({ userInfo, setUsuarios, setUsuariosPagination, setModalEditaUsuario }) => {

    const [ loading, setLoading ] = useState(false)
    const [ perfiles, setPerfiles ] = useState([])

    const registroSchema = Yup.object().shape({ 
        empresa: Yup.string().required('Obligatorio'),
        usuario: Yup.string().required('Obligatorio'),
        nombre: Yup.string().required('Obligatorio'),
        apellidos: Yup.string().required('Obligatorio'),
        password: Yup.string().nullable(),
        password_confirmacion: Yup.string().nullable(),
        perfil: Yup.string().required('Obligatorio'),
        jefe_directo: Yup.boolean().nullable(),
        administrador: Yup.boolean().nullable(),
    })

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            empresa: userInfo.empresa,
            usuario: userInfo.usuario,
            nombre: userInfo.nombre,
            apellidos: userInfo.apellidos,
            password: '',
            password_confirmacion: '',
            perfil: userInfo.id_perfil,
            jefe_directo: userInfo.jefe_directo,
            administrador: userInfo.administrador,
        },
        onSubmit: (values, action) => {
            onRegistroUsuario(values, action)
        },
    })

    const onRegistroUsuario = async (values, action) => {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Se actalizara, la informacion de usuario",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Actualizar',
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true)
                try {
                    const { data } = await toast.promise(axios.patch(`/capital/usuarios/${userInfo.id_usuario}`, values), {
                        pending: 'Actualizando Usuario',
                        success: 'Usuario Actualizado'
                    });
                    setUsuarios(data.usuarios.data)
                    setUsuariosPagination(data.usuarios.links)
                    action.resetForm();
                    setModalEditaUsuario(false)
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
        })
    }

    useEffect(() => {
        const onObtenerPerfiles = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get('/capital/perfiles/consulta');
                setPerfiles(data.perfiles)
            } catch (error) {
                setLoading(true)
                console.log(error)
            }
            setLoading(false)
        }
        onObtenerPerfiles();
    }, [])

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='grid grid-rows-1 gap-5'>
                <div className='grid grid-cols-4 gap-5'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Empresa</span>
                            {formik.errors.empresa && formik.touched.empresa ? (
                                <span className="label-text-alt text-red-500">{formik.errors.empresa}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} name="empresa" onChange={formik.handleChange} value={formik.values.empresa} type="text" placeholder="..." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Usuario</span>
                            {formik.errors.usuario && formik.touched.usuario ? (
                                <span className="label-text-alt text-red-500">{formik.errors.usuario}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} name="usuario" onChange={formik.handleChange} value={formik.values.usuario} type="text" placeholder="..." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Nombre</span>
                            {formik.errors.nombre && formik.touched.nombre ? (
                                <span className="label-text-alt text-red-500">{formik.errors.nombre}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} name="nombre" onChange={formik.handleChange} value={formik.values.nombre} type="text" placeholder="..." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Apellidos</span>
                            {formik.errors.apellidos && formik.touched.apellidos ? (
                                <span className="label-text-alt text-red-500">{formik.errors.apellidos}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} name="apellidos" onChange={formik.handleChange} value={formik.values.apellidos} type="text" placeholder="..." className="input input-sm input-bordered w-full" />
                    </div>
                </div>

                <div className='grid grid-cols-12 gap-5'>
                    <div className="col-span-3 form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                            {formik.errors.password && formik.touched.password ? (
                                <span className="label-text-alt text-red-500">{formik.errors.password}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} name="password" onChange={formik.handleChange} value={formik.values.password} type="password" placeholder="*****" className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="col-span-3 form-control w-full">
                        <label className="label">
                            <span className="label-text">Confirmar Password</span>
                            {formik.errors.password_confirmacion && formik.touched.password_confirmacion ? (
                                <span className="label-text-alt text-red-500">{formik.errors.password_confirmacion}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} name="password_confirmacion" onChange={formik.handleChange} value={formik.values.password_confirmacion} type="password" placeholder="*****" className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="col-span-6 form-control w-full">
                        <label className="label">
                            <span className="label-text">Perfil</span>
                            {formik.errors.perfil && formik.touched.perfil ? (
                                <span className="label-text-alt text-red-500">{formik.errors.perfil}</span>
                            ) : ''}
                        </label>
                        <select disabled={loading} name="perfil" onChange={formik.handleChange} value={formik.values.perfil} className="select select-sm input-bordered w-full">
                            <option defaultValue={''}>-- Selecciona --</option>
                            { perfiles.map((perfil) => (
                                <option key={perfil.id_perfil} value={perfil.id_perfil} className='uppercase'>{perfil.perfil}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-5 mt-5'>
                    <div className='col-span-3 flex justify-start items-center'>
                        <input type="checkbox" checked={formik.values.jefe_directo} disabled={loading} name="jefe_directo" onChange={formik.handleChange} value={formik.values.jefe_directo} className='checkbox border-2 checkbox-lg checkbox-primary'/>
                        <label htmlFor="" className='ml-3'>Jefe Directo</label>
                    </div>
                    <div className='col-span-3 flex justify-start items-center'>
                        <input type="checkbox" checked={formik.values.administrador} disabled={loading} name="administrador" onChange={formik.handleChange} value={formik.values.administrador} className='checkbox border-2 checkbox-lg checkbox-primary'/>
                        <label htmlFor="" className='ml-3'>Administrador</label>
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-5'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Confirmar</span>
                        </label>
                        <button disabled={loading} type='submit' className='btn btn-sm btn-secondary'>Editar Usuario</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormEditarUsuario