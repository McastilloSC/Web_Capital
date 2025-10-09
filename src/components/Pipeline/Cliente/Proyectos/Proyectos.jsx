import { useState } from "react"
import { AiTwotoneSetting } from "react-icons/ai";
import TablaProyectos from "./TablaProyectos"

const Proyectos = () => {

    const [ proyectos, setProyectos ] = useState([])
    const [ proyectosPagination, setProyectosPagination ] = useState([])
    
    return (
        <div>
            <div className="bg-white flex justify-between p-3 border-b-2 rounded-t-lg border-gray-300">
                <div className="flex">
                    <span className="font-semibold">Proyectos Registrados</span>
                    <AiTwotoneSetting className="text-2xl ml-2 hover:animate-spin" />
                </div>
            </div>
            <div className="grid grid-rows-1">
                <div className="grid grid-cols-1">

                    <div className="card">
                        <div className="card-body px-5 py-3 bg-gray-100 rounded-b-lg">
                            <TablaProyectos 
                                setProyectos={setProyectos}
                                proyectos={proyectos}
                                setProyectosPagination={setProyectosPagination}
                                proyectosPagination={proyectosPagination}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Proyectos