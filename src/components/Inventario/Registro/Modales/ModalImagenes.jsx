import { useEffect, useState } from "react"

//APIS
import axios from '../../../../axios/axios.config'
import LoadingDiv from "../../../UI/LoadingDiv";

const ModalImagenes = ({ setModalImagenes, seleccionEquipo }) => {
    
    const [ imagenes, setImagenes ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const onObtenerImagenes = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/inventario/equipos/imagenes/${seleccionEquipo}`)
                setImagenes(data.imagenes)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
            setLoading(false)
        }
        onObtenerImagenes()
    }, [seleccionEquipo])

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="modal_imagenes" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <button onClick={() => setModalImagenes(false)} className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">
                        ✕
                    </button>
                    <h3 className="font-bold text-lg">Imagenes del Equipo</h3>
                    <div className="divider"></div>
                    { loading
                        ? <LoadingDiv>Cargando Imagenes</LoadingDiv> 
                        : (
                            <>
                                <div className="carousel w-full">
                                    { imagenes.map((imagen) => (
                                        <div key={imagen.id_equipo_imagen} id={imagen.id_equipo_imagen} className="carousel-item relative w-full">
                                            <img src={imagen.nombre} className="w-70 h-60 mx-auto" />
                                        </div> 
                                    ))}
                                </div>
                                <div className="flex justify-center w-full py-2 gap-2">
                                    { imagenes.map((imagen, index) => (
                                        <a key={imagen.id_equipo_imagen} href={`#${imagen.id_equipo_imagen}`} className="btn btn-sm bg-gray-300 text-gray-900">{index + 1}</a> 
                                    ))}
                                </div>
                            </>
                        )
                    }                    
                </div>
            </div>
        </div>
    )
}

export default ModalImagenes