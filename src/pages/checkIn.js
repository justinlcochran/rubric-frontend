import React, {useEffect, useState} from 'react';

function CheckIn(props) {
    const [checks, setChecks] = useState(null);

    const getAwaitingChecks = async () => {
        try {
            let url = new URL('https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/getCheckIn')
            const response = await fetch(url);
            const data = await response.json()
            setChecks(data)
        } catch (error) {
            console.error('Error fetching judge context:', error)
        }
    }

    const putCheckIn = async (item, index) => {
        if (Object.keys(item).includes('email')) {
            const url = new URL(`https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/putCheckIn`)
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'Judge',
                    email: item.email
                }),
            })
                .then(res => res.json())
                .then(
                    async (result) => {
                        let tempChecks = {...checks}
                        tempChecks.judges[index].check = true
                        setChecks(tempChecks)
                        window.alert('Submitted Successfully')
                    }
                )
        } else {
            const url = new URL(`https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/putCheckIn`)
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'Project',
                    projectId: item._id.$oid
                }),
            })
                .then(res => res.json())
                .then(
                    async (result) => {
                        let tempChecks = {...checks}
                        tempChecks.projects[index].check = true
                        setChecks(tempChecks)
                        window.alert('Submitted Successfully')
                    }
                )
        }
    }


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

    useEffect(() => {
        getAwaitingChecks();
    }, [])

    return (
        <div className={'flex text-white p-20'}>
            <div className={'grow'}/>
            <div className={'flex flex-col gap-6 bg-blue-800 border-white border-2 px-8 py-2'}>
                <div className={'flex'}>
                    <div className={'grow'} />
                    <p className={'text-3xl font-bold'}>Judges</p>
                    <div className={'grow'} />
                    {(checks) && <p className={'my-auto'}>{checks.judges.filter(item => (item.check)).length} / {checks.judges.length}</p>}
                    <div className={'grow'} />
                </div>
                {(checks) && checks.judges.map((item, index) => (item.check) ?
                    <div className={'bg-blue-400 text-black border-amber-400 border-2 rounded w-full p-2 mx-auto flex flex-col gap-2'}>
                        <p className={'font-bold text-lg'}>{item.firstName} {item.lastName}</p>
                        <p>{item.email}</p>
                        <div className={'font-bold text-gray-600 select-none w-fit rounded p-1 mx-auto'}>Checked In</div>
                    </div>
                    :
                    <div className={'bg-amber-200 text-black border-amber-400 border-2 rounded w-full p-2 mx-auto flex flex-col gap-2'}>
                        <p className={'font-bold text-lg'}>{item.firstName} {item.lastName}</p>
                        <p>{item.email}</p>
                        <div onClick={() => putCheckIn(item, index)} className={'bg-blue-200 border-white border-2 select-none cursor-pointer w-fit rounded p-1 mx-auto hover:bg-blue-300'}>Check In</div>
                    </div>)}
            </div>
            <div className={'grow'}/>
            <div className={'flex flex-col gap-6 bg-blue-800 border-white border-2 px-8 py-2'}>
                <div className={'flex'}>
                    <div className={'grow'} />
                    <p className={'text-3xl font-bold'}>Projects</p>
                    <div className={'grow'} />
                    {(checks) && <p className={'my-auto'}>{checks.projects.filter(item => (item.check)).length} / {checks.projects.length}</p>}
                    <div className={'grow'} />
                </div>
                {(checks) && checks.projects.map((item, index) => (item.check) ?
                    <div className={'bg-blue-400 text-black border-amber-400 border-2 rounded w-fit p-2 mx-auto flex flex-col gap-2'}>
                        <p className={'font-bold'}>{item.name}</p>
                        <p>{renderStudentList(item.students)}</p>
                        <div className={'font-bold text-gray-600 select-none w-fit rounded p-1 mx-auto'}>Checked In</div>
                    </div>
                    :
                    <div className={'rounded p-2 bg-amber-200 border-amber-400 border-2 text-gray-900 shadow flex flex-col gap-2'}>
                        <p className={'font-bold'}>{item.name}</p>
                        <p>{renderStudentList(item.students)}</p>
                        <div onClick={() => putCheckIn(item, index)} className={'bg-blue-200 border-white border-2 select-none cursor-pointer w-fit rounded p-1 mx-auto hover:bg-blue-300'}>Check In</div>
                    </div>)}
            </div>
            <div className={'grow'}/>
        </div>
    );
}

export default CheckIn;