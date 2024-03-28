import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import Loader from "../components/loader";

function TeacherTaskList(props) {
    const [teacherTasks, setTeacherTasks] = useState()
    let params = useParams()

    const getJudgeContext = async () => {
        try {
            let url = new URL('https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/getJudgeContext')
            url.searchParams.append('email', params.email)
            const response = await fetch(url);
            const data = await response.json()
            setTeacherTasks(data)
        } catch (error) {
            console.error('Error fetching judge context:', error)
        }
    }

    return (
        <div>
            {(teacherTasks) ? teacherTasks.tasks.map((item, index) =>
                <div className={'bg-amber-200 rounded border-gray-400 shadow border-2 m-2'}>
                    <p className={'text-sm'}>Round {index + 1}</p>
                    <p className={'font-bold'}>{item.name}</p>
                    <div className={'flex justify-between mx-1'}>
                        <p>By {(item.students.length === 1) ? item.students.map(name => name.firstName) : item.students.map(name => name.firstName + ', ')}</p>
                    </div>
                </div>) : <Loader />}
        </div>
    );
}

export default TeacherTaskList;