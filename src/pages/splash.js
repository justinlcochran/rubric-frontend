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

    return (
        <div className={'h-screen flex bg-blue-800'}>
                <button className={'p-8 bg-violet-300 text-6xl select-none rounded-lg mx-auto my-auto border-white border-2 shadow-xl font-sans'} onClick={rubricNav}>Start Scoring</button>
        </div>
    );
}

export default Splash;