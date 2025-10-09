const LoadingTable = ({ columnas, filas = 5 }) => {

    // Función para renderizar las celdas de una fila
   const renderCells = () => {
       const cells = [];
       for (let i = 0; i < columnas; i++) {
       cells.push(
           <td className='p-3' key={i}>
               <div className='skeleton h-4 w-full'></div>
           </td>
       );
       }
       return cells;
   };

   // Función para renderizar múltiples filas
   const renderRows = () => {
       const rows = [];
       for (let i = 0; i < filas; i++) {
           rows.push(
               <tr key={i}>
                   {renderCells()}
               </tr>
           );
       }
       return rows;
   };

   return renderRows(5)
}

export default LoadingTable