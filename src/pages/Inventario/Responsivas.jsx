import { useContext, useState } from "react"
import TablaAsignaciones from "../../components/Inventario/Responsivas/TablaAsignaciones"
import ModalNuevaAsignacion from "../../components/Inventario/Responsivas/Modales/ModalNuevaAsignacion"
import PageError from "../../components/UI/PageError"
import { AuthContext } from "../../context/AuthContext"

const Responsivas = () => {

    const { sistemasAcceso } = useContext(AuthContext)
    
    const [ responsivas, setResponsivas ] = useState([])
    const [ responsivasPagination, setResponsivasPagination ] = useState([])

    //MODALES
    const [ modalAsignacion, setModalAsignacion ] = useState(false)

    if(!sistemasAcceso.inventario) return <PageError/>

    return (
        <div>
            { modalAsignacion && ( 
                <ModalNuevaAsignacion
                    setModalAsignacion={setModalAsignacion}    
                    setResponsivas={setResponsivas}
                    setResponsivasPagination={setResponsivasPagination}
                /> 
            )}
                
            <div className="card">
                <div className="card-body py-5 bg-white rounded-lg">
                    <TablaAsignaciones
                        responsivas={responsivas}
                        setResponsivas={setResponsivas}
                        responsivasPagination={responsivasPagination}
                        setResponsivasPagination={setResponsivasPagination}
                        setModalAsignacion={setModalAsignacion}
                    />
                </div>
            </div>
        </div>
    )
}

export default Responsivas