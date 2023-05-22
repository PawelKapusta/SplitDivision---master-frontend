import React from "react";
import Image from "next/image";
import { ModalContainer, ModalContent } from "./modal.styles";
export type TModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: TModalProps): JSX.Element => {
    return (
        <ModalContainer isOpen={isOpen}>
            <ModalContent>
                {children}
                <button onClick={onClose}>
                    <Image
                        src="/icons/close-icon.svg"
                        width={35}
                        height={35}
                        alt="Close-icon.svg"
                    />
                </button>
            </ModalContent>
        </ModalContainer>
    );
};

export default Modal;
