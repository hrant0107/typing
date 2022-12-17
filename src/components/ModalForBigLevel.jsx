import React, { useRef } from "react";

const ModalForBigLevel = ({ onClickCloseModal }) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (!modalRef.current.contains(e.target)) {
      onClickCloseModal();
    }
  };
  return (
    <div className="allScrinModal" onClick={(e) => closeModal(e)}>
      <div ref={modalRef} className="modal">
        <div className="modal__block">
          <div onClick={onClickCloseModal} className="close__modal">
            X
          </div>
          <span className="moda__text">You can't play this level</span>
        </div>
      </div>
    </div>
  );
};

export default ModalForBigLevel;
