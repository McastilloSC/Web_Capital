import { useContext, useState } from 'react';

//Context
import { AuthContext } from '../../context/AuthContext';

//Components
import TablaEmpleados from '../../components/Capital/Inicio/TablaEmpleados';
import PageError from '../../components/UI/PageError';
import Reportes from '../../components/Capital/Inicio/Reportes';
import Paneles from '../../components/Capital/Inicio/Paneles';
import Modal from '../../components/UI/Modal';
import FormNuevoEmpleado from '../../components/Capital/Inicio/Forms/FormNuevoEmpleado';


const Home = () => {

    const { perfilCapital, administradores, sistemasAcceso } = useContext(AuthContext)

    const [ reportes, setReportes ] = useState(false)

    //Nuevos States
    const [ empleados, setEmpleados ] = useState([]);
    const [ isOpen, setIsOpen ] = useState(false)

    if(!sistemasAcceso.capital) return <PageError/>

    return (
        <div className='h-screen mt-5'>      
            { perfilCapital.empleado.registro_empleado && isOpen && (
                <Modal title={'Nuevo Empleado'} setIsOpen={setIsOpen} size={'max-w-7xl'}>
                    <FormNuevoEmpleado
                        setEmpleados={setEmpleados}
                    />
                </Modal>
            )}

            <div className='grid grid-rows-1 gap-5'>
                { administradores.capital && (
                    <Paneles
                        reportes={reportes}
                        setReportes={setReportes}
                    />
                )}

                { reportes && (
                    <Reportes/>
                )}

                <div className='grid grid-cols-1 '>
                    <TablaEmpleados
                        empleados={empleados}
                        setEmpleados={setEmpleados}
                        setModalNuevoEmpleado={setIsOpen}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home