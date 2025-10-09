import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ title, children, size, setIsOpen }) => {
    return (
        <>
            <input type="checkbox" id="modal_form" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className={`modal-box p-0 rounded w-11/12 ${size}`}>
                    <div className="flex justify-between items-center bg-gray-700 px-2">
                        <div className="p-2">
                            <h1 className="text-white text-base">{title}</h1>
                            <h1 className="text-gray-200 text-xs">Completa los campos</h1>
                        </div>
                        <button className="text-white text-xs hover:text-red-500" onClick={() => setIsOpen(false)}>
                            <AiOutlineClose className="text-xl"/>
                        </button>
                    </div>
                    <div className="px-4 py-3">
                        { children }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal