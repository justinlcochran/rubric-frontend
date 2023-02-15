import React, {useContext} from 'react';
import scoringContext from "../context/scoringContext";

function TopBar(props) {
    let {rubric, submission} = useContext(scoringContext)
    return (
        <div className={'w-full grid grid-cols-3 fixed inset-0 max-h-fit z-10 bg-slate-500'}>
            <div className={'text-white bg-slate-800 col-span-1 shadow-xl py-4 m-0.5 rounded text-sm'}>
                Project Number: {props.projectID}
            </div>
            <div className={'text-white bg-slate-800 col-span-1 shadow-xl py-4 m-0.5 rounded text-sm'}>
                {`Evaluation Completion: ${Math.round(Object.keys(submission).length/rubric.rubricElements.length * 100)}%`}
            </div>
            <div className={'text-white bg-slate-800 col-span-1 shadow-xl py-4 m-0.5 rounded text-sm'}>
                {`Overall Score: ${Object.keys(submission).reduce((a, b) => a + parseInt(submission[b].score), 0)} / ${rubric.rubricElements.length * 5}`}
            </div>

        </div>
    );
}

export default TopBar;