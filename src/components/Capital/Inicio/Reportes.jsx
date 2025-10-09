import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import * as Yup from 'yup';

//APIS
import axios from '../../../axios/axios.config'

const Reportes = () => {

    const registroSchema = Yup.object().shape({ 
        reporte: Yup.string().required('Obligatorio'),
        fecha_inicio: Yup.date().required('Obligatorio'),
        fecha_fin: Yup.date().required('Obligatorio'),
    })

    const formik = useFormik({
        validationSchema: registroSchema,
        initialValues: {
            reporte: '',
            fecha_inicio: '',
            fecha_fin: '',
        },
        onSubmit: (values) => {
            onGenerarReporte(values)
        },
    })

    const onGenerarReporte = async (values) => {
        try {
            const { data } = await toast.promise(axios.post('/capital/reportes', values, {
                responseType: 'blob'
            }), {
                pending: 'Generando Reporte',
                success: 'Reporte Generado',
            });
            
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            const link = document.createElement('a');
            link.download = 'Reporte_Generado.xlsx';
            link.href = URL.createObjectURL(blob);
            link.click();

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='grid grid-cols-1'>
            <div className='card'>
                <div className='card-body rounded-lg bg-white p-0'>
                    <div className='p-2 px-5 rounded-t-lg flex justify-between items-center'>
                        <h1 className='font-semibold text-lg'>Generacion Reportes</h1>
                    </div>
                    <div className='px-3 bg-gray-100'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='grid grid-rows-1 mb-5'>
                                <div className='grid grid-cols-4 gap-5'>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Tipo Reporte</span>
                                            {formik.errors.reporte && formik.touched.reporte ? (
                                                <span className="label-text-alt text-red-500">{formik.errors.reporte}</span>
                                            ) : ''}
                                        </label>
                                        <select name='reporte' value={formik.values.reporte} onChange={formik.handleChange} className="select select-sm border-2 select-bordered w-full">
                                            <option defaultValue={''}>--Selecciona--</option>
                                            <option value={'INCIDENCIAS'}>Incidencias</option>
                                            <option value={'TIEMPO_EXTRA'}>Tiempo Extra</option>
                                            <option value={'CUMPLEAÑOS'}>Cumpleaños</option>
                                        </select>
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Fecha Inicio</span>
                                            {formik.errors.fecha_inicio && formik.touched.fecha_inicio ? (
                                                <span className="label-text-alt text-red-500">{formik.errors.fecha_inicio}</span>
                                            ) : ''}
                                        </label>
                                        <input type="date" name='fecha_inicio' value={formik.values.fecha_inicio} onChange={formik.handleChange}  className="input input-sm border-2 input-bordered w-full" />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Fecha fin</span>
                                            {formik.errors.fecha_fin && formik.touched.fecha_fin ? (
                                                <span className="label-text-alt text-red-500">{formik.errors.fecha_fin}</span>
                                            ) : ''}
                                        </label>
                                        <input type="date" name='fecha_fin' value={formik.values.fecha_fin} onChange={formik.handleChange} className="input input-sm border-2 input-bordered w-full" />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text">Confirmar</span>
                                        </label>
                                        <button type='submit' className='btn btn-sm btn-secondary' >Generar Reporte</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reportes