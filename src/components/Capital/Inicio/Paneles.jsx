import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AiOutlineFileDone  } from "react-icons/ai";

//APIS
import axios from '../../../axios/axios.config'

const Grafica = ({ reportes, setReportes }) => {

    ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const [ altas, setAltas ] = useState([]);
    const [ bajas, setBajas ] = useState([]);
    const [ empleados, setEmpleados ] = useState(0);
    const [ empleadosBaja, setEmpleadosBaja ] = useState(0);
    const [ altasMes, setAltasMes ] = useState(0);
    const [ bajasMes, setBajasMes ] = useState(0);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Altas VS Bajas',
          },
        },
    };
      
    const labels = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    const data = {
      labels,
      datasets: [
        {
          label: "Altas",
          data: altas.map((alta) => alta.total_altas),
          borderColor: "rgb(14, 211, 47)",
          backgroundColor: "rgba(14, 211, 47, 0.5)",
        },
        {
          label: "Bajas",
          data: bajas.map((alta) => alta.total_bajas),
          borderColor: "rgb(211, 17, 14 )",
          backgroundColor: "rgba(211, 17, 14 , 0.5)",
        },
      ],
    };

    useEffect(() => {
        const onObtenerDatos = async () => {
            try {
                const { data } = await axios.get('/capital/dashboard');
                setAltas(data.altas)
                setBajas(data.bajas)
                setEmpleados(data.empleados)
                setEmpleadosBaja(data.empleados_baja)
                setAltasMes(data.altas_mes);
                setBajasMes(data.bajas_mes);
            } catch (error) {
                console.log(error)
            }
        }
        onObtenerDatos()
    }, [])

    return (
      <div className="grid grid-rows-1 gap-5">
            <div className={`grid grid-cols-12 gap-5`}>
                <div className="col-span-5 bg-white rounded-lg">
                    <div className='p-2 h-auto'>
                      <Line options={options} data={data} height={"100%"}/>
                    </div>
                </div>
                
                <div className="col-span-7 bg-white rounded-lg">
                    <div className='p-2'>
                        <h1 className='font-semibold'>Capital Humano { new Date().getFullYear() }</h1>
                    </div>
                    <div className='flex h-40 flex-col justify-between p-2'>
                      <div className="stats shadow border-2 border-gray-300">
                        <div className="stat p-3">
                          <div className="stat-title text-xs text-black">Empleados Activos</div>
                          <div className="stat-value text-2xl">{ empleados }</div>
                        </div>
                        <div className="stat p-3">
                          <div className="stat-title text-xs text-black">Altas Del Mes</div>
                          <div className="stat-value text-2xl text-green-500">{ altasMes }</div>
                        </div>
                        <div className="stat p-3">
                          <div className="stat-title text-xs text-black">Bajas Del Mes</div>
                          <div className="stat-value text-2xl text-red-500">{ bajasMes }</div>
                        </div>
                      </div>                      
                      <button onClick={() => setReportes(!reportes)} className='transition duration-200 w-2/12 p-1 border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:bg-gray-300'>
                          <AiOutlineFileDone  className='text-2xl'/>
                          <h1 className='text-xs font-semibold'>Reportes</h1>
                      </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Grafica