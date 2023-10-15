import React from 'react';

function SubmissionModal({modalContent, setModalContent, schoolData, setSchoolData}) {

    const onClose = () => {
        setModalContent(null);
    }

    const handleClose = (e) => {
        if ( e.target.id === "wrapper" ) onClose();
    }

    const handleProjectNameChange = (e) => {
        let currentModal = modalContent
        currentModal.projectName = e.target.value
        setModalContent(currentModal)
    }

    const handleStudentFirstNameChange = (e) => {
        let currentModal = modalContent
        currentModal.studentNames[e.target.id.slice(0,3)].firstName = e.target.value
        setModalContent(currentModal)
    }

    const handleStudentLastNameChange = (e) => {
        let currentModal = modalContent
        currentModal.studentNames[e.target.id.slice(0,3)].lastName = e.target.value
        setModalContent(currentModal)
    }

    const submitProjectDocument = async () => {
            const url = new URL(`https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/insertProject`)
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectData: modalContent
                }),
            })
                .then(res => res.json())
                .then(
                    async (result) => {
                        console.log(result)
                        let newSchoolData = {...schoolData};
                        newSchoolData.projects.push(result);
                        await setSchoolData(newSchoolData);
                        setModalContent(null);
                    }
                )
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
                    {(modalContent.type === "I") ?
                        <div className={'my-4'}>
                            <p className={'text-2xl gont-bold p-4'}>{modalContent.gradeBand} Individual</p>
                            <input type="text" id="projectName" onChange={handleProjectNameChange}
                                   className="m-2 block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder={"Project Name"} title={"Search standard codes or titles."} />
                            <div className={'flex'}>
                                <input type="text" id="oneFirst" onChange={handleStudentFirstNameChange}
                                       className="m-2 block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder={"Student First Name"} title={"Search standard codes or titles."} />
                                <input type="text" id="oneLast" onChange={handleStudentLastNameChange}
                                       className="m-2 block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder={"Student Last Name"} title={"Search standard codes or titles."} />
                            </div>
                        </div>
                        :
                        <div className={'my-4'}>
                            <p className={'text-2xl gont-bold p-4'}>{modalContent.gradeBand} Group</p>
                            <input type="text" id="projectName" onChange={handleProjectNameChange}
                                   className="m-2 block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder={"Project Name"} title={"projectName"} />
                            <p>Student 1:</p>
                            <div className={'flex'}>

                                <input type="text" id="oneFirst" onChange={handleStudentFirstNameChange}
                                       className="m-2 block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder={"Student First Name"} title={"firstName"} />
                                <input type="text" id="oneLast" onChange={handleStudentLastNameChange}
                                       className="m-2 block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder={"Student Last Name"} title={"lastName"} />
                            </div>
                            <p>Student 2:</p>
                            <div className={'flex'}>

                                <input type="text" id="twoFirst" onChange={handleStudentFirstNameChange}
                                       className="m-2 block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder={"Student First Name"} title={"lastName"} />
                                <input type="text" id="twoLast" onChange={handleStudentLastNameChange}
                                       className="m-2 block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder={"Project Name"} title={"firstName"} />
                            </div>
                            <p>Student 3:</p>
                            <div className={'flex'}>

                                <input type="text" id="thrFirst" onChange={handleStudentFirstNameChange}
                                       className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder={"Student First Name"} title={"firstName"} />
                                <input type="text" id="thrLast" onChange={handleStudentLastNameChange}
                                       className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder={"Student First Name"} title={"lastName"} />
                            </div>

                        </div>
                    }

                </div>
                <button onClick={submitProjectDocument} className="relative self-center rounded bottom-12 align-middle m-2 p-2 bg-green-600 text-white font-bold px-10 text-xl hover:bg-green-700">
                    <p>Submit Project</p>
                </button>
            </div>
        </div>
    );
}

export default SubmissionModal;