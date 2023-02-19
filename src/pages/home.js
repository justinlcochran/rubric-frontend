import React, {useContext, useEffect, useState} from 'react';
import TopBar from "../components/topBar";
import CategoryCard from "../components/categoryCard";
import scoringContext from "../context/scoringContext";
import {useNavigate, useParams} from "react-router-dom";

function Home(props) {
    let {rubric, submission} = useContext(scoringContext)
    let [data, setData] = useState()
    let params = useParams()
    let navigate = useNavigate()

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
            const response = await fetch(serverURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({projectNumber: params.projectNumber, submission: submission, score: Object.keys(submission).reduce((a, b) => a + parseInt(submission[b].score), 0)})
            });
            navigate("/splash/")
        } else {
            e.preventDefault()
            return false
        }

    }

    return (
        <div>
            <TopBar projectID={params.projectID}/>
            <div className={'mt-16'}>
                {rubric.categories.map(item =>
                    <CategoryCard
                        title={item.title}
                        criteria={rubric.rubricElements.filter(element => (item.criteria.includes(element.criterionID)))}/>)}
            </div>
            {(Object.keys(submission).length == rubric.rubricElements.length) ?
                <div
                    className={'mx-auto p-2 bg-violet-500 hover:bg-violet-600 hover:shadow-xl text-white shadow rounded max-w-fit text-3xl select-none mb-4'} onClick={submitScore}>Submit</div>
                : <div
                    className={'mx-auto p-2 bg-gray-500 text-white shadow rounded max-w-fit text-3xl select-none mb-4'}>Submit</div>
            }
        </div>
    );
}

export default Home;