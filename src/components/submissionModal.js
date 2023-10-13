import React from 'react';

function SubmissionModal({modalContent, setModalContent}) {

    const onClose = () => {
        setModalContent(null);
    }

    const handleClose = (e) => {
        if ( e.target.id === "wrapper" ) onClose();
    }

    return (
        <div className={"fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center flex flex-col z-10"} id="wrapper" onClick={handleClose}>
            <div className={"flex flex-col"}>
                <div className={"relative bg-gray-200 p-4 m-4 w-[100%] rounded select-none p-2 mx-auto"}>
                    <button onClick={onClose} className="absolute -top-6 -right-6 m-2 p-2 w-10 rounded-full bg-red-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#fff" d="M14.12 12l5.3-5.3c.59-.59.59-1.54 0-2.12-.59-.59-1.54-.59-2.12 0L12 9.88 6.7 4.58c-.59-.59-1.54-.59-2.12 0-.59.59-.59 1.54 0 2.12L9.88 12l-5.3 5.3c-.59.59-.59 1.54 0 2.12.59.59 1.54.59 2.12 0L12 14.12l5.3 5.3c.59.59 1.54.59 2.12 0 .59-.59.59-1.54 0-2.12L14.12 12z"/>
                        </svg>
                    </button>
                    <div>
                        <p>{(modalContent[modalContent.length-1] === "I") ? modalContent+"ndividual" : modalContent+"roup"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubmissionModal;