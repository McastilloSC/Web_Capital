// import { useEffect, useState } from "react"

// import axios from '../../../../axios/axios.config'
// import LoadingDiv from "../../../UI/LoadingDiv";

// const ModalEquipoAsignado = ({ setModalEquipoEmpleado, seleccionEmpleado }) => {

//     const [ loading, setLoading ] = useState(true)
//     const [ imagenes, setImagenes ] = useState([]);


//     useEffect(() => {
//         const onObtenerArchivo = async () => {
//             setLoading(true)
//             try {
//                 const { data } = await axios.get(`/inventario/equipos/empleado/${seleccionEmpleado}`)
//                 console.log(data)
//                 setImagenes(data.imagenes)
//             } catch (error) {
//                 console.log(error)
//                 setLoading(false)
//             }
//             setLoading(false)
//         }
//         onObtenerArchivo()
//     }, [seleccionEmpleado])

//     return (
//         <div>
//             <input type="checkbox" id="modal_equipo_empleado" className="modal-toggle" />
//                 <div className="modal">
//                 <div className="modal-box w-11/12 max-w-5xl">
//                     <h3 className="font-bold text-lg">Equipo Asignado</h3>
//                     <div className='divider'></div>
//                     { loading
//                         ? <LoadingDiv>Cargando Equipos</LoadingDiv>
//                         : imagenes.length > 0 
//                             ? (
//                                 <>
//                                     <div className="carousel w-full">
//                                         { imagenes.map((imagen) => (
//                                             <div key={imagen.id_imagen} id={imagen.id_imagen} className="carousel-item relative w-full">
//                                                 <img src={imagen.nombre} className="w-70 h-60 mx-auto" />
//                                             </div> 
//                                         ))}
//                                     </div>
//                                     <div className="flex justify-center w-full py-2 gap-2">
//                                         { imagenes.map((imagen, index) => (
//                                             <a key={imagen.id_imagen} href={`#${imagen.id_imagen}`} className="btn btn-sm bg-gray-300 text-gray-900">{index + 1}</a> 
//                                         ))}
//                                     </div>
//                                 </>
//                             ) : (
//                                 <div className="bg-gray-400 p-3 rounded-xl">
//                                     <h1 className="text-white text-center">Sin Equipo Asignado</h1>
//                                 </div>
//                             )
//                     }
//                     <div className="modal-action">
//                         <label htmlFor="modal_equipo_empleado" onClick={() => setModalEquipoEmpleado(false) } className="btn btn-sm btn-accent">Cancelar</label>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ModalEquipoAsignado


import { useEffect, useState } from "react";
import axios from '../../../../axios/axios.config';
import LoadingDiv from "../../../UI/LoadingDiv";
import { BsXLg } from "react-icons/bs";

const ModalEquipoAsignado = ({ setModalEquipoEmpleado, seleccionEmpleado }) => {
  const [loading, setLoading] = useState(true);
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const onObtenerArchivo = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/inventario/equipos/empleado/${seleccionEmpleado}`);
        setImagenes(data.imagenes);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    onObtenerArchivo();
  }, [seleccionEmpleado]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-11/12 max-w-5xl rounded-lg p-4 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">Equipo Asignado</h3>
          <button
            onClick={() => setModalEquipoEmpleado(false)}
            className="hover:text-red-500 cursor-pointer"
          >
            <BsXLg className="text-2xl" />
          </button>
        </div>

        <div className="divider"></div>

        {loading ? (
          <LoadingDiv>Cargando Equipos</LoadingDiv>
        ) : imagenes.length > 0 ? (
          <>
            <div className="carousel w-full">
              {imagenes.map((imagen) => (
                <div
                  key={imagen.id_imagen}
                  id={imagen.id_imagen}
                  className="carousel-item relative w-full"
                >
                  <img src={imagen.nombre} className="w-70 h-60 mx-auto" />
                </div>
              ))}
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
              {imagenes.map((imagen, index) => (
                <button
                  key={imagen.id_imagen}
                  onClick={() => {
                    const element = document.getElementById(imagen.id_imagen);
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn btn-sm bg-gray-300 text-gray-900"
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-gray-400 p-3 rounded-xl">
            <h1 className="text-white text-center">Sin Equipo Asignado</h1>
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setModalEquipoEmpleado(false)}
            className="btn btn-sm btn-accent"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEquipoAsignado;
