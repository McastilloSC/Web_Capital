import { Outlet, Link, useNavigate } from 'react-router-dom'
import { AiOutlineDropbox , AiTwotoneHome, AiOutlinePoweroff, AiFillFileText   } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify'

//APIS
import axios from '../axios/axios.config';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MainInventario = () => {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

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
                    {/* <img src="https://sclogistics.mx/images/logo@2x.png" className="w-24 ml-2" alt="" /> */}
                    <div className="flex-1"><Link to="/home/inventario/registro" className="btn btn-ghost normal-case text-xl">
                        <a>Inventario</a>
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
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <div className="w-full flex flex-col justify-center items-center my-5">
                        <h1 className="font-semibold">{ usuario.nombre } { usuario.apellidos }</h1>
                        <p className="text-gray-700">Bienvenido</p>
                    </div>
                    <div className="divider">Menus</div>
                    <ul className="menu menu-xs bg-base-200 rounded-lg w-full">
                        <li>
                            <Link to={'/home'}>
                                <AiTwotoneHome className="text-xl"/>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={'/home/inventario/registro'}>
                                <AiOutlineDropbox  className="text-xl"/>
                                Inventario
                            </Link>
                        </li>
                        <li>
                            <Link to={'/home/inventario/responsivas'}>
                                <AiFillFileText   className="text-xl"/>
                                Responsivas
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MainInventario