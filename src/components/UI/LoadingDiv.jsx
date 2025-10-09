const LoadingDiv = ({ children }) => {
  return (
    <div className="h-auto w-full flex flex-col justify-center items-center my-2">
        <span className="loading loading-spinner loading-sm md:loading-lg lg:loading-lg xl:loading-lg 2xl:loading-lg"></span>
        <h1 className="text-center mt-2 font-semibold text-xs md:text-base lg:text-base xl:text-base">{children}</h1>
        <p className="text-gray-500 text-xs">Porfavor Espera...</p>
    </div>
  )
}

export default LoadingDiv