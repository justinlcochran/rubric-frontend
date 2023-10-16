import React from 'react';
import {useNavigate} from "react-router-dom";
function Splash() {
    let navigate = useNavigate()

    let rubricNav = () => {
        let project = prompt("Enter the Project Number: ")
        if (project) {
            navigate(`/score/${project}`)
        }
    }
    let previewNav = () => {
        navigate(`/preview`)
    }
    const teacherNav = () => {
        navigate('/teacher')
    }

    return (
        <div className={'h-screen flex bg-gray-200'}>
            <button className={'p-6 bg-blue-500 text-white text-6xl select-none rounded-lg mx-auto my-auto border-white border-2 shadow-xl font-sans'} onClick={previewNav}>Teacher Dashboard</button>

            <button className={'p-6 bg-blue-500 text-white text-6xl select-none rounded-lg mx-auto my-auto border-white border-2 shadow-xl font-sans'} onClick={teacherNav}>Rubric Preview</button>
        </div>
    );
}

export default Splash;