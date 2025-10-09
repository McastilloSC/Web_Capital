import { AiOutlinePoweroff   } from "react-icons/ai";
import { useNavigate,Link } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const onLogoutUsuario = async () => {
    //Remover el Token
    localStorage.removeItem('token_auth_sc');
    navigate('/')
  }
  
  return (
    <div className="navbar bg-base-100 border-2 border-gray-300">
      <div className="flex-none">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>
      <Link to="/home">
        <img src="https://sclogistics.mx/images/logo@2x.png" className="w-24 ml-2" alt="" />
      </Link>
      <div className="flex-1"><Link to="/home/capital_humano">
        <a className="btn btn-ghost normal-case text-xl">Capital Humano</a>
      </Link>
      </div>

      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={() => onLogoutUsuario()}>
          <AiOutlinePoweroff className="text-2xl" />
        </button>
      </div>

    </div>
  )
}

export default Navbar