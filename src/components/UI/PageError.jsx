import { AiFillAlert } from "react-icons/ai";

const PageError = ({ title = '' }) => {
  return (
    <div className='card'>
        <div className='card card-body bg-white rounded-lg'>
            <div className='flex justify-start items-center space-x-5'>
                <div>
                    <AiFillAlert className="text-5xl"/>
                </div>
                <div>
                    <h1 className='font-bold text-2xl'>{ title  ? title : 'Acceso Restringido'}</h1>
                    <p className='font-semibold text-md'>Contacta a tu administrador para accesar a esta pagina</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PageError