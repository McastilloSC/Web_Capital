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
            {sistemasAcceso.capital && (
              <NavLink to={'/capital_humano'} className="transition duration-300 flex flex-col bg-white w-28 md:w-36 lg:w-36 xl:w-36 h-auto hover:opacity-50">
                <img src={'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'} className='w-full h-32 rounded-t-lg' alt="" />
                <div className='bg-blue-500 rounded-b-lg p-1'>
                  <h1 className='text-center text-gray-200 text-xs  md:text-base lg:text-base xl:text-base'>Capital Humano</h1>
                </div>
              </NavLink>
            )}
          </>
        )
      }
    </div>
  )
}

export default Home