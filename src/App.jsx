import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Screen Auth
import Login from './pages/Auth/Login'

//Screens Capital
import HomeCapital from './pages/Capital/Home'
import Empleado from './pages/Capital/Empleado'
import PerfilesCapital from './pages/Capital/Perfiles'
import UsuariosCapital from './pages/Capital/Usuarios'

//Inventario
import Inventario from './pages/Inventario/Inicio'
import Registro from './pages/Inventario/Registro'

//Layout
import MainCapital from './layout/MainCapital'
import MainInventario from './layout/MainInventario'

//Context
import { CatalogosProvider } from './context/CatalogosContext'
import { AuthProvider } from './context/AuthContext'
import { TableProvider } from './context/TablesContext'

import Home from './pages/Home'
import Responsivas from './pages/Inventario/Responsivas'


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CatalogosProvider>
          <TableProvider>
            <Routes>
              
              <Route path='/'>
                <Route index element={<Login />}/>
              </Route>
              <Route path='/capital_humano' element={<MainCapital />}> {/* Layout de todas estas Rutas */}
                <Route index element={<HomeCapital />}/>
                <Route path='empleado/:idEmpleado' element={<Empleado />}/>
                <Route path='perfiles' element={<PerfilesCapital />}/>
                <Route path='usuarios' element={<UsuariosCapital />}/>
              </Route>
              <Route path='/home/inventario' element={<MainInventario />}> {/* Layout de todas estas Rutas */}
                <Route index element={<Inventario />}/>
                <Route path='registro' element={<Registro />}/>
                <Route path='responsivas' element={<Responsivas />}/>
              </Route>

            </Routes>
          </TableProvider>
        </CatalogosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
