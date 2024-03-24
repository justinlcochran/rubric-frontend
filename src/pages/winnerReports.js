import React, {useEffect, useState} from 'react';

function WinnerReports(props) {
    const [categoryIndex, setCategoryIndex] = useState(0)
    const [projects, setProjects] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const getJudgeContext = async () => {
        try {
            let url = new URL('https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/getWinnerSlides')
            const response = await fetch(url);
            const data = await response.json()
            setProjects(data)
        } catch (error) {
            console.error('Error fetching slides:', error)
        }
    }

    // Add event listener for spacebar key press
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === 'Space') {
                if (!isVisible) {
                    setIsVisible(!isVisible);
                } else {
                    setCategoryIndex(prevIndex => prevIndex + 1)
                    setIsVisible(!isVisible)
                }
            } else if (event.code === 'ArrowLeft') {
                setCategoryIndex(prevIndex => (prevIndex !== 0) ? prevIndex - 1 : 0);
                setIsVisible(false);
            }
        };

        document.body.addEventListener('keydown', handleKeyPress);

        // Cleanup function to remove the event listener when component unmounts
        return () => {
            document.body.removeEventListener('keydown', handleKeyPress);
        };
    }, [isVisible]); // useEffect will re-run if isVisible state changes

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

    let testReport = ['Intro Slide 1', 'Intro Slide 2',
        {
        name: 'Are High School Drinking Fountains Clean?',
        students: [{firstName: 'Braulio', lastName: 'Uribe'}, {firstName: 'Fabian', lastName: 'Miramontes'}, {firstName: 'Derek', lastName:'Marquez'}],
        band: 'High School Group',
        place: '3rd'
    },
        {
            name: 'What about the weather?',
            students: [{firstName: 'John', lastName: 'Stamos'}, {firstName: 'elizabeth', lastName: 'warren'}],
            band: 'High School Group',
            place: '2nd'
        },
        {
            name: 'How many licks?',
            students: [{firstName: 'Third', lastName: 'Student'}, {firstName: 'studnet', lastName: 'other kid'}],
            band: 'High School Group',
            place: '1st'
        },{
            name: 'Are High School Drinking Fountains Clean?',
            students: [{firstName: 'Braulio', lastName: 'Uribe'}],
            band: 'High School Independent',
            place: '3rd'
        },
        {
            name: 'What about the weather?',
            students: [{firstName: 'kid', lastName: 'person'}],
            band: 'High School Independent',
            place: '2nd'
        },
        {
            name: 'How many licks?',
            students: [{firstName: 'Third', lastName: 'Student'}],
            band: 'High School Independent',
            place: '1st'
        },
        {
            name: 'How many licks?',
            students: [{firstName: 'Third', lastName: 'Student'}],
            place: 'Overall Winner'
        },
        'Outro Slide'
    ]

    function titleCase(str) {
        return str.toLowerCase().replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        });
    }

     return (
        <div className={'h-full bg-violet-900 h-screen p-14 overflow-hidden'}>
            {(testReport) && testReport.map((item, index) => (categoryIndex === index) && (
                (item === 'Intro Slide 1') ?
                    <div className={'bg-white rounded-lg shadow p-20 my-auto mx-auto h-full flex items-center'}>
                        <img className={'mb-20 mx-auto'} src={'https://ucarecdn.com/1b46459c-4432-4f8f-83d2-f7a01e75c917/Untitled11x6in.png'} />
                    </div>
                    : (item === 'Intro Slide 2') ?
                        <div className={'bg-white rounded-lg shadow p-20 my-auto mx-auto h-full flex flex-col items-center'}>
                            <div className={'grow'} />
                            <p className={'font-bold text-violet-800 text-[160px]'}>Special Thanks</p>
                            <div className={'grow'} />
                            <p className={'text-violet-800 text-[100px]'}>to our school fair coordinators and guest judges from Anschutz!</p>
                            <div className={'grow'} />
                        </div>
                        : (item === 'Outro Slide') ? <div className={'bg-white rounded-lg shadow p-20 my-auto mx-auto h-full flex flex-col items-center'}>
                            <div className={'grow'} />
                            <p className={'font-bold text-violet-800 text-[100px]'}>Thank you for coming!</p>
                            <div className={'grow'} />
                            <p className={'text-violet-800 text-[100px]'}>Please make sure to collect all project materials and prizes as you leave!</p>
                            <div className={'grow'} />
                        </div>
                : (Object.keys(item).includes('band')) ?
                <div className={'h-full'}>
                    <p className={'font-bold text-7xl text-white mt-10 mb-32'}>{titleCase(item.band)} {item.place} Place:</p>
                    <div className={'flex'}>
                        <div className="absolute h-1/2 bg-gray-500 flex flex-col border-8 border-gray-200 p-4 rounded shadow-md transition-opacity w-[55%] duration-500 ease-in-out" style={{ opacity: isVisible ? 0 : 100 }}>
                            <p className={'text-white font-bold text-8xl my-auto'}>?</p>
                        </div>
                        <div className="flex flex-col bg-blue-300 border-8 border-gray-200 p-4 rounded shadow-md transition-opacity w-[60%] duration-500 ease-in-out" style={{ opacity: isVisible ? 100 : 0 }}>
                            <div className={'my-auto h-fit'}>
                                <p className={'text-6xl font-bold'}>{renderStudentList(item.students)}</p>
                                <p className={'py-14 text-2xl'}>for their project</p>
                                <p className={'text-6xl font-bold mb-20'}>{titleCase(item.name)}</p>
                            </div>
                        </div>
                        <div className={'w-[40%] h-full'}>
                            <img className={'max-w-full max-h-[560px] mx-auto'} alt={'ribbon'} src={(item.place === '1st') ? 'https://ucarecdn.com/0653c4f4-a86d-4573-bca4-3ebcbd143c39/1.png' : (item.place === '2nd') ? 'https://ucarecdn.com/2c22a891-55f1-4b48-a810-01455f0cdeaa/2.png' : (item.place === '3rd') ? 'https://ucarecdn.com/4189dd34-a8f0-43c6-b8c0-d649f19f1e2b/3.png' : 'https://ucarecdn.com/de0e5022-7a22-48b1-8b0e-0c9bed8bbec3/1st.png'} />
                        </div>
                    </div>
                </div>
                :
                <div className={'h-full'}>
                    <p className={'font-bold text-7xl text-white mt-10 mb-32'}>Mapleton District Science Fair Best in Show</p>
                    <div className={'flex'}>
                        <div className="absolute h-1/2 bg-gray-500 flex flex-col border-8 border-gray-200 p-4 rounded shadow-md transition-opacity w-[55%] duration-500 ease-in-out" style={{ opacity: isVisible ? 0 : 100 }}>
                            <p className={'text-white font-bold text-8xl my-auto'}>?</p>
                        </div>
                        <div className="flex flex-col bg-violet-400 border-8 border-gray-200 p-4 rounded shadow-md transition-opacity w-[60%] duration-500 ease-in-out" style={{ opacity: isVisible ? 100 : 0 }}>
                            <div className={'my-auto h-fit'}>
                                <p className={'text-6xl font-bold'}>{renderStudentList(item.students)}</p>
                                <p className={'py-14 text-2xl'}>for their project</p>
                                <p className={'text-6xl font-bold mb-20'}>{titleCase(item.name)}</p>
                            </div>
                        </div>
                        <div className={'w-[40%] h-full'}>
                            <img className={'max-w-full max-h-[560px] mx-auto'} alt={'ribbon'} src={(item.place === '1st') ? 'https://ucarecdn.com/0653c4f4-a86d-4573-bca4-3ebcbd143c39/1.png' : (item.place === '2nd') ? 'https://ucarecdn.com/2c22a891-55f1-4b48-a810-01455f0cdeaa/2.png' : (item.place === '3rd') ? 'https://ucarecdn.com/4189dd34-a8f0-43c6-b8c0-d649f19f1e2b/3.png' : 'https://ucarecdn.com/3da5422a-09e5-40ad-a1e8-c5d3e0545e2c/1st1.png'} />
                        </div>
                    </div>
                </div>
            ))}
            {/*First Place Image*/}
            {/*Second Place Image*/}
            {/*<img src={'https://ucarecdn.com/2c22a891-55f1-4b48-a810-01455f0cdeaa/2.png'} />*/}
            {/*Third Place Image*/}
            {/*<img src={'https://ucarecdn.com/4189dd34-a8f0-43c6-b8c0-d649f19f1e2b/3.png'} />*/}
        </div>
    );
}

export default WinnerReports;