"use client"

import React from 'react';
import { ToastContainer, cssTransition } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import 'animate.css/animate.min.css';

// animate.css
const slide = cssTransition({
    enter: 'animate__animated animate__slideInDown',
    exit: 'animate__animated animate__slideOutUp',
});

const ToastNotification = ({ autoClose = 3000, hideProgressBar = true }) => {
    return (
        <>
            <style jsx global>
                {`
                    .animate__slideInDown {
                        animation-duration: 300ms !important;
                    }
                    .animate__slideOutUp {
                        animation-duration: 300ms !important;
                    }

                    @media (max-width: 992px) {
                        .Toastify__toast-container {
                            top: 20px !important;
                            right: 20px !important;
                            left: unset !important;
                        }
                    }
                `}
            </style>
            <ToastContainer
                autoClose={autoClose}
                hideProgressBar={hideProgressBar}
            />
        </>
    );
};

export const toastStyle = {
    style: {
        background: "linear-gradient(to right, rgb(0, 176, 155), rgb(150, 201, 61))",
        boxShadow: "0 3px 6px -1px rgba(0, 0, 0, .12), 0 10px 36px -4px rgba(77, 96, 232, .3)",
        color: "#fff",
        borderRadius: "0px",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "500",
        zIndex: "2147483647",
        width: "230px",
        minHeight: "46px"
    },
    className: "custom-toast",
    transition: slide,
};

export default ToastNotification;