import React, {useContext} from 'react';
import scoringContext from "../context/scoringContext";

function TopBar(props) {
    let {rubric, submission} = useContext(scoringContext)
    return (
        <div className={'w-full grid grid-cols-3 fixed inset-0 max-h-fit z-10 bg-slate-500'}>
            <div className={'text-white bg-slate-800 col-span-1 shadow-xl py-4 m-0.5 rounded text-sm grid grid-rows-2'}>
                <p>Project Number</p>
                <p>{props.projectNumber}</p>
            </div>
            <div className={'text-white bg-slate-800 col-span-1 shadow-xl py-4 m-0.5 rounded text-sm grid grid-rows-2'}>
                <p className={"text-xs"}>Average Score:</p>
                <p>{props.averageScore}</p>
            </div>
            <div className={'text-white bg-slate-800 col-span-1 shadow-xl py-4 m-0.5 rounded text-sm grid grid-rows-2'}>
                <p>Overall Score</p>
                <p>{`${Object.keys(submission).reduce((a, b) => a + parseInt(submission[b].score), 0)} / ${rubric.rubricElements.length * 5}`}</p>
            </div>

        </div>
    );
}

export default TopBar;