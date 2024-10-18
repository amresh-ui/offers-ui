
import React, { useRef, useEffect, useState } from 'react';
import './index.css';

const Modal = ({ isOpen, onClose, children, parentClassName }) => {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef(null);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setModalOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            handleCloseModal();
        }
    };

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const modalElement = modalRef.current;

        if (modalElement) {
            if (isModalOpen) {
                modalElement.showModal();
                document.body.style.overflow = 'hidden'; // Disable scrolling on the body
            } else {
                modalElement.close();
                document.body.style.overflow = ''; // Enable  scrolling on the body
            }
        }

        // Cleanup function to reset overflow property when unmounting or when isOpen changes
        return () => {
            document.body.style.overflow = '';
        };

    }, [isModalOpen]);

    return (
        <dialog ref={modalRef} onKeyDown={handleKeyDown} className={`${parentClassName ? parentClassName : 'modal m-4'}`}>
            {children}
        </dialog>
    );
};

export default Modal;