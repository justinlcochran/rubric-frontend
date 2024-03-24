import React from 'react';

function ReportCard({projectData, score, evals, ind}) {

    const renderStudentList = (students) => {
        if (students.length === 0) {
            return 'No students';
        } else if (students.length === 1) {
            return `${titleCase(students[0].firstName)} ${titleCase(students[0].lastName)}`;
        } else if (students.length === 2) {
            return `${titleCase(students[0].firstName)} ${titleCase(students[0].lastName)} and ${titleCase(students[1].firstName)} ${titleCase(students[1].lastName)}`;
        } else {
            let studentList = '';
            for (let i = 0; i < students.length - 1; i++) {
                studentList += `${titleCase(students[i].firstName)} ${titleCase(students[i].lastName)}, `;
            }
            studentList += `and ${titleCase(students[students.length - 1].firstName)} ${titleCase(students[students.length - 1].lastName)}`;
            return studentList;
        }
    };

    function titleCase(str) {
        return str.toLowerCase().replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        });
    }
    if (projectData.scores.length === 0) {
        return (
            <div className={"bg-gray-300 mx-2 rounded text-xs my-2 py-2"}>
                <div className={"grid grid-rows-3 items-center"}>
                    <p className={"font-bold"}>{projectData.projectNumber}</p>
                    <p className={"font-bold"}>{projectData.name}</p>
                    <p>{renderStudentList(projectData.students)}</p>
                </div>
            </div>)

    } else {

        return (
            <>
                {(ind === 0) ?
                    <div className={"grid grid-cols-2 bg-amber-300 mx-2 rounded text-xs my-2 py-2"}>
                        <div className={"grid grid-rows-3 items-center"}>
                            <p className={"font-bold"}>{projectData.projectNumber}</p>
                            <p className={"font-bold"}>{projectData.name}</p>
                            <p>{renderStudentList(projectData.students)}</p>
                        </div>
                        <div className={"my-auto"}>
                            <p className={"font-bold"}>{score.toFixed(2)}</p>
                            <p className={"font-bold"}>{`${evals.length} scores`}</p>
                        </div>
                    </div>
                    : (ind === 1) ?
                        <div className={"grid grid-cols-2 bg-gray-300 mx-2 rounded text-xs my-2 py-2"}>
                            <div className={"grid grid-rows-3 items-center"}>
                                <p className={"font-bold"}>{projectData.projectNumber}</p>
                                <p className={"font-bold"}>{projectData.name}</p>
                                <p>{renderStudentList(projectData.students)}</p>
                            </div>
                            <div className={"my-auto"}>
                                <p className={"font-bold"}>{score.toFixed(2)}</p>
                                <p className={"font-bold"}>{`${evals.length} scores`}</p>
                            </div>
                        </div>
                        : (ind === 2) ?
                            <div className={"grid grid-cols-2 bg-amber-600 mx-2 rounded text-xs my-2 py-2"}>
                                <div className={"grid grid-rows-3 items-center"}>
                                    <p className={"font-bold"}>{projectData.projectNumber}</p>
                                    <p className={"font-bold"}>{projectData.name}</p>
                                    <p>{renderStudentList(projectData.students)}</p>
                                </div>
                                <div className={"my-auto"}>
                                    <p className={"font-bold"}>{score.toFixed(2)}</p>
                                    <p className={"font-bold"}>{`${evals.length} scores`}</p>
                                </div>
                            </div>
                            :
                            <div className={"grid grid-cols-2 bg-blue-400 mx-2 rounded text-xs my-2 py-2"}>
                                <div className={"grid grid-rows-3 items-center"}>
                                    <p className={"font-bold"}>{projectData.projectNumber}</p>
                                    <p className={"font-bold"}>{projectData.projectName}</p>
                                    <p>{renderStudentList(projectData.students)}</p>
                                </div>
                                <div className={"my-auto"}>
                                    <p className={"font-bold"}>{score.toFixed(2)}</p>
                                    <p className={"font-bold"}>{`${evals.length} scores`}</p>
                                </div>
                            </div>
                }

            </>

        );
    }}

export default ReportCard;