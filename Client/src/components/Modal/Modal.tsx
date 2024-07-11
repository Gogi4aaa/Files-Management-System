import { ModalProps } from "../../Interfaces/Types/Modal";
import { useRef } from "react";
export default function Modal({id, parentId, text, btnText, title, input, handleModalClick}: ModalProps) {
    const ref = useRef<HTMLInputElement>(null);
    return (
        <>
            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {text}
                            {input && <input type="text" ref={ref}/>}
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => handleModalClick(id, ref.current?.value, parentId)} className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">{btnText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}