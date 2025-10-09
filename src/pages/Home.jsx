import { NavLink } from 'react-router-dom'
import LogoBitacora from '../public/images/icon_bitacora.jpg'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import LoadingDiv from '../components/UI/LoadingDiv'

const Home = () => {

  const { sistemasAcceso, loading } = useContext(AuthContext)

  return (
    <div className="h-screen flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center">

      { loading
        ? <LoadingDiv>Cargando, Espera...</LoadingDiv> 
        : (
          <>
            {/* { sistemasAcceso.inventario && (
              <NavLink to={'/home/inventario/registro'} className="transition duration-300 flex flex-col bg-white w-28 md:w-36 lg:w-36 xl:w-36 h-auto hover:opacity-50 my-5 sm:my-5 lg:mx-10 xl:mx-10">
                <img src={'https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-laptop-icon-png-image_1871597.jpg'} className='w-full h-32 rounded-t-lg' alt="" />
                <div className='bg-orange-500 rounded-b-lg p-1'>
                  <h1 className='text-center text-gray-200 text-xs  md:text-base lg:text-base xl:text-base'>Inventario</h1>
                </div>
              </NavLink>
            )} */}

            {sistemasAcceso.capital && (
              <NavLink to={'/home/capital_humano'} className="transition duration-300 flex flex-col bg-white w-28 md:w-36 lg:w-36 xl:w-36 h-auto hover:opacity-50">
                <img src={'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'} className='w-full h-32 rounded-t-lg' alt="" />
                <div className='bg-blue-500 rounded-b-lg p-1'>
                  <h1 className='text-center text-gray-200 text-xs  md:text-base lg:text-base xl:text-base'>Capital Humano</h1>
                </div>
              </NavLink>
            )}
            
            {/* {sistemasAcceso.pipeline && (
              <NavLink to={'/home/pipeline'} className="transition duration-300 flex flex-col w-28 md:w-36 lg:w-36 xl:w-36 h-auto hover:opacity-50 my-5 sm:my-5 lg:mx-10 xl:mx-10">
                <img src={'https://static.vecteezy.com/system/resources/previews/010/702/653/original/crm-icon-with-people-vector.jpg'} className='w-full h-32 rounded-t-lg' alt="" />
                <div className='bg-gray-500 rounded-b-lg p-1'>
                  <h1 className='text-center text-gray-200 text-xs  md:text-base lg:text-base xl:text-base'>Pipeline</h1>
                </div>
              </NavLink>
            )} */}
          </>
        )
      }
    </div>
  )
}

export default Home