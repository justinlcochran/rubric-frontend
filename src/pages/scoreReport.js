import React, {useEffect, useState} from 'react';
import ReportCard from "../components/reportCard";

function ScoreReport(props) {
    let [data, setData] = useState(null)
    const categories = ["3-4", "5-6", "7-8", "HS"]
    useEffect(() => {
        fetch(`https://c1gqgecccj.execute-api.us-east-1.amazonaws.com/dev/getProjects`)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                }
            )
    }, [])
    if (data) {
        console.log(data)
    }
    if (data) {
        return (
            <div className={'grid grid-cols-4'}>
                <p className={'col-span-4 text-xl font-bold text-white'}>Scored:</p>
                {categories.map(item =>
                    <div className={`mx-2 bg-blue-500 rounded shadow-xl py-2 my-4`}>
                        <h1 className={'mb-2 text-white select-none text-3xl'}>{item}</h1>
                        <div className={"grid grid-cols-2 bg-blue-300 mx-2 rounded py-2"}>
                            <div>
                                <h1 className={'mb-2 text-white select-none text-3xl'}>I</h1>
                                <div className={`mx-auto`}>
                                    {data.filter(obj => obj.type === "I").filter(obj => (obj.scores.length !== 0)).filter(obj => obj.gradeBand === item).sort((a, b) => {
                                        const averageA = a.scores.reduce((acc, score) => acc + score, 0) / a.scores.length;
                                        const averageB = b.scores.reduce((acc, score) => acc + score, 0) / b.scores.length;
                                        return averageB - averageA; // Sort in descending order of average score
                                    }).map((obj, index) => <ReportCard
                                        projectData={obj} score={obj.scores.reduce((acc, score) => acc + score, 0) / obj.scores.length} evals={obj.rubrics} ind={index}/>)}
                                </div>
                            </div>
                            <div>
                                <h1 className={'mb-2 text-white select-none text-3xl'}>G</h1>
                                <div className={'mx-auto'}>
                                    {data.filter(obj => obj.type === "G").filter(obj => (obj.scores.length !== 0)).filter(obj => obj.gradeBand === item).sort((a, b) => b.score - a.score).map((obj, index) => <ReportCard
                                        projectData={obj} score={obj.score} evals={obj.evals} ind={index}/>)}
                                </div>
                            </div>

                        </div>
                    </div>
                )}
                <p className={'col-span-4 text-xl font-bold text-white'}>Awaiting Scores:</p>

                {categories.map(item =>
                    <div className={`mx-2 bg-gray-500 rounded shadow-xl py-2 my-4`}>
                        <h1 className={'mb-2 text-white select-none text-3xl'}>{item}</h1>
                        <div className={"grid grid-cols-2 bg-blue-300 mx-2 rounded py-2"}>
                            <div>
                                <h1 className={'mb-2 text-white select-none text-3xl'}>I</h1>
                                <div className={`mx-auto`}>
                                    {data.filter(obj => obj.type === "I").filter(obj => obj.check).filter(obj => obj.scores.length === 0).filter(obj => obj.gradeBand === item).map((obj, index) => <ReportCard
                                        projectData={obj} score={obj.scores.reduce((acc, score) => acc + score, 0) / obj.scores.length} evals={obj.rubrics} ind={index}/>)}
                                </div>
                            </div>
                            <div>
                                <h1 className={'mb-2 text-white select-none text-3xl'}>G</h1>
                                <div className={'mx-auto'}>
                                    {data.filter(obj => obj.type === "G").filter(obj => obj.check).filter(obj => obj.scores.length === 0).filter(obj => obj.gradeBand === item).sort((a, b) => b.score - a.score).map((obj, index) => <ReportCard
                                        projectData={obj} score={'x'} evals={obj.rubrics} ind={index}/>)}
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                <p className={'col-span-4 text-xl font-bold text-white'}>Not Checked In:</p>

                {categories.map(item =>
                    <div className={`mx-2 bg-gray-500 rounded shadow-xl py-2 my-4`}>
                        <h1 className={'mb-2 text-white select-none text-3xl'}>{item}</h1>
                        <div className={"grid grid-cols-2 bg-blue-300 mx-2 rounded py-2"}>
                            <div>
                                <h1 className={'mb-2 text-white select-none text-3xl'}>I</h1>
                                <div className={`mx-auto`}>
                                    {data.filter(obj => obj.type === "I").filter(obj => !obj.check).filter(obj => obj.scores.length === 0).filter(obj => obj.gradeBand === item).map((obj, index) => <ReportCard
                                        projectData={obj} score={'x'} evals={obj.rubrics} ind={index}/>)}
                                </div>
                            </div>
                            <div>
                                <h1 className={'mb-2 text-white select-none text-3xl'}>G</h1>
                                <div className={'mx-auto'}>
                                    {data.filter(obj => obj.type === "G").filter(obj => !obj.check).filter(obj => obj.scores.length === 0).filter(obj => obj.gradeBand === item).sort((a, b) => b.score - a.score).map((obj, index) => <ReportCard
                                        projectData={obj} score={'x'} evals={obj.rubrics} ind={index}/>)}
                                </div>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        );
    }
}
export default ScoreReport;