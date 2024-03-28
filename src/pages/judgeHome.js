import React, {useEffect, useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import Loader from "../components/loader";
import TopBar from "../components/topBar";
import CategoryCard from "../components/categoryCard";
import scoringContext from "../context/scoringContext";
import PresentationPrompt from "../components/presentationPrompt";

function useBeforeUnload(message) {
    useEffect(() => {
        const handler = (event) => {
            event.preventDefault();
            event.returnValue = message;
        };

        window.addEventListener("beforeunload", handler);
        return () => {
            window.removeEventListener("beforeunload", handler);
        };
    }, [message]);
}

function JudgeHome(props) {
    let params = useParams()
    const [judgeContext, setJudgeContext] = useState(null);
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let {rubric, submission, setSubmission} = useContext(scoringContext)

    useBeforeUnload("Are you sure you want to leave? Your changes will be lost.")

    const submitScore = async (e) => {
        if (window.confirm('Are these scores correct and ready to submit to the database?')) {
            setIsLoading(true);
            const serverURL = 'https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/submitScoreRubric'
            let score = Object.keys(submission).reduce((a, b) => a + parseInt(submission[b].score), 0)

            const response = await fetch(serverURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({projectNumber: project.number, submission: submission, score: score, index: project.index, email: params.email})
            })
                .then(async (response) => {
                    if (response.ok) {
                        let tempJudgeContext = {...judgeContext}
                        tempJudgeContext.tasks[project.index].completion = score
                        setSubmission({})
                        setProject(null)
                        setIsLoading(false)
                    } else {
                        e.preventDefault()
                        setIsLoading(false);
                        return false
                    }
                })
        }
    }

    const getJudgeContext = async () => {
        try {
            let url = new URL('https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/getJudgeContext')
            url.searchParams.append('email', params.email)
            const response = await fetch(url);
            const data = await response.json()
            setJudgeContext(data)
        } catch (error) {
            console.error('Error fetching judge context:', error)
        }
    }

    useEffect(() => {
            getJudgeContext()
        },
        []
    )
    if (judgeContext && project) {
        return (
            <div>
                <TopBar projectNumber={project.number}/>
                <div className={'mt-20'}>
                    <PresentationPrompt/>
                    {rubric.categories.map(item =>
                        <CategoryCard
                            title={item.title}
                            criteria={rubric.rubricElements.filter(element => (item.criteria.includes(element.criterionID)))}/>)}
                </div>
                {(Object.keys(submission).length === rubric.rubricElements.length) ?
                    <div
                        className={'mx-auto p-2 bg-violet-500 hover:bg-violet-600 hover:shadow-xl text-white shadow rounded max-w-fit text-3xl select-none mb-4'}
                        onClick={submitScore}>Submit</div>
                    : <div
                        className={'mx-auto p-2 bg-gray-500 text-white shadow rounded max-w-fit text-3xl select-none mb-4'}>Submit</div>
                }
                {isLoading && <Loader/>}
            </div>
        );
    } else if (judgeContext && !project) {
        return (<div className={'flex flex-col gap-2 bg-gray-100 h-screen'}>
                <div className={'bg-blue-800 rounded border-2 border-gray-200 m-2'}>
                    <p className={'text-lg text-gray-200 font-bold'}>Welcome, {judgeContext.firstName}!</p>
                    <p className={'text-sm text-gray-200 my-1 mx-2'}>Thank you for supporting this year's Science Fair!
                        Below, you will find your list of projects to judge. During each round of judging, find the
                        correctly numbered project, listen to your student(s) presentation, and feel free to ask
                        questions! You may choose to judge during the presentation or quickly between rounds. Tap the
                        relevant project below to get started!</p>
                </div>
                {(judgeContext) && judgeContext.tasks.map((item, index) => (item.completion) ?
                    <div className={'bg-blue-200 rounded border-gray-400 shadow border-2 m-2'}>
                        <p className={'text-sm'}>Round {index + 1}</p>
                        <p className={'font-bold'}>{item.name}</p>
                        <div className={'flex justify-between mx-1'}>
                            <p>By {(item.students.length === 1) ? item.students.map(name => name.firstName) : item.students.map(name => name.firstName + ', ')}</p>
                            <p>Score: {item.completion}</p>
                        </div>
                    </div>
                    : <div onClick={() => setProject({number: item.projectNumber, title: item.name, index: index})}
                           className={'bg-amber-200 rounded border-gray-400 shadow border-2 m-2'}>
                        <p className={'text-sm'}>Round {index + 1}</p>
                        <p className={'font-bold'}>{item.name}</p>
                        <div className={'flex justify-between mx-1'}>
                            <p>By {(item.students.length === 1) ? item.students.map(name => name.firstName) : item.students.map((name, index) => (index < item.students.length - 1) ? name.firstName + ', ' : name.firstName)}</p>
                            <p>Score: Awaiting Scoring</p>
                        </div>
                    </div>)}
            </div>
        )
    } else {
        return <Loader/>
    }
}

export default JudgeHome;