import { Outlet, Link, useNavigate } from 'react-router-dom'
import { AiTwotoneSetting, AiOutlineSmallDash, AiFillPieChart, AiTwotoneApi, AiTwotoneHome, AiOutlinePoweroff } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

//APIS
import axios from '../axios/axios.config'
import LoadingDiv from '../components/UI/LoadingDiv';
import { CatalogosContext } from '../context/CatalogosContext';

const MainPipeline = () => {

    const {usuario} =useContext(AuthContext)

    const navigate = useNavigate()
    const { sistemasAcceso, loading } = useContext(AuthContext)
    const { loadingCatalogos } = useContext(CatalogosContext)

    const onLogout = async () => {
        try {
            await axios.get('/auth/logout');
            localStorage.removeItem('token_auth_sc');
            navigate('/')
        } catch (error) {
            toast(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-gray-200">
                {/* Page content here */}
                <div className="navbar bg-base-100">
                    <div className="flex-none">
                        <label htmlFor="my-drawer" className="btn drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <Link to="/home">
                        <img src="https://sclogistics.mx/images/logo@2x.png" className="w-24 ml-2" alt="" />
                    </Link>
                    <div className="flex-1"><Link to="/home/pipeline">
                        <a className="btn btn-ghost normal-case text-xl">Pipeline</a>
                        </Link>
                    </div>
                    <div className="flex-none">
                        <div className="tooltip tooltip-bottom mr-3" data-tip="Logout">
                            <button className="btn btn-square btn-ghost" onClick={() => onLogout()}>
                                <AiOutlinePoweroff  className="text-2xl"/>
                            </button>
                        </div>
                    </div>
                </div>

                { loading || loadingCatalogos
                    ? <LoadingDiv>Cargando</LoadingDiv> 
                    : (
                        <div className='my-5 mx-10'>
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
        
                            <Outlet />
                        </div>
                    )
                }
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <div className="w-full flex flex-col justify-center items-center my-5">
                        <h1 className="font-semibold text-center text-md">{usuario.nombre} {usuario.apellidos}</h1>
                        <p className="text-gray-700">Bienvenido</p>
                    </div>
                    <div className="divider">Menus</div>
                    
                    { sistemasAcceso.pipeline && (
                        <ul className="menu menu-xs bg-base-200 rounded-lg w-full">
                            <li>
                                <Link to={'/home/pipeline'}>
                                    <AiTwotoneHome className="text-xl"/>
                                    Home
                                </Link>
                            </li>
                            
                                <li>
                                    <Link to={'/home/pipeline/dashboard'}>
                                        <AiFillPieChart className="text-xl"/>
                                        Dashboard
                                    </Link>
                                </li>
                            
                            {/* <li>
                                <details open>
                                    <summary>
                                        <AiTwotoneSetting className="text-xl"/>
                                        Administracion
                                    </summary>
                                    <ul>
                                        
                                            <li>
                                                <Link to={'/home/pipeline'}>
                                                    <AiOutlineSmallDash className="text-xl"/>
                                                    Proximamente
                                                </Link>
                                            </li>
                                                                    
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <details open>
                                    <summary>
                                        <AiTwotoneApi className="text-xl"/>
                                        Configuracion
                                    </summary>
                                    <ul>
                                        
                                            <li>
                                                <Link to={'/home/pipeline'}>
                                                    <AiOutlineSmallDash className="text-xl"/>
                                                    Proximamente
                                                </Link>
                                            </li>
                                        
                                    </ul>
                                </details>
                            </li> */}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MainPipeline