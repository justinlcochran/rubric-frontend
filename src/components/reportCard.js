import React from 'react';

function ReportCard({projectData, score, evals, ind}) {
    return (
        <>
            {(ind === 0) ?
                    <div className={"grid grid-cols-2 bg-amber-300 mx-2 rounded text-xs"}>
                        <div className={"grid grid-rows-3 items-center"}>
                            <p className={"font-bold"}>{projectData.projectNumber}</p>
                            <p className={"font-bold"}>{projectData.projectName}</p>
                            <p className={"font-bold"}>{projectData.projectParticipants.reduce((a, b) => a + ", " + b)}</p>
                        </div>
                        <div className={"my-auto"}>
                            <p className={"font-bold"}>{score.toFixed(2)}</p>
                            <p className={"font-bold"}>{`${evals} scores`}</p>
                        </div>
                    </div>
                : (ind === 1) ?
                    <div className={"grid grid-cols-2 bg-gray-300 mx-2 rounded text-xs"}>
                        <div className={"grid grid-rows-3 items-center"}>
                            <p className={"font-bold"}>{projectData.projectNumber}</p>
                            <p className={"font-bold"}>{projectData.projectName}</p>
                            <p className={"font-bold"}>{projectData.projectParticipants.reduce((a, b) => a + ", " + b)}</p>
                        </div>
                        <div className={"my-auto"}>
                            <p className={"font-bold"}>{score.toFixed(2)}</p>
                        </div>
                    </div>
                : (ind === 2) ?
                    <div className={"grid grid-cols-2 bg-amber-600 mx-2 rounded text-xs"}>
                        <div className={"grid grid-rows-3 items-center"}>
                            <p className={"font-bold"}>{projectData.projectNumber}</p>
                            <p className={"font-bold"}>{projectData.projectName}</p>
                            <p className={"font-bold"}>{projectData.projectParticipants.reduce((a, b) => a + ", " + b)}</p>
                        </div>
                        <div className={"my-auto"}>
                            <p className={"font-bold"}>{score.toFixed(2)}</p>
                        </div>
                    </div>
                :
                        <div className={"grid grid-cols-2 bg-blue-400 mx-2 rounded text-xs"}>
                            <div className={"grid grid-rows-3 items-center"}>
                                <p className={"font-bold"}>{projectData.projectNumber}</p>
                                <p className={"font-bold"}>{projectData.projectName}</p>
                                <p className={"font-bold"}>{projectData.projectParticipants.reduce((a, b) => a + ", " + b)}</p>
                            </div>
                            <div className={"my-auto"}>
                                <p className={"font-bold"}>{score.toFixed(2)}</p>
                            </div>
                        </div>
            }

        </>

    );
}

export default ReportCard;