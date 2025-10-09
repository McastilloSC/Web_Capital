import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from "chart.js";
import { Line } from "react-chartjs-2";

const GraficaClientesProyectos = ({ grafica }) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Clientes y Proyectos por Mes',
        },
      },
  };
  
  const labels = grafica.clientes.meses;
  
  const data = {
      labels,
      datasets: [
        {
          label: 'Clientes',
          data: grafica.clientes.totales,
          borderColor: 'rgb(14, 211, 47)',
          backgroundColor: 'rgba(14, 211, 47)',
        },
        {
          label: 'Proyectos',
          data: grafica.proyectos.totales,
          borderColor: 'rgba(14, 132, 250 , 0.9)',
          backgroundColor: 'rgba(14, 132, 250 , 0.9)',
        },
      ],
  };

  return (
      <Line options={options} data={data} height={100}/>
  )
}

export default GraficaClientesProyectos