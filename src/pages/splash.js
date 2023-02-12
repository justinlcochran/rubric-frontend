import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
function Splash(props) {
    let [projectNumber, setProjectNumber] = useState()
    let navigate = useNavigate()


    let projNumberSelect = () => {
        let path = `/score/${document.getElementById('project').value}`
        console.log(path)
    }

    let rubricNav = () => {
        let project = prompt("Enter the Project Number: ")
        navigate(`/score/${project}`)
    }

    return (
        <div className={'h-screen flex bg-blue-300'}>
                <button className={'p-8 bg-violet-300 text-8xl select-none rounded-lg m-auto'} onClick={rubricNav}>Start Scoring</button>
        </div>
    );
}

export default Splash;