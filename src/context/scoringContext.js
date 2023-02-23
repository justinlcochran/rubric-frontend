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
            {text: 'Clear Research Question', criterionID: 2,
                bottom: "Project lacks a research question",
                middle: "Project includes a question that is related to the topic of investigation",
                top: "Project includes a research question that clearly relates to the problem statement, pointing to collection of relevant data"},
            {text: 'Clearly Stated Hypothesis', criterionID: 3,
                bottom: "Project lacks a stated hypothesis",
                middle: "Project includes a loosely formatted prediction for the outcome of the investigation",
                top: 'Project includes a concise "if, then" statement predicting the outcome of the investigation'},
            {text: 'Alignment of Hypothesis and Method', criterionID: 4,
                bottom: "No alignment",
                middle: "Method aligns, but data do not relate clearly to the prediction",
                top: "Clear alignment between hypothesis, method, and data collected"},
            {text: 'Materials', criterionID: 5,
                bottom: "Procedure is difficult to navigate",
                middle: "Procedure describes the goals of several steps with low specificity",
                top: "Project includes clear, detailed, and replicable procedure"},
            {text: 'Experiment is Clearly Outlined', criterionID: 6,
                bottom: "Procedure is difficult to navigate",
                middle: "Procedure describes the goals of several steps with low specificity",
                top: "Project includes clear, detailed, and replicable procedure"},
            {text: 'Variables are Defined', criterionID: 7,
                bottom: "Variables are not defined",
                middle: "Variables are defined informally, dependent and independent are not delineated",
                top: "Independent and Dependent variables are clearly defined"},

            {text: 'Procedure Highlights Setup, Data Collection, and Data Analysis', criterionID: 8},
            {text: 'Organization', criterionID: 14},
            {text: 'Accessibility', criterionID: 15},
            {text: 'Depth of Understanding', criterionID: 16,
                bottom: `I: Low understanding\nG: Singular participation`,
                middle: "I: General understanding\nG: Some collaboration",
                top: "I: Detailed understanding\nG: Full collaboration"},
            {text: 'Coherence of Presentation', criterionID: 17},
            {text: 'Ability to Respond to Questions', criterionID: 18},
            {text: 'Results Inform Investigation of the Hypothesis', criterionID: 9,
                bottom: "Data do not relate to the hypothesis",
                middle: "Data are related but fail to support or reject the hypothesis",
                top: "Data clearly support or reject the hypothesis"},
            {text: 'Data Are Represented Visually', criterionID: 10,
                bottom: "Data are not visually apparent",
                middle: "Data are represented with a table, chart, or graph",
                top: "Data visualization supports clear understanding of trends in the data"},
            {text: 'Clear Conclusions are Drawn', criterionID: 11,
                bottom: "Conclusions not present",
                middle: "Conclusions imply connection to data",
                top: "Conclusions are explicitly connected to data"},
            {text: 'Discussion of Significance', criterionID: 12,
                bottom: "No discussion",
                middle: "Significance of conclusion is implied",
                top: "Significance of conclusions is clearly outlined"},
            {text: 'Future Research', criterionID: 13,
                bottom: "Discussion of future research not present",
                middle: "Proposed future research is related to the overall problem",
                top: "Proposed future research builds on new understanding or identified flaws"},



        ],
        categories: [
            {title: "Presentation", criteria: [16, 17, 18]},
            {title: "Introduction", criteria: [1, 2,]},
            {title: "Hypothesis", criteria: [3, 4,]},
            {title: "Experimental Design", criteria: [5, 6, 7, 8]},
            {title: "Results", criteria: [9, 10,]},
            {title: "Conclusions", criteria: [11, 12, 13]},
            {title: "Visual Aid", criteria: [14, 15,]},


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