import React, {useContext, useEffect} from 'react';
import TopBar from "../components/topBar";
import CategoryCard from "../components/categoryCard";
import scoringContext from "../context/scoringContext";
import {useNavigate, useParams} from "react-router-dom";
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

function Preview() {
    let {rubric, submission} = useContext(scoringContext)
    let navigate = useNavigate()
    useBeforeUnload("Are you sure you want to leave? Your changes will be lost.")
    // useEffect(() => {
    //     fetch(`https://jtabffsow22mn7n4k265qgfjfa0flkuh.lambda-url.us-east-1.on.aws/`)
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setData(result);
    //             }
    //         )
    // }, [])
    // if (data) {
    //     console.log(data)
    // }

    const submitScore = async (e) => {
        if (window.confirm('Are these scores correct and ready to submit to the database?')) {
            const serverURL = 'https://jtabffsow22mn7n4k265qgfjfa0flkuh.lambda-url.us-east-1.on.aws/'
            // eslint-disable-next-line no-unused-vars
            const response = await fetch(serverURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({submission: submission, score: Object.keys(submission).reduce((a, b) => a + parseInt(submission[b].score), 0)})
            });
            navigate("/")
        } else {
            e.preventDefault()
            return false
        }

    }

    return (
        <div>
            <TopBar projectNumber={"XX"}/>
            <div className={'mt-20'}>
                <PresentationPrompt />
                {rubric.categories.map(item =>
                    <CategoryCard
                        title={item.title}
                        criteria={rubric.rubricElements.filter(element => (item.criteria.includes(element.criterionID)))}/>)}
            </div>
            {(Object.keys(submission).length === rubric.rubricElements.length) ?
                <div
                    className={'mx-auto p-2 bg-violet-500 hover:bg-violet-600 hover:shadow-xl text-white shadow rounded max-w-fit text-3xl select-none mb-4'}>Submit</div>
                : <div
                    className={'mx-auto p-2 bg-gray-500 text-white shadow rounded max-w-fit text-3xl select-none mb-4'}>Submit</div>
            }
        </div>
    );
}

export default Preview;