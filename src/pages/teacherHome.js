import React, {useEffect, useContext, useState} from 'react';
import '@aws-amplify/ui-react/styles.css';
import SubmissionModal from "../components/submissionModal";
import userContext from "../context/userContext";
import Loader from "../components/loader";
import {withAuthenticator} from "@aws-amplify/ui-react";

function TeacherHome(props) {
    const [submissionModal, setSubmissionModal] = useState(null);
    const bands = ['K-2', '3-4', '5-6', '7-8', 'HS']
    const handleGridClick = (e) => {
        setSubmissionModal({school: schoolData.school.name, year: '2024', gradeBand: e.target.id.slice(0, -1), type: e.target.id[e.target.id.length-1], projectName: "", studentNames: {one: {}, two: {}, thr: {}}});
    }
    const [schoolData, setSchoolData] = useState(null)
    const user = useContext(userContext)

    const getSchools = () => {
        if (user.userAttributes) {
            const url = new URL(`https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/projectData`)
            url.searchParams.append('email', user.userAttributes.email)
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        setSchoolData(result);
                    }
                )
    }}

    useEffect(() => {
        getSchools();
    }, [user.userAttributes])


    return (
        <>
            {(!schoolData) ? <Loader /> : <>
        <div>
            <p className={"font-bold text-2xl text-white"}>{schoolData.school.name} Science Fair Dashboard</p>
            <p className={'text-white'}>!!! Submission Deadline: 3/26 !!!</p>
            <div className={"p-4 bg-teal-100 border-teal-200 border-2 flex justify-between mx-12 mb-6 shadow-xl rounded"}>
                {schoolData.school.gradeBands.map(band => (
                    <div className={"flex flex-col"}>
                        <p className={"font-bold text-2xl"}>{band}</p>
                        <div className={"my-2 mx-4"}>
                            <p>Individual</p>
                            {(schoolData.projects.filter(item => item.gradeBand === band && item.type === "I").length < 2) ?
                            <div className={"flex gap-2"}>
                                <div id={band+" I"} onClick={handleGridClick} className={"border bg-amber-200 p-4 rounded hover:bg-amber-100 cursor-pointer"}>Submit a {band} individual project ({2 - schoolData.projects.filter(item => item.gradeBand === band && item.type === "I").length} remaining slots)</div>
                            </div>
                                : <div className={"flex gap-2"}>
                                    <div id={band+" I"} className={"border bg-green-300 p-4 rounded"}>All {band} Individual Projects Submitted!</div>
                                </div>}
                        </div>
                        <div className={"my-2 mx-4"}>
                            <p>Group</p>
                            {(schoolData.projects.filter(item => item.gradeBand === band && item.type === "G").length < 2) ?
                                <div className={"flex gap-2"}>
                                <div id={band+" G"} onClick={handleGridClick} className={"border bg-amber-200 p-4 rounded hover:bg-amber-100 cursor-pointer"}>Submit a {band} group project ({2 - schoolData.projects.filter(item => item.gradeBand === band && item.type === "G").length} remaining slots)</div>
                            </div>
                                : <div className={"flex gap-2"}>
                                    <div id={band+" G"} className={"border bg-green-300 p-4 rounded"}>All {band} Group Projects Submitted!</div>
                                </div>}
                        </div>
                    </div>
                        ))}
            </div>
            <div className={"flex w-[80%] mx-auto justify-between"}>
                <div className={"bg-blue-300 w-[70%] rounded p-4 shadow shadow-lg"}>
                    <p className={'font-bold text-lg'}>Submitted Projects</p>
                    <div className={'flex flex-col'}>
                        {schoolData.projects.map(project => <div className={'p-4 bg-blue-200 shadow shadow-lg m-4'}><p>{project.name}</p>{project.students.map(student => <p>{student.firstName} {student.lastName}</p>)}</div>)}
                    </div>
                </div>
                <div className={"w-[25%] bg-amber-200 rounded p-4 shadow shadow-lg flex flex-col"}>
                    <p className={'font-bold text-lg my-2'}>Resources</p>
                    <div className={'m-2 bg-violet-500 font-bold text-white hover:bg-violet-400 cursor-pointer p-2 border-white border-2'}><a target="_blank" rel="noopener noreferrer" href={'https://ucarecdn.com/75fb11e3-fd46-48ad-b914-4128f45106ce/MapletonDistrictScienceFairFlyer.pdf'}>District Fair Flyer</a></div>
                    <div className={'m-2 bg-violet-400 font-bold text-white hover:bg-violet-300 cursor-pointer p-2 border-white border-2'}><a target="_blank" rel="noopener noreferrer" href={'https://ucarecdn.com/e2d511e6-af9c-4021-b2e5-23c09d2de045/Spanish.pdf'}>District Fair Flyer (Spanish)</a></div>
                    <div className={'m-2 bg-blue-500 font-bold text-white hover:bg-blue-400 cursor-pointer p-2 border-white border-2'}><a target="_blank" rel="noopener noreferrer" href={'https://ucarecdn.com/83bc9586-210b-49b8-bcc3-06bb92dcdcc3/ScienceFairRules.pdf'}>Science Fair Rules</a></div>
                    <div className={'m-2 bg-blue-400 font-bold text-white hover:bg-blue-300 cursor-pointer p-2 border-white border-2'}><a target="_blank" rel="noopener noreferrer" href={'https://ucarecdn.com/e8a792f4-5fa9-46dd-a4f6-c2c9dbc64ef3/ScienceFairRulesSpanish.docx'}>Science Fair Rules (Spanish)</a></div>
                    <div className={'m-2 bg-blue-500 font-bold text-white hover:bg-blue-400 cursor-pointer p-2 border-white border-2'}><a target="_blank" rel="noopener noreferrer" href={'https://ucarecdn.com/a1bf6f07-2bba-475c-becc-90fbf96afd47/ElementaryStudentPacket.pdf'}>Elementary Packet</a></div>
                    <div className={'m-2 bg-blue-400 font-bold text-white hover:bg-blue-300 cursor-pointer p-2 border-white border-2'}><a target="_blank" rel="noopener noreferrer" href={'https://ucarecdn.com/f8c0dc5a-4ac8-4b1a-8d74-d73b3732afb5/ElementaryStudentPacketSpanish.pdf'}>Elementary Packet (Spanish)</a></div>
                    <div className={'m-2 bg-blue-500 font-bold text-white hover:bg-blue-400 cursor-pointer p-2 border-white border-2'}><a target="_blank" rel="noopener noreferrer" href={'https://ucarecdn.com/5a76c28e-60a2-4ebe-b3d4-ca6aa543376f/PrintableScienceFairRubric.docx'}>Printable Rubric</a></div>
                    <div className={'m-2 bg-blue-400 font-bold text-white hover:bg-blue-300 cursor-pointer p-2 border-white border-2'}><a target="_blank" rel="noopener noreferrer" href={'https://ucarecdn.com/2be16533-2008-4684-ac26-14d94c2a7fe9/ScienceFairRubricSpanish.docx'}>Printable Rubric (Spanish)</a></div>
                    <div className={'m-2 bg-blue-500 font-bold text-white hover:bg-blue-400 cursor-pointer p-2 border-white border-2'}><a target="_blank" rel="noopener noreferrer" href={'https://ucarecdn.com/6b147f25-d475-4600-8003-c8fa1e6bdf08/K2ScienceFairRubric.docx'}>K-2 Rubric</a></div>
                    <div className={'m-2 bg-blue-400 font-bold text-white hover:bg-blue-300 cursor-pointer p-2 border-white border-2'}><a target="_blank" rel="noopener noreferrer" href={'https://ucarecdn.com/2c0efccc-975a-42b6-b42b-5f724f5decd4/K2RubricSpanish.docx'}>K-2 Rubric (Spanish</a></div>


                </div>
            </div>

        </div>
            {(submissionModal) && <SubmissionModal modalContent={submissionModal} setModalContent={setSubmissionModal} schoolData={schoolData} setSchoolData={setSchoolData} />}</>}
        </>

    );
}

export default withAuthenticator(TeacherHome, {
    hideSignUp: true
});