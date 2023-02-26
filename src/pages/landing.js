import React from 'react';
import {useNavigate} from "react-router-dom";
function Landing() {
    let navigate = useNavigate()

    let rubricNav = () => {
        let project = prompt("Enter the Project Number: ")
        if (project) {
            navigate(`/score23/${project}`)
        }
    }

    return (
        <div className={'h-screen flex bg-gray-200'}>
            <button className={'p-6 bg-blue-500 text-6xl text-white select-none rounded-lg mx-auto my-auto border-white border-2 shadow-xl font-sans'} onClick={rubricNav}>Start Scoring</button>
        </div>
    );
}

export default Landing;