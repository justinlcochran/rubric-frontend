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
        setSubmissionModal({gradeBand: e.target.id.slice(0, -1), type: e.target.id[e.target.id.length-1], projectName: "", studentNames: {one: {}, two: {}, thr: {}}});
    }
    const [schoolData, setSchoolData] = useState(null)
    const user = useContext(userContext)

    const getSchools = () => {
        if (user.userAttributes) {
            const url = new URL(`https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/projectData`)
            url.searchParams.append('sub', user.userAttributes.sub)
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        setSchoolData(result);
                    }
                )
    }}
    console.log(schoolData)

    useEffect(() => {
        getSchools();
    }, [user.userAttributes])


    return (
        <>
            {(!schoolData) ? <Loader /> : <>
        <div>
            <p className={"font-bold text-2xl"}>{schoolData.name} Science Fair Dashboard</p>
            <p>!!! Submission Deadline: 3/31 !!!</p>
            <div className={"p-4 bg-teal-100 border-teal-200 border-2 flex justify-between mx-12 mb-4 shadow-xl rounded"}>
                {schoolData.gradeBands.map(band => (
                    <div className={"flex flex-col"}>
                        <p className={"font-bold text-2xl"}>{band}</p>
                        <div className={"my-2"}>
                            <p>Individual</p>
                            <div className={"flex gap-2"}>
                                <div id={band+" I"} onClick={handleGridClick} className={"border bg-amber-200 p-4 rounded"}>A</div>
                                <div id={band+" I"} onClick={handleGridClick} className={"border bg-amber-200 p-4 rounded"}>X</div>
                            </div>
                        </div>
                        <div className={"my-2"}>
                            <p>Group</p>
                            <div className={"flex gap-2"}>
                                <div id={band+" G"} onClick={handleGridClick} className={"border bg-blue-200 p-4"}>A</div>
                                <div id={band+" G"} onClick={handleGridClick} className={"border bg-blue-200 p-4"}>A</div>
                            </div>
                        </div>
                    </div>
                        ))}
            </div>
            <div className={"flex w-[80%] mx-auto justify-between"}>
                <div className={"bg-blue-400 w-[70%] rounded p-4"}>
                    <p>Submitted Projects</p>
                </div>
                <div className={"w-[25%] bg-amber-400 rounded p-4"}></div>
            </div>

        </div>
            {(submissionModal) && <SubmissionModal modalContent={submissionModal} setModalContent={setSubmissionModal} />}</>}
        </>

    );
}

export default withAuthenticator(TeacherHome);