import { createContext, useState, useEffect } from "react";

const ScoreContext = createContext();

export default ScoreContext;

export const ScoreProvider = ({children}) => {
    let [submission, setSubmission] = useState({});

    let rubric = {
        rubricElements: [
            {text: 'Clear Problem Statement', criterionID: 1,
                bottom: "Project lacks a meaningful problem statement",
                middle: "Project includes problem statements and related background knowledge",
                top: "Project includes problem statements, written succinctly, derived from background knowledge"},
            {text: 'Clear Research Question', criterionID: 2},
            {text: 'Clear Relationship Between Problem and Question', criterionID: 3},
            {text: 'Clearly Stated Hypothesis', criterionID: 4},
            {text: 'Hypothesis Provides Framework for Experiment', criterionID: 5},
            {text: 'Hypothesis Points to Meaningful Data Collection', criterionID: 6},
            {text: 'Experimental Design Suits Hypothesis', criterionID: 7},
            {text: 'Experiment is Feasible', criterionID: 8},
            {text: 'Variables are Defined', criterionID: 9},
            {text: 'Step-by-step Procedural Instructions', criterionID: 10},
            {text: 'Clear List of Materials Required', criterionID: 11},
            {text: 'Procedure Highlights Setup, Data Collection, and Data Analysis', criterionID: 12}
        ],
        categories: [
            {title: "Research Question", criteria: [1, 2, 3]},
            {title: "Hypothesis", criteria: [4, 5, 6]},
            {title: "Experimental Design", criteria: [7, 8, 9]},
            {title: "Procedure", criteria: [10, 11, 12]},

        ]}

    let contextData = {
        submission: submission,
        setSubmission: setSubmission,
        rubric: rubric
    }
    return (
        <ScoreContext.Provider value={contextData}>
            {children}
        </ScoreContext.Provider>
    )
}