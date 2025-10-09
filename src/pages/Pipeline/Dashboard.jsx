import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, LinearScale, Title, CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useContext, useEffect, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { AuthContext } from '../../context/AuthContext';
import PageError from '../../components/UI/PageError';

//APIS
import axios from '../../axios/axios.config';
import { CatalogosContext } from '../../context/CatalogosContext';

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend, BarElement, Title, LinearScale, ChartDataLabels);

const Dashboard = () => {

    const { catalogosPipeline } = useContext(CatalogosContext)

    const [ valorProspeccion, setValorProspeccion ] = useState(0)
    const [ valorPipeline, setValorPipeline ] = useState(0)
    const [ contribucionAnual, setContribucionAnual ] = useState(0)
    const [ toAnualPorFase, setToAnualPorFase ] = useState({})
    const [ toAnualPorDivision, setToAnualPorDivision ] = useState({})
    const [ toAnualPorEjecutivo, setToAnualPorEjecutivo ] = useState({})
    const [ tablaValorProyecto, setTablaValorProyecto ] = useState([])
    const [ tablaPorAntiguedad, setTablaPorAntiguedad ] = useState([])
    const [ tablaTopProspectos, setTablaTopProspectos ] = useState([])
    const [ factorConversionClientes, setFactorConversionClientes ] = useState(0);
    const [toAnualPorEmpresa, setToAnualPorEmpresa] = useState({});


    //Query Params
    const [ empresas, setEmpresas ] = useState([]);

    const dataToAnualFase = {
        labels: toAnualPorFase.fases,
        datasets: [
          {
            label: 'TO Anual',
            data: toAnualPorFase.montos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.9)',
              'rgba(54, 162, 235, 0.9)',
              'rgba(255, 206, 86, 0.9)',
              'rgba(70, 33, 238, 0.9)',
              'rgba(151, 245, 53, 0.9)',
              'rgba(245, 139, 53, 0.8)',
              'rgba(75, 192, 192, 0.9)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(70, 33, 238, 1)',
              'rgba(151, 245, 53, 1)',
              'rgba(245, 139, 53, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 3,
          },
        ],
    };

    const dataToAnualDivision = {
        labels: toAnualPorDivision.divisiones,
        datasets: [
          {
            label: 'TO Anual',
            data: toAnualPorDivision.montos,
            backgroundColor: [
              'rgba(255, 99, 132, 0.9)',
              'rgba(54, 162, 235, 0.9)',
              'rgba(255, 206, 86, 0.9)',
              'rgba(75, 192, 192, 0.9)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    const dataToAnualEjecutivo = {
        labels: toAnualPorEjecutivo.ejecutivos,
        datasets: [
            {
                axis: 'y',
                fill: false,
                label: 'TO Anual',
                data: toAnualPorEjecutivo.montos,
                backgroundColor: 'rgba(50, 19, 223, 0.8)',
            },
        ],
    };

    const dataToAnualEmpresa = {
    labels: toAnualPorEmpresa.empresas,
    datasets: [
        {
        axis: 'y',
        label: 'TO Anual',
        data: toAnualPorEmpresa.montos,
        backgroundColor: [
            'rgba(255, 159, 64, 0.8)',
            'rgb(235, 137, 124)',
            'rgb(255, 86, 232)',
        ] 
        },
    ],
    };

    const optionsChartToFase = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'left',
          },
          datalabels: {
            display: false,
            color: 'white',
            labels:{
                title:{
                    font:{
                        size: 11
                    }
                }
            }
         }
        },
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 10,
                bottom: 10
            },
        },
    };

    const optionsChartToDivision = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
          datalabels: {
            display: false,
            color: 'white',
            labels:{
                title:{
                    font:{
                        size: 11
                    }
                }
            }
         }
        },
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 10,
                bottom: 10
            },
        },
    };

    const optionsBar = {
        responsive: true,
        options: {
            indexAxis: 'y',
          },
        plugins: {
          legend: {
            display: false,
            position: 'center',
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 1
                }
            }
          },
          datalabels: {
            display: false,
            color: 'white',
            labels:{
                title:{
                    font:{
                        size: 10
                    }
                }
            }
         }
        },
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 1,
                right: 1,
                top: 20,
                bottom: 20
            },
        }
    };

    const { sistemasAcceso } = useContext(AuthContext)

    useEffect(() => {
        const onObtenerEstadisticas = async () => {
            try {
                const { data } = await axios.get('pipeline/dashboard', {
                    params:{
                        'empresas' : empresas,
                    }
                })
                setFactorConversionClientes(data.factor_conversion.factor_conversion)
                setValorProspeccion(new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(data.valor_prospeccion / 1000000))
                setValorPipeline(new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(data.valor_pipeline / 1000000))
                setContribucionAnual(new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(data.contribucion_anual / 1000000))
                setToAnualPorFase(data.to_anual_fase)
                setToAnualPorDivision(data.to_anual_division)
                setToAnualPorEjecutivo(data.to_por_ejecutivo)
                setTablaValorProyecto(data.tabla_valor_proyecto)
                setTablaPorAntiguedad(data.tabla_por_antiguedad)
                setTablaTopProspectos(data.tabla_prospectos)
                setToAnualPorEmpresa(data.to_por_empresa);
            } catch (error) {
                console.log(error)
            }
        }
        onObtenerEstadisticas()
    }, [empresas])

    const onFiltroEmpresas = async (idEmpresa, checked) => {
        if(checked){
            setEmpresas([...empresas, idEmpresa])
            return
        }

        const arrayFilter = empresas.filter(empresa => {
            return empresa != idEmpresa
        })
        setEmpresas(arrayFilter)
    }

    if(!sistemasAcceso.pipeline) return <PageError/>

    return (
        <div className="grid grid-rows-1">
            <div className='w-full mb-3 rounded-lg'>
                <div className='flex items-end justify-start space-x-3 p-3'>
                    { catalogosPipeline.empresas.map((empresa) => (
                        <div key={empresa.id_empresa} className='flex items-end'>
                            <input key={empresa.id_empresa} type='checkbox' value={empresa.id_empresa} onChange={(e) => onFiltroEmpresas(e.target.value, e.target.checked)} className='checkbox bg-white checkbox-sm border-2 border-gray-400'/>
                            <h1 className='ml-1 font-semibold text-xs'>{empresa.empresa}</h1>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-4 gap-5 mb-10">
                <div className='col-span-1'>
                    <div className='card'>
                        <div className="stats shadow">
                            <div className="stat bg-gray-600 text-center  p-3">
                                <div className="stat-value font-semibold text-3xl text-white">{valorProspeccion} mill</div>
                                <div className="stat-desc font-normal mt-1 text-gray-100">Valor Prospeccion</div>
                            </div>    
                        </div>
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='card'>
                        <div className="stats shadow">
                            <div className="stat bg-gray-600 text-center  p-3">
                                <div className="stat-value font-semibold text-3xl text-white">{valorPipeline} mill</div>
                                <div className="stat-desc font-normal mt-1 text-gray-100">Valor Pipeline</div>
                            </div>    
                        </div>
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='card'>
                        <div className="stats shadow">
                            <div className="stat bg-gray-600 text-center p-3">
                                <div className="stat-value font-semibold text-3xl text-white">$0 mill</div>
                                <div className="stat-desc font-normal mt-1 text-gray-100">Contribucion Actual</div>
                            </div>    
                        </div>
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='card'>
                        <div className="stats shadow">
                            <div className="stat bg-gray-600 text-center  p-3">
                                <div className="stat-value font-semibold text-3xl text-white">{contribucionAnual} mill</div>
                                <div className="stat-desc font-normal mt-1 text-gray-100">Valor Contrato Anual</div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-5 mb-10">
                <div className='col-span-4 h-60 flex flex-col justify-center items-center'>
                    <div className='bg-gray-600 w-full rounded-t-lg p-2'>
                        <h1 className='font-semibold text-sm text-white'>TO Anual por fase</h1>
                    </div>
                    <Doughnut data={dataToAnualFase} options={optionsChartToFase} className='border-2 bg-white rounded-lg border-gray-300'/>
                </div>
                <div className='col-span-4 h-60 flex flex-col justify-center items-center'>
                    <div className='bg-gray-600 w-full rounded-t-lg p-2'>
                        <h1 className='font-semibold text-sm text-white'>TO Anual por Division</h1>
                    </div>
                    <Doughnut data={dataToAnualDivision} options={optionsChartToDivision} className='border-2 bg-white rounded-lg border-gray-300'/>
                </div>
                <div className='col-span-4 h-60 flex flex-col justify-center items-center'>
                    <div className='bg-gray-600 w-full rounded-t-lg p-2'>
                        <h1 className='font-semibold text-sm text-white'>Top 5 TO Anual por Ejecutivo</h1>
                    </div>
                    <h1 className='font-bold'></h1>
                    <Bar options={optionsBar} data={dataToAnualEjecutivo} className='border-2 bg-white rounded-lg border-gray-300'/>
                </div>
                <div className='col-span-4 h-60 flex flex-col justify-center items-center mt-10'>
                    <div className='bg-gray-600 w-full rounded-t-lg p-2'>
                        <h1 className='font-semibold text-sm text-white'>Top 5 TO Anual por Empresa</h1>
                    </div>
                    <Bar data={dataToAnualEmpresa} options={optionsBar} className='border-2 bg-white rounded-lg border-gray-300' />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-5">
                <div className='card'>
                    <div className="card-body p-0 bg-white rounded-lg">
                        <div className='bg-gray-600 rounded-t-lg p-2'>
                            <h1 className='font-semibold text-sm text-white'>Top 15 Por Valor de Proyecto</h1>
                        </div>
                        <div className='px-2'>
                            <table className="table table-xs table-zebra">
                                <thead>
                                    <tr>
                                        <th className='bg-gray-300 text-gray-700'>Cliente</th>
                                        <th className='bg-gray-300 text-gray-700'>TO Anual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { tablaValorProyecto.map((proyecto, index) => (
                                        <tr key={proyecto.id_proyecto}>
                                            <td className='text-xs font-semibold'>{index + 1}.-{proyecto.proyecto}</td>
                                            <td className='text-xs font-semibold'>${proyecto.monto}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className="card-body p-0 bg-white rounded-lg">
                        <div className='bg-gray-600 rounded-t-lg p-2'>
                            <h1 className='font-semibold text-sm text-white'>Top 15 Antiguedad</h1>
                        </div>
                        <div className='h-auto px-2'>
                            <table className="table table-xs table-zebra">
                                <thead>
                                    <tr>
                                        <th className='bg-gray-300 text-gray-700'>Cliente</th>
                                        <th className='bg-gray-300 text-gray-700'>TO Anual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { tablaPorAntiguedad.map((antiguedad, index) => (
                                        <tr key={antiguedad.id_proyecto}>
                                            <td className='text-xs font-semibold'>{index+1}.-{antiguedad.proyecto}</td>
                                            <td className='text-xs font-semibold'>${antiguedad.monto}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className="card-body p-0 bg-white rounded-lg">
                        <div className='bg-gray-600 rounded-t-lg p-2'>
                            <h1 className='font-semibold text-sm text-white'>Top 15 Prospectos</h1>
                        </div>
                        <div className='h-auto px-2'>
                            <table className="table table-xs table-zebra">
                                <thead>
                                    <tr>
                                        <th className='bg-gray-300 text-gray-700'>Cliente</th>
                                        <th className='bg-gray-300 text-gray-700'>TO Anual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { tablaTopProspectos.map((prospecto, index) => (
                                        <tr key={prospecto.id_prospecto}>
                                            <td className='text-xs font-semibold'>{index + 1}.-{ prospecto.proyecto }</td>
                                            <td className='text-xs font-semibold'>${prospecto.monto}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='card'>
                        <div className="card-body p-2 bg-gray-700 rounded-lg">
                            <h1 className='text-center text-white font-semibold text-4xl'>{factorConversionClientes}%</h1>
                            <p className='text-center text-white'>Factor Conversion Clientes</p>
                        </div>
                    </div>
                    <div className='card mt-5'>
                        <div className="card-body p-2 bg-gray-700 rounded-lg">
                            <h1 className='text-center text-white font-semibold text-4xl'>0.00%</h1>
                            <p className='text-center text-white'>Factor Conversion Ingreso</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard