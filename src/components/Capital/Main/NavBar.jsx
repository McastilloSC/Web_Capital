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
        <img src="https://sclogistics.mx/images/logo@2x.png" className="w-24 ml-2" alt="" />
      <div className="flex-1"><Link to="/capital_humano" className="btn btn-ghost normal-case text-xl">
        Capital Humano
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