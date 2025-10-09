import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import PageError from '../../components/UI/PageError';

const Proyecto = () => {
    
    const { idProyecto } = useParams();

    const { sistemasAcceso } = useContext(AuthContext)

    if(!sistemasAcceso.pipeline) return <PageError/>

    return (
        <div>Proyecto {idProyecto}</div>
    )
}

export default Proyecto