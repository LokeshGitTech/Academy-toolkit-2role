import React from "react";
import { useDispatch } from "react-redux";
import { deleteCourse } from "../features/courseSlice";

const Modal2 = ({ id, closeModal }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteCourse({ id }));
        closeModal();
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow p-5">
                    <div className="flex items-center justify-between border-b">
                        <h3 className="text-xl font-semibold text-gray-900">Are you sure, you want to delete course?</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                            onClick={closeModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-3"
                            onClick={handleDelete}
                        >
                            I accept
                        </button>
                        <button
                            type="button"
                            className="text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 ml-3"
                            onClick={closeModal}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal2;
