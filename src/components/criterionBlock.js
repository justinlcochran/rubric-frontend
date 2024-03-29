import React, {useContext} from 'react';
import scoringContext from "../context/scoringContext";
import RubricAid from "./rubricAid";

function CriterionBlock({ text, bottom, middle, top, criterionID }) {
    let {submission, setSubmission} = useContext(scoringContext)
    try {
        let score = submission[`criterion${criterionID}`].score
    } catch (TypeError) {
        let score = 'Not Yet Scored'
    }

    // let handleCheck = () => {
    //     let scores = {...submission};
    //     scores[`criterion${criterionID}`] = {text: text, criterionID: criterionID, score: 1};
    //     setSubmission(scores);
    // }
    //
    // let handleEx = () => {
    //     let scores = {...submission};
    //     scores[`criterion${criterionID}`] = {text: text, criterionID: criterionID, score: 0};
    //     setSubmission(scores);
    // }

    let handleScoreTap = (e) => {
        let scores = {...submission};
        scores[`criterion${criterionID}`] = {text: text, criterionID: criterionID, score: e.target.id}
        setSubmission(scores)
    }
    return (
        (Object.keys(submission).includes(`criterion${criterionID}`)) ? (submission[`criterion${criterionID}`].score == 1) ?

                <div className={'col-span-5 grid grid-cols-5 pt-4 bg-red-300 min-h-full rounded shadow border-4 border-slate-300 text-xl'}>
                    <h1 className={'col-span-5 py-4 px-2 mb-3 select-none text-2xl font-bold'}>{text}</h1>
                    <div className={'col-span-1 align-bottom mt-auto text-center bg-red-300 py-4 drop-shadow-xl border-b-4 border-white'} onClick={handleScoreTap} id={1}>1</div>
                    <div className={'col-span-1 align-bottom mt-auto text-center bg-orange-300 py-4'} onClick={handleScoreTap} id={2}>2</div>
                    <div className={'col-span-1 align-bottom mt-auto text-center bg-amber-300 py-4'} onClick={handleScoreTap} id={3}>3</div>
                    <div className={'col-span-1 align-bottom mt-auto text-center bg-lime-300 py-4'} onClick={handleScoreTap} id={4}>4</div>
                    <div className={'col-span-1 align-bottom mt-auto text-center bg-green-300 py-4'} onClick={handleScoreTap} id={5}>5</div>
                    <RubricAid bottom={bottom} middle={middle} top={top} />
                </div>

                : (submission[`criterion${criterionID}`].score == 2) ?
                    <div className={'grid grid-cols-5 pt-4 bg-orange-300 min-h-full rounded shadow border-4 border-slate-300 text-xl'}>
                        <h1 className={'col-span-5 py-4 px-2 mb-3 select-none text-2xl shadow-orange-400 font-bold'}>{text}</h1>
                        <div className={'align-bottom mt-auto text-center bg-red-300 py-4 select-none'} onClick={handleScoreTap} id={1}>1</div>
                        <div className={'align-bottom mt-auto text-center bg-orange-300 py-4 drop-shadow-xl border-b-4 border-white select-none'} onClick={handleScoreTap} id={2}>2</div>
                        <div className={'align-bottom mt-auto text-center bg-amber-300 py-4 select-none'} onClick={handleScoreTap} id={3}>3</div>
                        <div className={'align-bottom mt-auto text-center bg-lime-300 py-4 select-none'} onClick={handleScoreTap} id={4}>4</div>
                        <div className={'align-bottom mt-auto text-center bg-green-300 py-4 select-none'} onClick={handleScoreTap} id={5}>5</div>
                        <RubricAid bottom={bottom} middle={middle} top={top} />
                    </div>
                    : (submission[`criterion${criterionID}`].score == 3) ?
                        <div className={'grid grid-cols-5 pt-4 bg-amber-300 min-h-full rounded shadow border-4 border-slate-300 text-xl'}>
                            <h1 className={'col-span-5 py-4 px-2 mb-3 select-none text-2xl shadow-amber-300 font-bold'}>{text}</h1>
                            <div className={'align-bottom mt-auto text-center bg-red-300 py-4 select-none'} onClick={handleScoreTap} id={1}>1</div>
                            <div className={'align-bottom mt-auto text-center bg-orange-300 py-4 select-none'} onClick={handleScoreTap} id={2}>2</div>
                            <div className={'align-bottom mt-auto text-center bg-amber-300 py-4 drop-shadow-xl border-b-4 border-white select-none'} onClick={handleScoreTap} id={3}>3</div>
                            <div className={'align-bottom mt-auto text-center bg-lime-300 py-4 select-none'} onClick={handleScoreTap} id={4}>4</div>
                            <div className={'align-bottom mt-auto text-center bg-green-300 py-4 select-none'} onClick={handleScoreTap} id={5}>5</div>
                            <RubricAid bottom={bottom} middle={middle} top={top} />
                        </div>
                        : (submission[`criterion${criterionID}`].score == 4) ?
                            <div className={'grid grid-cols-5 pt-4 bg-lime-300 min-h-full rounded shadow border-4 border-slate-300 text-xl'}>
                                <h1 className={'col-span-5 py-4 px-2 mb-3 select-none text-2xl shadow-lime-300 font-bold'}>{text}</h1>
                                <div className={'align-bottom mt-auto text-center bg-red-300 py-4 select-none'} onClick={handleScoreTap} id={1}>1</div>
                                <div className={'align-bottom mt-auto text-center bg-orange-300 py-4 select-none'} onClick={handleScoreTap} id={2}>2</div>
                                <div className={'align-bottom mt-auto text-center bg-amber-300 py-4 select-none'} onClick={handleScoreTap} id={3}>3</div>
                                <div className={'align-bottom mt-auto text-center bg-lime-300 py-4 drop-shadow-xl border-b-4 border-white select-none'} onClick={handleScoreTap} id={4}>4</div>
                                <div className={'align-bottom mt-auto text-center bg-green-300 py-4 select-none'} onClick={handleScoreTap} id={5}>5</div>
                                <RubricAid bottom={bottom} middle={middle} top={top} />
                            </div>
                            :
                            <div className={'grid grid-cols-5 pt-4 bg-green-300 min-h-full rounded shadow border-4 border-slate-300 text-xl'}>
                                <h1 className={'col-span-5 py-4 px-2 mb-3 select-none text-2xl shadow-green-300 font-bold'}>{text}</h1>
                                <div className={'align-bottom mt-auto text-center bg-red-300 py-4 select-none'} onClick={handleScoreTap} id={1}>1</div>
                                <div className={'align-bottom mt-auto text-center bg-orange-300 py-4 select-none'} onClick={handleScoreTap} id={2}>2</div>
                                <div className={'align-bottom mt-auto text-center bg-amber-300 py-4 select-none'} onClick={handleScoreTap} id={3}>3</div>
                                <div className={'align-bottom mt-auto text-center bg-lime-300 py-4 select-none'} onClick={handleScoreTap} id={4}>4</div>
                                <div className={'align-bottom mt-auto text-center bg-green-300 py-4 drop-shadow-xl border-b-4 border-white select-none'} onClick={handleScoreTap} id={5}>5</div>
                                <RubricAid bottom={bottom} middle={middle} top={top} />
                            </div>
            :
            <div className={'grid grid-cols-5 pt-4 bg-gray-100 min-h-full rounded shadow border-4 border-slate-300 text-xl'}>
                <h1 className={'col-span-5 py-4 px-2 mb-3 select-none text-2xl font-bold'}>{text}</h1>
                <div className={'align-bottom mt-auto text-center bg-red-300 py-4 select-none'} onClick={handleScoreTap} id={1}>1</div>
                <div className={'align-bottom mt-auto text-center bg-orange-300 py-4 select-none'} onClick={handleScoreTap} id={2}>2</div>
                <div className={'align-bottom mt-auto text-center bg-amber-300 py-4 select-none'} onClick={handleScoreTap} id={3}>3</div>
                <div className={'align-bottom mt-auto text-center bg-lime-300 py-4 select-none'} onClick={handleScoreTap} id={4}>4</div>
                <div className={'align-bottom mt-auto text-center bg-green-300 py-4 select-none'} onClick={handleScoreTap} id={5}>5</div>
                <RubricAid bottom={bottom} middle={middle} top={top} />

            </div>
    );
}

export default CriterionBlock;