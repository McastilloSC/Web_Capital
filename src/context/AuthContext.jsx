import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

//API
import axios from '../axios/axios.config'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [ loadingAuth, setLoadingAuth ] = useState(false)
    const [ usuario, setUsuario ] = useState({})
    const [ logged, setLogged ] = useState(false)

    //Sistemas
    const [ sistemasAcceso, setSistemasAccesos ] = useState({})
    const [ administradores, setAdministradores ] = useState({})

    //Perfiles
    const [ perfilCapital, setPerfilCapital ] = useState({})
    
    useEffect(() => {
        const onObtenerUsuario = async () => {
            setLoadingAuth(true)
            const token = localStorage.getItem('token_auth_sc');
            if(!token){
                navigate('/')
                return;
            }

            try {
                const { data } = await axios.get('/auth/informacion_usuario') 
                setAdministradores(data.administrador)
                setUsuario(data.usuario)
                setSistemasAccesos(data.sistemas)
                setPerfilCapital(data.perfil_capital)
                setLogged(true)
            } catch (error) {
                console.log (error)
                setLogged(false)
                navigate('/')
                toast(error.response.data.message);
            } finally {
                setLoadingAuth(false)
            }
        }
        onObtenerUsuario();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                usuario,
                setUsuario,
                loadingAuth,
                sistemasAcceso,
                perfilCapital,
                administradores,
                logged,
                setLogged,
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}