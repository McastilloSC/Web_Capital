import { BsFillPersonVcardFill, BsFillHouseDoorFill, BsFillPersonLinesFill, BsFillPersonFill } from "react-icons/bs";
import { Outlet, Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

//Components
import Navbar from '../components/Capital/Main/NavBar'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingScreen from "../components/UI/LoadingScreen";

const MainCapital = () => {

    const { usuario, perfilCapital } = useContext(AuthContext)

    if(Object.keys(perfilCapital).length == 0) return <LoadingScreen/>;

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-gray-200 h-auto">
                <Navbar />
                <div className='mx-10 mb-10 mt-5'>
                    <ToastContainer />
                    <Outlet />
                </div>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <h1 className="font-semibold text-center text-md">{usuario.nombre} {usuario.apellidos}</h1>
                    <p className="font-semibold text-center">Bienvenido</p>

                    <div className="divider"></div>

                    <ul className="menu menu-xs bg-base-200 rounded-lg max-w-xs w-full">
                        <li>
                            <Link to={'/capital_humano'}>
                                <BsFillHouseDoorFill className='text-xl'/>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            { perfilCapital.menus.menu_perfiles || perfilCapital.menus.menu_usuarios ? (
                                <details open>
                                    <summary>
                                        <BsFillPersonVcardFill className='text-xl'/>
                                        Configuraciones
                                    </summary>
                                    <ul>
                                        <li>
                                            <ul>
                                                { perfilCapital.menus.menu_perfiles && (
                                                    <li>
                                                        <Link to={'/capital_humano/perfiles'}>
                                                            <BsFillPersonLinesFill className='text-xl'/>
                                                            Perfiles
                                                        </Link>
                                                    </li>
                                                )}
                                                { perfilCapital.menus.menu_usuarios && (
                                                    <li>
                                                        <Link to={'/home/capital_humano/usuarios'}>
                                                            <BsFillPersonFill className='text-xl'/>
                                                            Usuarios
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </li>
                                    </ul>
                                </details>
                            ) : ''}
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
        

    )
}

export default MainCapital