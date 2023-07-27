import React, { useState, useEffect } from "react";
import Form from "./Form";

const Modal = ({ handleModalClose, days, day }) => {


    const handleClose = () => {
        const modal = document.querySelector(".modal")
        modal.style.opacity = 0

        setTimeout(() => {
            handleModalClose(false)
        }, 600)
    }

    const handleModalLoad = async (data) => {
        const modal = document.querySelector(".modal");
        
        modal.style.opacity = 1;
    }

    return (
        <div className="modal">
            <img className="modalimg" src="https://via.placeholder.com/150" alt="load" onLoad={() => handleModalLoad()} />
           <Form handleClose={handleClose} days={days} day={day} />
        </div>
    );
};

export default Modal;