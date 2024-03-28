import {useEffect, useState} from "react";

import React from 'react';
import {useNavigate} from "react-router-dom";
import Loader from "../components/loader";

function Schedule(props) {
    let navigate = useNavigate();
    let [data, setData] = useState(null)
    const categories = ["K-2", "3-4", "5-6", "7-8", "HS"]
    const rounds = [['Round 1', '5:10'], ['Round 2', '5:20'], ['Round 3', '5:30'], ['Round 4', '5:40'], ['Round 5', '5:50'], ['Round 6', '6:00'], ['Round 7', '6:10'], ['Round 8', '6:20'], ['Round 9', '6:30'], ['Round 10', '6:40'], ['Round 11', '6:50']]
    useEffect(() => {
        fetch(`https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/getProjects`)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                }
            )
    }, [])

    const homeNav = () => {
        navigate('/')
    }
    if (data) {
        return (
            <div className={'flex flex-col gap-2'}>
                {rounds.map(round => (<>
                    {(data.filter(project => project.schedule === round[0]).length > 0) &&
                        <div className={'bg-amber-100 m-1 rounded-xl border-4 border-blue-400 p-2'}><p
                            className={'text-black font-bold mt-4 text-2xl'}>{round[0]}</p><p
                            className={'mb-4'}>Presenting at {round[1]}</p>
                            <div className={'flex flex-wrap justify-between'}>
                                {data.filter(project => project.schedule === round[0]).sort((a, b) => a.projectNumber - b.projectNumber).map(project =>
                                    <div className={'flex flex-col p-4 text-sm bg-blue-900 m-1 rounded w-[30%] text-white'}>
                                        <p className={'mx-auto font-bold text-lg'}>{project.projectNumber}</p>

                                        <p className={'my-auto mx-auto'}>{project.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>}
                </>))}
            </div>
        )

    } else
    {
        return <Loader/>
    }
}

export default Schedule;

