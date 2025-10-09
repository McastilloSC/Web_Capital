import { Blocks } from 'react-loader-spinner'

const LoadingScreen = () => {
    return (
        <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <Blocks
                    height="50"
                    width="50"
                    color="#4fa94d"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    visible={true}
                />
                <h1 className='text-sm font-semibold'>Cargando Informacion</h1>
                <p className='text-xs'>Porfavor Espera</p>
            </div>
        </div>
    )
}

export default LoadingScreen