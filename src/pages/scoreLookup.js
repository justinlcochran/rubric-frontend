import React, {useEffect, useContext, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../components/loader";
import TopBar from "../components/topBar";
import CategoryCard from "../components/categoryCard";
import scoringContext from "../context/scoringContext";
import PresentationPrompt from "../components/presentationPrompt";
import CategoryCardDead from "../components/categoryCardDead";
import TopBarReview from "../components/topBarReview";

function ScoreLookup(props) {
    let params = useParams()
    const [projectScores, setProjectScores] = useState(null);
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let {rubric, submission, setSubmission} = useContext(scoringContext)
    let navigate = useNavigate()

    const homeNav = () => {
        navigate('/')
    }

    const getProjectScores = async () => {
        try {
            let url = new URL('https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/getProjectScores')
            url.searchParams.append('projectNumber', params.projectNumber)
            const response = await fetch(url);
            const data = await response.json()
            if (data !== 'No data' && data !== 'Not yet' && data.rubrics.length > 0) {
                setSubmission(data.rubrics[0]);
                setProjectScores(data)
            } else {
                setProjectScores(data)
            }
        } catch (error) {
            console.error('Error fetching judge context:', error)
        }
    }

    useEffect(() => {
            getProjectScores();
        },
        []
    )

    function average(arr) {
        if (arr.length === 0) {
            return 0;
        }

        const sum = arr.reduce((acc, val) => acc + val, 0);
        const avg = sum / arr.length;
        return Number(avg.toFixed(1)); // Round to one decimal place
    }
    if (projectScores && projectScores === 'Not yet') {
        return (
            <div className={'flex flex-col h-screen'}>
                <div className={'grow'}/>
                <p className={'text-white text-xl'}>Score Lookup will be enabled after the awards ceremony! Check back in later to see exactly how the judges rated your project!</p>
                <div className={'grow'}/>
                <button
                    className={'p-6 bg-blue-500 text-white text-3xl select-none rounded-lg mx-auto my-auto border-white border-2 shadow-xl font-sans'}
                    onClick={homeNav}>Back to Main Page
                </button>
                <div className={'grow'}/>
            </div>)
    } else if (projectScores === 'No data') {
        return (
            <div className={'flex flex-col h-screen'}>
                <div className={'grow'}/>
                <p className={'text-white text-xl'}>That project number is not in our database</p>
                <div className={'grow'}/>
                <button
                    className={'p-6 bg-blue-500 text-white text-3xl select-none rounded-lg mx-auto my-auto border-white border-2 shadow-xl font-sans'}
                    onClick={homeNav}>Back to Main Page
                </button>
                <div className={'grow'}/>
            </div>)
    } else if (projectScores && projectScores.scores.length === 0) {
        return (
            <div className={'flex flex-col h-screen'}>
                <div className={'grow'}/>
                <p className={'text-white text-xl'}>No scores yet! Wait for your judges to submit their scores</p>
                <div className={'grow'}/>
                <button
                    className={'p-6 bg-blue-500 text-white text-3xl select-none rounded-lg mx-auto my-auto border-white border-2 shadow-xl font-sans'}
                    onClick={homeNav}>Back to Main Page
                </button>
                <div className={'grow'}/>
            </div>)
    } else if (projectScores) {
        return (
            <div>
                <TopBarReview projectNumber={params.projectNumber} averageScore={average(projectScores.scores)}/>
                <div className={'mt-20'}>
                    <div className={'flex mx-4 gap-2'}>
                    {(projectScores.rubrics.map((item, index) => <div className={'bg-blue-300 border-white border-2 rounded p-1 w-fit text-lg font-bold'} onClick={() => setSubmission(item)}>Judge {index + 1}</div>))}
                    </div>
                    {rubric.categories.map(item =>
                        <CategoryCardDead
                            title={item.title}
                            criteria={rubric.rubricElements.filter(element => (item.criteria.includes(element.criterionID)))}/>)}
                </div>

                {isLoading && <Loader/>}
            </div>
        );
    } else {
        return <Loader/>
    }
}

export default ScoreLookup;