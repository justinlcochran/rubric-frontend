import React, {useEffect, useState} from 'react';
import ReportCard from "../components/reportCard";

function ScoreReport(props) {
    let [data, setData] = useState(null)
    const categories = ["3-4", "5-6", "7-8", "HS"]
    useEffect(() => {
        fetch(`https://wwfdiisxfn4zmijssy6glohkly0mohut.lambda-url.us-east-1.on.aws/`)
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
                {categories.map(item =>
                    <div className={`mx-2 bg-blue-500 rounded shadow-xl py-2 my-4`}>
                        <h1 className={'mb-2 text-white select-none text-3xl'}>{item}</h1>
                        <div className={"grid grid-cols-2 bg-blue-300 mx-2 rounded py-2"}>
                            <div>
                                <h1 className={'mb-2 text-white select-none text-3xl'}>I</h1>
                                <div className={`mx-auto`}>
                                    {data.filter(obj => obj.projectCategory === "I").filter(obj => obj.projectGrade === item).sort((a, b) => b.score - a.score).map((obj, index) => <ReportCard
                                        projectData={obj} score={obj.score} evals={obj.evals} ind={index}/>)}
                                </div>
                            </div>
                            <div>
                                <h1 className={'mb-2 text-white select-none text-3xl'}>G</h1>
                                <div className={'mx-auto'}>
                                    {data.filter(obj => obj.projectCategory === "G").filter(obj => obj.projectGrade === item).sort((a, b) => b.score - a.score).map((obj, index) => <ReportCard
                                        projectData={obj} score={obj.score} evals={obj.evals} ind={index}/>)}
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