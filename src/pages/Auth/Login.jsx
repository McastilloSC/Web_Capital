import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../axios/axios.config';
import image from '../../public/images/login.jpg';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUsuario, logged, setLogged } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const loginSchema = Yup.object().shape({
    usuario: Yup.string().required('Obligatorio'),
    password: Yup.string().required('Obligatorio'),
  });

  const formik = useFormik({
    validationSchema: loginSchema,
    initialValues: {
      usuario: '',
      password: '',
    },
    onSubmit: (values) => {
      onLogin(values);
    },
  });

  const onLogin = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/auth/login', values);
      setLogged(true);
      setUsuario(data.usuario);
      localStorage.setItem('token_auth_sc', data.token_auth_sc);
      navigate('/');
    } catch (error) {
      toast(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  // 👇 Esto evita el warning y hace la redirección correctamente
  useEffect(() => {
    if (logged) {
      navigate('/capital_humano');
    }
  }, [logged, navigate]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      <div className="h-screen w-full flex justify-center items-center px-5 md:px-10">
        <div className="flex bg-white rounded-2xl w-11/12 lg:w-9/12 h-auto">
          <div className="hidden md:block w-6/12">
            <img src={image} className="w-full h-full" alt="" />
          </div>
          <div className="w-full md:w-6/12 py-10">
            <h1 className="text-xs text-center font-semibold text-blue-800">
              Powered by IT Team
            </h1>
            <p className="text-center mb-2 text-xs font-semibold">v5.6.4</p>
            <img
              src="https://dev.sclogistics.mx/assets/Logo_SC_2022.69bfc747.png"
              className="w-32 md:w-40 mb-5 mx-auto"
              alt=""
            />
            <h1 className="text-center font-semibold text-gray-500 md:text-lg">
              Dev Logistics <span className="text-green-500">S+C</span>
            </h1>
            <h1 className="md:text-lg text-center font-semibold">Bienvenido</h1>

            <div className="flex flex-col justify-center items-center px-5">
              <div className="bg-green-500 w-6/12 h-1 rounded-full my-5"></div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-semibold text-xs">
                    Usuario
                  </span>
                  {formik.errors.usuario && formik.touched.usuario ? (
                    <span className="label-text-alt text-red-500">
                      {formik.errors.usuario}
                    </span>
                  ) : (
                    ''
                  )}
                </label>
                <input
                  disabled={loading}
                  type="text"
                  name="usuario"
                  onChange={formik.handleChange}
                  value={formik.values.usuario}
                  placeholder="..."
                  className="input input-sm input-bordered w-full"
                />
              </div>

              <div className="form-control w-full max-w-xs mt-3">
                <label className="label">
                  <span className="label-text font-semibold text-xs">
                    Password
                  </span>
                  {formik.errors.password && formik.touched.password ? (
                    <span className="label-text-alt text-red-500">
                      {formik.errors.password}
                    </span>
                  ) : (
                    ''
                  )}
                </label>
                <input
                  disabled={loading}
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="****"
                  className="input input-sm input-bordered w-full"
                />
              </div>

              <div className="mt-5 w-full max-w-xs">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-sm btn-secondary w-full"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
