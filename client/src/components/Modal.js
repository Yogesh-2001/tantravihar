import React from "react";

import "../styles/modal.css";

const Modal = ({ setModal, resume }) => {
  return (
    <div className="backshadow col-12">
      <div className="custom-modal col-md-10 col-10 mx-auto">
        <div className="delete-icon" onClick={() => setModal(false)}>
          x
        </div>

        {resume !== null && (
          <iframe
            src={resume}
            style={{ width: "100%", height: "100%", border: "none" }}
          />
          // <embed
          //   type="application/pdf"
          //   src={resume}
          //   width={100 + "%"}
          //   height={100 + "%"}
          // ></embed>
        )}
      </div>
    </div>
  );
};

export default Modal;
