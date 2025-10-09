import { useFormik } from 'formik'
import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify'

//APIS
import axios from '../../../../axios/axios.config'

const FormEditaPerfil = ({ perfilInfo, setPerfiles, setPerfilesPagination }) => {

    const [ loading, setLoading ] = useState(false);

    const registroSchema = Yup.object().shape({ 
        perfil: Yup.string().required('Obligatorio'), 
        observaciones: Yup.string().nullable(),
        menu_perfiles: Yup.boolean().nullable(),
        menu_usuarios: Yup.boolean().nullable(),
        registro_empleado: Yup.boolean().nullable(),
        editar_empleado: Yup.boolean().nullable(),
        baja_empleado: Yup.boolean().nullable(),

        registro_incidencia: Yup.boolean().nullable(),
        editar_incidencia: Yup.boolean().nullable(),
        eliminar_incidencia: Yup.boolean().nullable(),
    
        registrar_usuarios: Yup.boolean().nullable(),
        editar_usuarios: Yup.boolean().nullable(),
        eliminar_usuarios: Yup.boolean().nullable(),

        incidencias_generales: Yup.boolean().nullable(),
        incidencias_monto: Yup.boolean().nullable(),
        tiempo_extra: Yup.boolean().nullable(),
    })

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            perfil: perfilInfo.perfil,
            observaciones: perfilInfo.observaciones,
            menu_perfiles: perfilInfo.menu_perfiles,
            menu_usuarios: perfilInfo.menu_usuarios,
            registro_empleado: perfilInfo.registro_empleado,
            editar_empleado: perfilInfo.editar_empleado,
            baja_empleado: perfilInfo.baja_empleado,

            registro_incidencia: perfilInfo.registro_incidencia,
            editar_incidencia: perfilInfo.editar_incidencia,
            eliminar_incidencia: perfilInfo.eliminar_incidencia,

            registrar_usuarios: perfilInfo.registrar_usuario,
            editar_usuarios: perfilInfo.editar_usuario,
            eliminar_usuarios: perfilInfo.eliminar_usuario,

            incidencias_generales: perfilInfo.incidencias_generales,
            incidencias_monto: perfilInfo.incidencias_montos,
            tiempo_extra: perfilInfo.tiempo_extra,
        },
        onSubmit: (values) => {
            onUpdatePerfil(values)
        },
    })

    const onUpdatePerfil = async (values) => {
        setLoading(true)
        try {
            const { data } = await toast.promise(axios.patch(`/capital/perfiles/${perfilInfo.id_perfil}`, values), {
                pending: 'Actualizando Perfil',
                success: 'Perfil Actualizado',
            });

            setPerfiles(data.perfiles.data)
            setPerfilesPagination(data.perfiles.links)
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
                            <span className="label-text">Perfil</span>
                            {formik.errors.perfil && formik.touched.perfil ? (
                                <span className="label-text-alt text-red-500">{formik.errors.perfil}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="text" name='perfil' value={formik.values.perfil} onChange={formik.handleChange} placeholder="...." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="col-span-5 form-control w-full">
                        <label className="label">
                            <span className="label-text">Observaciones</span>
                            {formik.errors.observaciones && formik.touched.observaciones ? (
                                <span className="label-text-alt text-red-500">{formik.errors.observaciones}</span>
                            ) : ''}
                        </label>
                        <input disabled={loading} type="text" name='observaciones' value={formik.values.observaciones} onChange={formik.handleChange} placeholder="...." className="input input-sm input-bordered w-full" />
                    </div>
                    <div className="col-span-3">
                        <label className="label">
                            <span className="label-text">Confirmar</span>
                        </label>
                        <button disabled={loading} type='submit' className="btn btn-sm btn-secondary w-full">Actualizar Perfil</button>
                    </div>
                </div>
                <div className="flex border-b-4 border-gray-300">
                    <div className="w-3/12">
                        <h1 className="font-semibold text-sm">Acceso a Menus</h1>
                        <p className="text-xs">Presiona para habilitar</p>
                    </div>
                    <div className="w-9/12 flex flex-col space-y-5 justify-start items-end mb-4">
                        <div className="flex justify-center">
                            <label className="font-semibold mr-4 text-sm">Perfiles</label>
                            <input disabled={loading} checked={formik.values.menu_perfiles} type="checkbox" name='menu_perfiles' value={formik.values.menu_perfiles} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                        </div>
                        <div className="flex justify-center">
                            <label className="font-semibold mr-4 text-sm">Usuarios</label>
                            <input disabled={loading} checked={formik.values.menu_usuarios} type="checkbox" name='menu_usuarios' value={formik.values.menu_usuarios} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                        </div>
                    </div>
                </div>

                <div className='grid grid-rows-1'>
                    <div className='grid grid-cols-2 gap-5'>
                        <div className='col-span-1'>
                            <div className="flex border-b-4 border-gray-300">
                                <div className="w-3/12">
                                    <h1 className="font-semibold text-sm">Empleado</h1>
                                    <p className="text-xs">Presiona para habilitar</p>
                                </div>
                                <div className="w-9/12 flex flex-col space-y-5 justify-start items-end mb-4">
                                    <div className="flex justify-center">
                                        <label className="font-semibold mr-4 text-sm">Registrar Alta</label>
                                        <input disabled={loading} checked={formik.values.registro_empleado} type="checkbox" name='registro_empleado' value={formik.values.registro_empleado} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                                    </div>
                                    <div className="flex justify-center">
                                        <label className="font-semibold mr-4 text-sm">Editar informacion</label>
                                        <input disabled={loading}  checked={formik.values.editar_empleado} type="checkbox" name='editar_empleado' value={formik.values.editar_empleado} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                                    </div>
                                    <div className="flex justify-center">
                                        <label className="font-semibold mr-4 text-sm">Generar Baja</label>
                                        <input disabled={loading} checked={formik.values.baja_empleado} type="checkbox" name='baja_empleado' value={formik.values.baja_empleado} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                                    </div>
                                </div>
                            </div>

                            <div className="flex border-b-4 border-gray-300 mt-5">
                                <div className="w-3/12">
                                    <h1 className="font-semibold text-sm">Incidencias</h1>
                                    <p className="text-xs">Presiona para habilitar</p>
                                </div>
                                <div className="w-9/12 flex flex-col space-y-5 justify-start items-end mb-4">
                                    <div className="flex justify-center">
                                        <label className="font-semibold mr-4 text-sm">Registrar Incidencia</label>
                                        <input disabled={loading} checked={formik.values.registro_incidencia} type="checkbox" name='registro_incidencia' value={formik.values.registro_incidencia} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                                    </div>
                                    <div className="flex justify-center">
                                        <label className="font-semibold mr-4 text-sm">Editar Incidencia</label>
                                        <input disabled={loading} checked={formik.values.editar_incidencia} type="checkbox" name='editar_incidencia' value={formik.values.editar_incidencia} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                                    </div>
                                    <div className="flex justify-center">
                                        <label className="font-semibold mr-4 text-sm">Eliminar Incidencia</label>
                                        <input disabled={loading} checked={formik.values.eliminar_incidencia} type="checkbox" name='eliminar_incidencia' value={formik.values.eliminar_incidencia} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-span-1'>
                            <div className="flex border-b-4 border-gray-300">
                                <div className="w-3/12">
                                    <h1 className="font-semibold text-sm">Usuarios</h1>
                                    <p className="text-xs">Presiona para habilitar</p>
                                </div>
                                <div className="w-9/12 flex flex-col space-y-5 justify-start items-end mb-4">
                                    <div className="flex justify-center">
                                        <label className="font-semibold mr-4 text-sm">Registrar Usuario</label>
                                        <input disabled={loading} checked={formik.values.registrar_usuarios} type="checkbox" name='registrar_usuarios' value={formik.values.registro_empleado} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                                    </div>
                                    <div className="flex justify-center">
                                        <label className="font-semibold mr-4 text-sm">Editar Usuario</label>
                                        <input disabled={loading}  checked={formik.values.editar_usuarios} type="checkbox" name='editar_usuarios' value={formik.values.editar_empleado} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                                    </div>
                                    <div className="flex justify-center">
                                        <label className="font-semibold mr-4 text-sm">Eliminar Usuario</label>
                                        <input disabled={loading} checked={formik.values.eliminar_usuarios} type="checkbox" name='eliminar_usuarios' value={formik.values.baja_empleado} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex border-b-4 border-gray-300 mt-5">
                                <div className="w-3/12">
                                    <h1 className="font-semibold text-sm">Tipo Incidencia</h1>
                                    <p className="text-xs">Presiona para habilitar</p>
                                </div>
                                <div className="w-9/12 flex flex-col space-y-5 justify-start items-end mb-4">
                                    <div className="flex justify-center">
                                        <label className="font-semibold mr-4 text-sm">Incidencias Generales</label>
                                        <input disabled={loading} checked={formik.values.incidencias_generales} type="checkbox" name='incidencias_generales' value={formik.values.incidencias_generales} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                                    </div>
                                    <div className="flex justify-center">
                                        <label className="font-semibold mr-4 text-sm">Incidencias por Monto</label>
                                        <input disabled={loading}  checked={formik.values.incidencias_monto} type="checkbox" name='incidencias_monto' value={formik.values.incidencias_monto} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                                    </div>
                                    <div className="flex justify-center">
                                        <label className="font-semibold mr-4 text-sm">Tiempo Extra</label>
                                        <input disabled={loading}  checked={formik.values.tiempo_extra} type="checkbox" name='tiempo_extra' value={formik.values.tiempo_extra} onChange={formik.handleChange} className="checkbox border-gray-400"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormEditaPerfil