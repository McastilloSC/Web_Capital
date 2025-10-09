import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify'

//API
import axios from '../../../../axios/axios.config'
import { CatalogosContext } from '../../../../context/CatalogosContext';

const FormEditaEmpleado = ({ empleadoInfo, setEmpleado }) => {

    const { catalogosCapital } = useContext(CatalogosContext);

    const [ loading, setLoading ] = useState(false);
    const [ errores, setErrores ] = useState({})

    const nuevoEmpleadoSchema = Yup.object().shape({
        foto_empleado: Yup.mixed().nullable('Opcional'),
        nomina: Yup.string().max(15, 'Maximo 15 Caracteres').required('Obligatorio'),
        empresa: Yup.string().required('Obligatorio'),
        centro_costo: Yup.number().required('Obligatorio'),
        tipo_costo: Yup.string().required('El Tipo es Obligatorio'),
        ubicacion: Yup.number().required('Obligatorio'),
        pago: Yup.string().required('Obligatorio'),
        area: Yup.string().required('Obligatorio'),
        puesto_organigrama: Yup.number().required('Obligatorio'),
        puesto_especifico: Yup.string().required('Obligatorio'),
        tipo_puesto: Yup.string().required('Obligatorio'),
        fecha_nacimiento: Yup.string().required('Obligatorio'),
        sexo: Yup.string().required('Obligatorio'),
        nacionalidad: Yup.string().required('Obligatorio'),
        estado_civil: Yup.string().required('Obligatorio'),
        alias: Yup.string().min(8, 'Min 8 Caracteres').max(8, 'Max 8 Caracteres').nullable(),
        nombre: Yup.string().required('Obligatorio'),
        apellidos: Yup.string().required('Obligatorio'),
        correo: Yup.string().nullable(),
        cp: Yup.string().required('Obligatorio'),
        direccion: Yup.string().required('Obligatorio'),
        telefono: Yup.string().required('Obligatorio'),
        infonavit: Yup.string().nullable(),
        fonacot: Yup.string().nullable(),
        curp: Yup.string().required('Obligatorio'),
        rfc: Yup.string().required('Obligatorio'),
        nss: Yup.string().required('Obligatorio'),
        banco: Yup.number().required(),
        cuenta: Yup.string().min(16, 'Min 16 Digitos').max(16, 'Max 16 Digitos').required('Obligatorio'),
        clabe: Yup.string().min(18, 'Min 18 Digitos').max(18, 'Max 18 Digitos').required('Obligatorio'),
        jefe_directo: Yup.string().required('Obligatorio'),
        fecha_alta: Yup.string().required('Obligatorio'),
        sueldo_diario: Yup.number().required('Obligatorio'),
        sueldo_bruto: Yup.number().required('Obligatorio'),
        sueldo_integrado: Yup.number().required('Obligatorio'),
    })

    const formik = useFormik({
        validationSchema: nuevoEmpleadoSchema,
        initialValues: {
            foto_empleado: '',
            nomina: empleadoInfo.numero_nomina,
            empresa: empleadoInfo.empresa,
            centro_costo: empleadoInfo.id_centro_costo,
            tipo_costo: empleadoInfo.tipo_costo,
            ubicacion: empleadoInfo.id_ubicacion, 
            pago: empleadoInfo.tipo_pago,
            area: empleadoInfo.area,
            puesto_organigrama: empleadoInfo.id_tabulador,
            puesto_especifico: empleadoInfo.puesto_especifico,
            tipo_puesto: empleadoInfo.tipo_puesto,
            fecha_nacimiento: empleadoInfo.fecha_nacimiento,
            sexo: empleadoInfo.sexo,
            nacionalidad: empleadoInfo.nacionalidad,
            estado_civil: empleadoInfo.estado_civil,
            alias: empleadoInfo.alias,
            nombre: empleadoInfo.nombre,
            apellidos: empleadoInfo.apellidos,
            correo: empleadoInfo.correo,
            cp: empleadoInfo.cp,
            direccion: empleadoInfo.direccion,
            telefono: empleadoInfo.telefono,
            infonavit: empleadoInfo.infonavit,
            fonacot: empleadoInfo.fonacot,
            curp: empleadoInfo.curp,
            rfc: empleadoInfo.rfc,
            nss: empleadoInfo.nss,
            banco: empleadoInfo.id_banco, 
            cuenta: empleadoInfo.cuenta,
            clabe: empleadoInfo.clabe,
            jefe_directo: empleadoInfo.id_jefe_directo,
            fecha_alta: empleadoInfo.fecha_alta,
            sueldo_diario: empleadoInfo.sueldo_diario,
            sueldo_bruto: empleadoInfo.sueldo_bruto,
            sueldo_integrado: empleadoInfo.sueldo_integrado,
        },
        onSubmit: (values) => { 
            onUpdateEmpleado(values)
        },
    })

    const onUpdateEmpleado = async (values) => {
        setErrores({})
        setLoading(true)
        try {
            const { data } = await toast.promise(axios.post(`/capital/empleado/update/${empleadoInfo.id}`, values, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }), {
                pending: 'Actualizando Empleado',
                success: 'Empleado Actualizado'
            })

            setEmpleado(data.empleado)
        } catch (error) {
            setErrores(error.response.data)
            toast(error.response.data.message)
            setLoading(false)
        }
        setLoading(false)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='grid grid-rows-1 gap-5'>
                <div className='grid grid-cols-12 gap-5'>
                    <div className='col-span-6 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Foto</span>
                            { formik.errors.foto_empleado && formik.touched.foto_empleado 
                                ? <span className="label-text-alt text-red-500">{ formik.errors.foto_empleado }</span>
                                : ''
                            }
                        </label>
                        <input disabled={loading} onChange={(e) => formik.setFieldValue('foto_empleado', e.target.files[0])} accept="image/png, image/gif, image/jpeg" type="file" name='foto_empleado' className="file-input file-input-sm file-input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">No. Nomina</span>
                            { formik.errors.nomina && formik.touched.nomina 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="text" maxLength={15} name='nomina' onChange={formik.handleChange} value={formik.values.nomina} placeholder="#" className="input input-sm input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Empresa</span>
                            { formik.errors.empresa && formik.touched.empresa 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            } 
                        </label>
                        <select disabled={loading} name="empresa" onChange={formik.handleChange} value={formik.values.empresa} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            { catalogosCapital.empresas.sort((a, b) => a.empresa.localeCompare(b.empresa)).map((empresa, index) => (
                                <option key={index} value={empresa.empresa}>{empresa.empresa}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-12 gap-5'>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Centro Costo</span>
                            { formik.errors.centro_costo && formik.touched.centro_costo 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            } 
                        </label>
                        <select disabled={loading} name="centro_costo" onChange={formik.handleChange} value={formik.values.centro_costo} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            { catalogosCapital.centro_costos.map((centro) => (
                                <option key={centro.id_centro_costo} value={centro.id_centro_costo}>{centro.centro}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Tipo Costo</span>
                            { formik.errors.tipo_costo && formik.touched.tipo_costo 
                                ? <span className="label-text-alt text-red-500">{formik.errors.tipo_costo}</span>
                                : null
                            } 
                        </label>
                        <select disabled={loading} name="tipo_costo" onChange={formik.handleChange} value={formik.values.tipo_costo} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            <option value="DIRECTO">DIRECTO</option>
                            <option value="INDIRECTO">INDIRECTO</option>
                        </select>
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Ubicacion</span>
                            { formik.errors.ubicacion && formik.touched.ubicacion 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            } 
                        </label>
                        <select disabled={loading} name="ubicacion" onChange={formik.handleChange} value={formik.values.ubicacion} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            { catalogosCapital.ubicaciones.map((ubicacion) => (
                                <option key={ubicacion.id_ubicacion} value={ubicacion.id_ubicacion}>{ubicacion.ubicacion}</option>
                            ))}
                        </select>
                    </div>

                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Pago</span>
                            { formik.errors.pago && formik.touched.pago 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <select disabled={loading} name="pago" onChange={formik.handleChange} value={formik.values.pago} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            <option value={'QUINCENAL'}>QUINCENAL</option>
                            <option value={'SEMANAL'}>SEMANAL</option>
                        </select>
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Area</span>
                            { formik.errors.area && formik.touched.area 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <select disabled={loading} name="area" onChange={formik.handleChange} value={formik.values.area} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            { catalogosCapital.areas.sort((a, b) => a.area.localeCompare(b.area)).map((area, index) => (
                                <option key={index} value={area.area}>{area.area}</option>
                            ))}
                        </select>
                    </div>
                
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Puesto</span>
                            { formik.errors.puesto_organigrama && formik.touched.puesto_organigrama 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <select disabled={loading} name="puesto_organigrama" onChange={formik.handleChange} value={formik.values.puesto_organigrama} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            { catalogosCapital.tabulador.map((tabulador) => (
                                <option key={tabulador.id_tabulador} value={tabulador.id_tabulador}>{tabulador.puesto}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Puesto Especifico</span>
                            { formik.errors.puesto_especifico && formik.touched.puesto_especifico 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type='text' name="puesto_especifico" onChange={formik.handleChange} value={formik.values.puesto_especifico} className="input input-sm input-bordered w-full"/>
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Tipo Puesto</span>
                            { formik.errors.tipo_puesto && formik.touched.tipo_puesto 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <select disabled={loading} name="tipo_puesto" onChange={formik.handleChange} value={formik.values.tipo_puesto} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            <option value={'FIJO'}>FIJO</option>
                            <option value={'TEMPORAL'}>TEMPORAL</option>
                        </select>
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Fecha Nacimiento</span>
                            { formik.errors.fecha_nacimiento && formik.touched.fecha_nacimiento 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="date" name='fecha_nacimiento' onChange={formik.handleChange} value={formik.values.fecha_nacimiento} className="input input-sm  input-bordered w-full" />
                    </div>

                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Sexo</span>
                            { formik.errors.sexo && formik.touched.sexo 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <select disabled={loading} name='sexo' onChange={formik.handleChange} value={formik.values.sexo} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>-- Selecciona --</option>
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMENINO">Femenino</option>
                        </select>
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Nacionalidad</span>
                            { formik.errors.nacionalidad && formik.touched.nacionalidad 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="text" name='nacionalidad' onChange={formik.handleChange} value={formik.values.nacionalidad} className="input input-sm  input-bordered w-full" />
                    </div> 
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Estado Civil</span>
                            { formik.errors.estado_civil && formik.touched.estado_civil 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <select disabled={loading} name='estado_civil' onChange={formik.handleChange} value={formik.values.estado_civil} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>-- Selecciona --</option>
                            <option value="SOLTERO(A)">Soltero(a)</option>
                            <option value="CASADO(A)">Casado(a)</option>
                            <option value="DIVORCIADO(A)">Divorciado(a)</option>
                            <option value="VIUDO(A)">Viudo(a)</option>
                            <option value="CONCUBINATO">Concubinato</option>
                        </select>
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Alias</span>
                            { formik.errors.alias && formik.touched.alias 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} minLength={8} maxLength={8} type="text" name='alias' onChange={formik.handleChange} value={formik.values.alias} placeholder="..." className="input input-sm  input-bordered w-full" />
                    </div>

                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Nombre</span>
                            { formik.errors.nombre && formik.touched.nombre 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="text" name='nombre' onChange={formik.handleChange} value={formik.values.nombre} placeholder="..." className="input input-sm  input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Apellidos</span>
                            { formik.errors.apellidos && formik.touched.apellidos 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="text" name='apellidos' onChange={formik.handleChange} value={formik.values.apellidos} placeholder="..." className="input input-sm  input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Correo</span>
                            { formik.errors.correo && formik.touched.correo 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="email" name='correo' onChange={formik.handleChange} value={formik.values.correo} placeholder="correo@correo.com" className="input input-sm  input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">CP</span>
                            { formik.errors.cp && formik.touched.cp 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="text" name='cp' maxLength={'5'} onChange={formik.handleChange} value={formik.values.cp} placeholder="00000" className="input input-sm  input-bordered w-full" />
                    </div>

                    <div className='col-span-6 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Direccion</span>
                            { formik.errors.direccion && formik.touched.direccion 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="text" name='direccion' placeholder="..." onChange={formik.handleChange} value={formik.values.direccion} className="input input-sm  input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Telefono</span>
                            { formik.errors.telefono && formik.touched.telefono 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="text" maxLength={'20'} name="telefono" onChange={formik.handleChange} value={formik.values.telefono} placeholder="55-" className="input input-sm  input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Infonavit</span>
                        </label>
                        <input disabled={loading} type="text" maxLength={'18'} name="infonavit" onChange={formik.handleChange} value={formik.values.infonavit} placeholder="..." className="input input-sm  input-bordered w-full" />
                    </div>

                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Fonacot</span>
                        </label>
                        <input disabled={loading} type="text" maxLength={'18'} name="fonacot" onChange={formik.handleChange} value={formik.values.fonacot} placeholder="..." className="input input-sm  input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">CURP</span>
                            { formik.errors.curp && formik.touched.curp 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="text" maxLength={'18'} onChange={formik.handleChange} value={formik.values.curp} name="curp" placeholder="XAX1000" className="input input-sm  input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">RFC</span>
                            { formik.errors.rfc && formik.touched.rfc 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="text" maxLength={'13'} name="rfc" onChange={formik.handleChange} value={formik.values.rfc} placeholder="XAXX010101000" className="input input-sm  input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">NSS</span>
                            { formik.errors.nss && formik.touched.nss 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="text" name='nss' placeholder="000" onChange={formik.handleChange} value={formik.values.nss} className="input input-sm  input-bordered w-full" />
                    </div>

                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <label className='label-text'>Banco</label>
                            { formik.errors.banco && formik.touched.banco 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <select type="text" name='banco' value={formik.values.banco} onChange={formik.handleChange} className='select select-sm select-bordered '>
                            <option value="">-- Selecciona --</option>
                            { catalogosCapital.bancos.map((banco) => (
                                <option key={banco.id_banco} value={banco.id_banco}>{ banco.nombre }</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <label className='label-text'>Cuenta</label>
                            { formik.errors.cuenta && formik.touched.cuenta 
                                ? <span className="label-text-alt text-red-500">{ formik.errors.cuenta }</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} minLength={16} maxLength={16} placeholder='000' type="text" name='cuenta' value={formik.values.cuenta} onChange={formik.handleChange} className='input input-sm input-bordered '/>
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Clabe Interbancaria</span>
                            { formik.errors.clabe && formik.touched.clabe 
                                ? <span className="label-text-alt text-red-500">{ formik.errors.clabe }</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} minLength={18} maxLength={18} type="text" name='clabe' placeholder="000" onChange={formik.handleChange} value={formik.values.clabe} className="input input-sm  input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Jefe Directo</span>
                            { formik.errors.jefe_directo && formik.touched.jefe_directo 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <select disabled={loading} name="jefe_directo" onChange={formik.handleChange} value={formik.values.jefe_directo} className="select select-sm select-bordered w-full">
                            <option defaultValue={''}>--Selecciona--</option>
                            { catalogosCapital.jefes_directos.map((jefe) => (
                                <option key={jefe.id_jefe_directo} value={jefe.id_jefe_directo}>{jefe.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Fecha Ingreso</span>
                            { formik.errors.fecha_alta && formik.touched.fecha_alta 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="date" name="fecha_alta" onChange={formik.handleChange} value={formik.values.fecha_alta} className="input input-sm  input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Suelo Diario</span>
                            { formik.errors.sueldo_diario && formik.touched.sueldo_diario 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="number" step={'0.01'} name="sueldo_diario" onChange={formik.handleChange} value={formik.values.sueldo_diario} placeholder="0.00" className="input input-sm  input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Sueldo Bruto</span>
                            { formik.errors.sueldo_bruto && formik.touched.sueldo_bruto 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="number" step={'0.01'} name="sueldo_bruto" onChange={formik.handleChange} value={formik.values.sueldo_bruto} placeholder="0.00" className="input input-sm  input-bordered w-full" />
                    </div>
                    <div className='col-span-3 form-control'>
                        <label className="label font-semibold">
                            <span className="label-text">Sueldo Integrado</span>
                            { formik.errors.sueldo_integrado && formik.touched.sueldo_integrado 
                                ? <span className="label-text-alt text-red-500">Obligatorio</span>
                                : null
                            }
                        </label>
                        <input disabled={loading} type="number" step={'0.01'} name="sueldo_integrado" onChange={formik.handleChange} value={formik.values.sueldo_integrado} placeholder="0.00" className="input input-sm  input-bordered w-full" />
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-5 mt-3'>
                    { Object.keys(errores).length > 0 && 
                        <span className="label-text-alt text-red-500">{errores.message}</span>
                    }
                    <button disabled={loading} type='submit' className='btn btn-sm btn-secondary'>Editar Empleado</button>
                </div>
            </div>
        </form>    
    )
}

export default FormEditaEmpleado