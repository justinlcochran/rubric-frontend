import React from 'react';

function ReportCard({projectData, score}) {
    return (
        <div className={"grid grid-cols-2 bg-gray-300 mx-2 rounded"}>
            <div className={"grid grid-rows-3 items-center"}>
                <p className={"font-bold"}>{projectData.projectID}</p>
                <p className={"font-bold"}>{projectData.projectName}</p>
                <p className={"font-bold"}>{projectData.projectParticipants.reduce((a, b) => a + ", " + b)}</p>
            </div>
            <div className={"my-auto"}>
                <p className={"font-bold"}>{score}</p>
            </div>

        </div>
    );
}

export default ReportCard;