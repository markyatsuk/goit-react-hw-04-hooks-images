import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

function Modal({ largeImageURL, onModalClose }) {
  useEffect(() => {
    function handleEscKey(e) {
      if (e.code === "Escape") {
        onModalClose();
      }
    }
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [onModalClose]);

  function handleOverlayclick(e) {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  }

  return createPortal(
    <div className="Overlay" onClick={handleOverlayclick}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
}
export { Modal };
