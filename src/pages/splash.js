import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import JudgeIdentityModal from "../components/judgeIdentityModal";
import ScoreLookupModal from "../components/scoreLookupModal";

function Splash() {
    const [judgeIdModal, setJudgeIdModal] = useState(false)
    const [scoreLookupModal, setScoreLookupModal] = useState(false)

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

    const scheduleNav = () => {
        navigate('/schedule')
    }

    return (<>

            <div className={'h-screen w-full flex flex-col gap-4 bg-gray-200'}>
                <div className={'grow'} />
                <button className={'p-6 bg-blue-500 text-white text-3xl select-none rounded-lg mx-auto my-auto border-white border-2 shadow-xl font-sans'} onClick={previewNav}>Rubric Preview</button>
                <div className={'grow'} />
                <button className={'p-6 bg-blue-500 text-white text-3xl select-none rounded-lg mx-auto my-auto border-white border-2 shadow-xl font-sans'} onClick={scheduleNav}>Schedule</button>
                <div className={'grow'} />
                <div className={'p-6 bg-blue-500 text-white text-3xl select-none rounded-lg mx-auto my-auto border-white border-2 shadow-xl font-sans'} onClick={() => setScoreLookupModal(true)}>Score Lookup</div>
                <div className={'grow'} />
                <div className={'p-6 bg-blue-500 text-white text-3xl select-none rounded-lg mx-auto my-auto border-white border-2 shadow-xl font-sans'} onClick={() => setJudgeIdModal(true)}>Judging</div>
                <div className={'grow'} />
                <button className={'p-6 bg-blue-500 text-white text-3xl select-none rounded-lg mx-auto my-auto border-white border-2 shadow-xl font-sans'} onClick={teacherNav}>Teacher Dashboard</button>
                <div className={'grow'} />


            </div>
            {(judgeIdModal) && <JudgeIdentityModal judgeIdModal={judgeIdModal} setJudgeIdModal={setJudgeIdModal}/>}
            {(scoreLookupModal) && <ScoreLookupModal scoreLookupModal={scoreLookupModal} setScoreLookupModal={setScoreLookupModal}/>}
        </>
    );
}

export default Splash;