import React, {useEffect, useState} from 'react';
import SubmissionModal from "../components/submissionModal";

function TeacherHome(props) {
    const [submissionModal, setSubmissionModal] = useState(null);
    const bands = ['K-2', '3-4', '5-6', '7-8', 'HS']
    const handleGridClick = (e) => {
        setSubmissionModal({gradeBand: e.target.id.slice(0, -1), type: e.target.id[e.target.id.length-1], projectName: "", studentNames: {one: {first: "", last: ""}, two: {first: "", last: ""}, thr: {first: "", last: ""}}});
    }
    const [schools, setSchools] = useState(null)

    const getSchools = () => {
        fetch(`https://ngzd2uftxfmlkfyjw34aptltmi0hlutk.lambda-url.us-east-1.on.aws/`)
            .then(res => res.json())
            .then(
                (result) => {
                    setSchools(result);
                }
            )
    }

    useEffect(() => {
        getSchools();
    }, [])


    return (
        <>
        <div>
            <p className={"font-bold text-2xl"}>York International Science Fair Dashboard</p>
            <p>!!! Submission Deadline: 3/31 !!!</p>
            <div className={"p-4 bg-teal-100 border-teal-200 border-2 flex justify-between mx-12 mb-4 shadow-xl rounded"}>
                {bands.map(band => (
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
            {(submissionModal) && <SubmissionModal modalContent={submissionModal} setModalContent={setSubmissionModal} />}
        </>

    );
}

export default TeacherHome;