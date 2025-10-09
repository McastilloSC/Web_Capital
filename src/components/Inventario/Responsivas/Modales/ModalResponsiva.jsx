import { useEffect, useState } from "react"
import { Document, Page, pdfjs } from 'react-pdf'
import { BsXLg, BsArrowCounterclockwise, BsArrowClockwise } from "react-icons/bs";

//APIS
import axios from '../../../../axios/axios.config'
import LoadingDiv from "../../../UI/LoadingDiv"

const ModalResponsiva = ({ setModalResponsiva, seleccionResponsiva }) => {
    
    const [ loading, setLoading ] = useState(true)
    const [ responsivas, setResponsivas ] = useState([])
    const [ seleccion, setSeleccion ] = useState(0)
    const [ rotacion, setRotacion ] = useState(0)

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
    ).toString();



    useEffect(() => {
        const onObtenerArchivo = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get(`/inventario/responsivas/archivo/${seleccionResponsiva}`)
                setResponsivas(data.responsiva)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
            setLoading(false)
        }
        onObtenerArchivo()
    }, [seleccionResponsiva])
    
    return (
        <div>
            <input type="checkbox" id="modal_responsiva" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl relative">
                    <button onClick={() => setModalResponsiva(false)} className="btn btn-sm btn-circle btn-accent absolute right-2 top-2">
                        ✕
                    </button>
                    <h3 className="font-bold text-lg">Responsiva Asignada</h3>
                    <div className="h-auto p-0 flex flex-col justify-center items-center overflow-y-auto">
                        { loading
                            ? <LoadingDiv>Buscando Responsiva</LoadingDiv>
                            : (
                                <Document rotate={rotacion} className='mx-auto' file={`data:application/pdf;base64,${responsivas[seleccion]}`} onLoadError={console.log}>
                                    <Page pageNumber={1} />
                                </Document>
                            )
                        }

                        <div className="join my-3">
                            { responsivas.map((responsiva, index) => (
                                <button onClick={() => setSeleccion(index)} key={index} className="join-item btn">{ index + 1 }</button>
                            ))}
                        </div>

                        { responsivas.length > 0 && (
                            <div className="flex space-x-5">
                                <button onClick={() => setRotacion(rotacion > 0 && rotacion <= 270 ? rotacion - 90 : + 0)} className="btn ">
                                    <BsArrowCounterclockwise className="text-2xl"/>
                                </button >
                                <button onClick={() => setRotacion(rotacion >= 0 && rotacion <= 270 ? rotacion + 90 : + 0)} className="btn">
                                    <BsArrowClockwise className="text-2xl"/>
                                </button>
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalResponsiva