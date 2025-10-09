import { useContext, useEffect, useState } from "react"
import PageError from "../../components/UI/PageError"
import { AuthContext } from "../../context/AuthContext"

const Inicio = () => {

    const { sistemasAcceso } = useContext(AuthContext)

    const data = [
        {
            id_equipo: 1,
            marca: 'ACER',
            tipo: 'LAPTOP',
            estatus: 1,
            imagenes: [
                { 
                    id_imagen: 1,
                    url: 'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/a7e26edf-2362-4325-81df-cbcc5c2000bb.fd4392ba63e96c1c40b093aae4386a41.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
                },
                { 
                    id_imagen: 2,
                    url: 'https://compuexpresstijuana.com.mx/wp-content/uploads/2022/12/LAPTOP-GAMER-ACER-NITRO-5-AN515-57-721J-15.6-FULL-HD-INTEL-CORE-I7-11800H-2.30GHZ-8GB-512GB-SSD-NVIDIA-GEFORCE-RTX-3050-WINDOWS-11-HOME-64-BIT-ESPANOL-NEGRO-1.jpg',
                },
                { 
                    id_imagen: 3,
                    url: 'https://www.officedepot.com.mx/medias/100097567-2.jpg-515ftw?context=bWFzdGVyfHJvb3R8NTI3ODB8aW1hZ2UvanBlZ3xoNTUvaGZhLzExOTMyMjIwNjg2MzY2LzEwMDA5NzU2Ny0yLmpwZ181MTVmdHd8NGQxYzZjZjE4NWVjOTZiNzdkZWM1OTAzYTU4Njc3OTA2ODk3ZTcyMTc3MDNjMjgzY2Q3ZDllZWM4NmU3Zjc3NQ',
                }
            ]
        },
        {
            id_equipo: 2,
            marca: 'LENOVO',
            tipo: 'LAPTOP',
            estatus: 1,
            imagenes: [
                { 
                    id_imagen: 5,
                    url: 'https://compuexpresstijuana.com.mx/wp-content/uploads/2022/12/LAPTOP-GAMER-ACER-NITRO-5-AN515-57-721J-15.6-FULL-HD-INTEL-CORE-I7-11800H-2.30GHZ-8GB-512GB-SSD-NVIDIA-GEFORCE-RTX-3050-WINDOWS-11-HOME-64-BIT-ESPANOL-NEGRO-1.jpg',
                },
            ]
        },
        {
            id_equipo: 3,
            marca: 'SAMSUMG',
            tipo: 'CELULAR',
            estatus: 1,
            imagenes: [
                { 
                    id_imagen: 7,
                    url: 'https://cdn1.coppel.com/images/catalog/pm/2985563-1.jpg',
                },
                { 
                    id_imagen: 8,
                    url: 'https://www.notebookcheck.org/fileadmin/Notebooks/Samsung/Galaxy_A14_5G/Bild_Samsung_Galaxy_A14_5G_Intro.jpg',
                },
            ]
        },
        {
            id_equipo: 1,
            marca: 'ACER',
            tipo: 'LAPTOP',
            estatus: 1,
            imagenes: [
                { 
                    id_imagen: 1,
                    url: 'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/a7e26edf-2362-4325-81df-cbcc5c2000bb.fd4392ba63e96c1c40b093aae4386a41.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
                },
                { 
                    id_imagen: 2,
                    url: 'https://compuexpresstijuana.com.mx/wp-content/uploads/2022/12/LAPTOP-GAMER-ACER-NITRO-5-AN515-57-721J-15.6-FULL-HD-INTEL-CORE-I7-11800H-2.30GHZ-8GB-512GB-SSD-NVIDIA-GEFORCE-RTX-3050-WINDOWS-11-HOME-64-BIT-ESPANOL-NEGRO-1.jpg',
                },
                { 
                    id_imagen: 3,
                    url: 'https://www.officedepot.com.mx/medias/100097567-2.jpg-515ftw?context=bWFzdGVyfHJvb3R8NTI3ODB8aW1hZ2UvanBlZ3xoNTUvaGZhLzExOTMyMjIwNjg2MzY2LzEwMDA5NzU2Ny0yLmpwZ181MTVmdHd8NGQxYzZjZjE4NWVjOTZiNzdkZWM1OTAzYTU4Njc3OTA2ODk3ZTcyMTc3MDNjMjgzY2Q3ZDllZWM4NmU3Zjc3NQ',
                }
            ]
        },
        {
            id_equipo: 2,
            marca: 'LENOVO',
            tipo: 'LAPTOP',
            estatus: 1,
            imagenes: [
                { 
                    id_imagen: 5,
                    url: 'https://compuexpresstijuana.com.mx/wp-content/uploads/2022/12/LAPTOP-GAMER-ACER-NITRO-5-AN515-57-721J-15.6-FULL-HD-INTEL-CORE-I7-11800H-2.30GHZ-8GB-512GB-SSD-NVIDIA-GEFORCE-RTX-3050-WINDOWS-11-HOME-64-BIT-ESPANOL-NEGRO-1.jpg',
                },
            ]
        },
        {
            id_equipo: 3,
            marca: 'SAMSUMG',
            tipo: 'CELULAR',
            estatus: 1,
            imagenes: [
                { 
                    id_imagen: 7,
                    url: 'https://cdn1.coppel.com/images/catalog/pm/2985563-1.jpg',
                },
                { 
                    id_imagen: 8,
                    url: 'https://www.notebookcheck.org/fileadmin/Notebooks/Samsung/Galaxy_A14_5G/Bild_Samsung_Galaxy_A14_5G_Intro.jpg',
                },
            ]
        },
        {
            id_equipo: 1,
            marca: 'ACER',
            tipo: 'LAPTOP',
            estatus: 1,
            imagenes: [
                { 
                    id_imagen: 1,
                    url: 'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/a7e26edf-2362-4325-81df-cbcc5c2000bb.fd4392ba63e96c1c40b093aae4386a41.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
                },
                { 
                    id_imagen: 2,
                    url: 'https://compuexpresstijuana.com.mx/wp-content/uploads/2022/12/LAPTOP-GAMER-ACER-NITRO-5-AN515-57-721J-15.6-FULL-HD-INTEL-CORE-I7-11800H-2.30GHZ-8GB-512GB-SSD-NVIDIA-GEFORCE-RTX-3050-WINDOWS-11-HOME-64-BIT-ESPANOL-NEGRO-1.jpg',
                },
                { 
                    id_imagen: 3,
                    url: 'https://www.officedepot.com.mx/medias/100097567-2.jpg-515ftw?context=bWFzdGVyfHJvb3R8NTI3ODB8aW1hZ2UvanBlZ3xoNTUvaGZhLzExOTMyMjIwNjg2MzY2LzEwMDA5NzU2Ny0yLmpwZ181MTVmdHd8NGQxYzZjZjE4NWVjOTZiNzdkZWM1OTAzYTU4Njc3OTA2ODk3ZTcyMTc3MDNjMjgzY2Q3ZDllZWM4NmU3Zjc3NQ',
                }
            ]
        },
        {
            id_equipo: 2,
            marca: 'LENOVO',
            tipo: 'LAPTOP',
            estatus: 1,
            imagenes: [
                { 
                    id_imagen: 5,
                    url: 'https://compuexpresstijuana.com.mx/wp-content/uploads/2022/12/LAPTOP-GAMER-ACER-NITRO-5-AN515-57-721J-15.6-FULL-HD-INTEL-CORE-I7-11800H-2.30GHZ-8GB-512GB-SSD-NVIDIA-GEFORCE-RTX-3050-WINDOWS-11-HOME-64-BIT-ESPANOL-NEGRO-1.jpg',
                },
            ]
        },
    ]

    const [ equipos, setEquipos ] = useState([])

    useEffect(() => {
        setEquipos(data)
    }, [])

    if(!sistemasAcceso.inventario) return <PageError/>

    return (
        <div>
            {/*<div className="card">
                <div className="card-body p-4 bg-white rounded-lg">
                    <div className="grid grid-rows-1 gap-5">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-2">
                                <h1 className="uppercase text-xs font-semibold">Filtro por tipo</h1>
                                <div className="h-0.5 rounded-full bg-gray-900 my-3"></div>
                                <div className="h-auto overflow-y-auto">
                                    <div className="flex mb-2">
                                        <input type="checkbox" className="checkbox checkbox-sm border-2 border-gray-400" />
                                        <label htmlFor="" className="ml-3 text-sm">Tipo 1</label>
                                    </div>
                                    <div className="flex mb-2">
                                        <input type="checkbox" className="checkbox checkbox-sm border-2 border-gray-400" />
                                        <label htmlFor="" className="ml-3 text-sm">Tipo 2</label>
                                    </div>
                                    <div className="flex mb-2">
                                        <input type="checkbox" className="checkbox checkbox-sm border-2 border-gray-400" />
                                        <label htmlFor="" className="ml-3 text-sm">Tipo 3</label>
                                    </div>
                                    <div className="flex">
                                        <input type="checkbox" className="checkbox checkbox-sm border-2 border-gray-400" />
                                        <label htmlFor="" className="ml-3 text-sm">Tipo 4</label>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="col-span-10">
                                <h1 className="uppercase text-xs font-semibold">Inventario Existente</h1>
                                <div className="h-0.5 rounded-full bg-gray-900 my-3"></div>
                                <div className="flex flex-wrap justify-center">
                                    { equipos.map((equipo) => (
                                        <div key={equipo.id_equipo} className="border-2 border-gray-200 w-60 mr-10 mb-5 hover:opacity-60 cursor-pointer">
                                            <div className="carousel w-full">
                                                { equipo.imagenes.map((imagen) => (
                                                    <div key={imagen.id_imagen} id={imagen.id_imagen} className="carousel-item relative w-full">
                                                        <img src={imagen.url} className="w-full h-52" />
                                                    </div> 
                                                ))} 
                                            </div>
                                            <div className="p-2 bg-gray-100">
                                                <h1 className="font-semibold text-xs text-gray-900 text-center">{ equipo.tipo } - { equipo.marca }</h1>
                                                <div className="my-1">
                                                    <h1 className="font-semibold text-xs">Modelo: </h1>
                                                    <h1 className="font-semibold text-xs">Estatus: </h1>
                                                </div>
                                            </div>
                                            <div className="flex justify-center border-t-2 border-gray-300 bg-gray-100 w-full p-2 gap-2">
                                                { equipo.imagenes.map((imagen, index) => (
                                                    <a key={imagen.id_imagen} href={`#${imagen.id_imagen}`} className="btn btn-secondary btn-xs font-semibold">{index + 1}</a> 
                                                ))}  
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-center items-center mt-2">
                                    <div className="join">
                                        <button className="join-item btn">1</button>
                                        <button className="join-item btn btn-active">2</button>
                                        <button className="join-item btn">3</button>
                                        <button className="join-item btn">4</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>*/}
        </div>
    )
}

export default Inicio