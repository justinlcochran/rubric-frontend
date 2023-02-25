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
                bottom: "Required materials section absent from the project",
                middle: "Materials section includes some but not all required materials",
                top: "Materials section describes all required material and equipment"},
            {text: 'Experiment is Clearly Outlined', criterionID: 6,
                bottom: "Procedure is difficult to navigate",
                middle: "Procedure describes the goals of several steps with low specificity",
                top: "Project includes clear, detailed, and replicable procedure"},
            {text: 'Variables are Defined', criterionID: 7,
                bottom: "Variables are not defined",
                middle: "Variables are defined informally, Independent and Dependent variables are not delineated",
                top: "Independent and Dependent variables are clearly defined"},
            {text: 'Procedure Highlights Setup, Data Collection, and Data Analysis', criterionID: 8,
                bottom: "Procedure does not describe one or more of the above sections",
                middle: "Procedure includes description of each of the above sections",
                top: "Project clearly delineates between each of the section above, separating steps into relevant categories"},
            {text: 'Creativity', criterionID: 19,
                bottom: "Project reflects low creativity in its design",
                middle: "Project reflects original thinking and inspiration",
                top: "Project demonstrates genuine curiosity and a clear and original pursuit of new understanding"},
            {text: 'Organization', criterionID: 14,
                bottom: "Visual Aid is poorly organized",
                middle: "Color coding or other organizational tools are used to limited success",
                top: "Color coding or other organizational tools are used effectively to support readers' understanding of the visual aid"},
            {text: 'Accessibility', criterionID: 15,
                bottom: "Visual Aid is unclear, ineligible, and not formatted for presentation",
                middle: "Visual Aid is accessible to the average viewer",
                top: "Visual Aid is clear, concise, and connects sections in a logical sequence conducive to understanding"},
            {text: 'Depth of Understanding', criterionID: 16,
                bottom: `I: Low understanding\nG: Singular participation`,
                middle: "I: General understanding\nG: Some collaboration",
                top: "I: Detailed understanding\nG: Full collaboration"},
            {text: 'Coherence of Presentation', criterionID: 17,
                bottom: "Presentation is scattered and lacks logical sequence",
                middle: "Presentation is roughly ordered and lacks clear transitions between topics",
                top: "Presentation follows a logical sequence and features transition language when moving between sections"},
            {text: 'Ability to Respond to Questions', criterionID: 18,
                bottom: "Responses to questions are unclear or nonexistent",
                middle: "Responses to questions are limited and fail to account for possible missing information",
                top: "Responses to questions are developed, and student readily discusses possible gaps in understanding"},
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
            {text: 'Attention Grabbing', criterionID: 20,
                bottom: "Visual Aid does little to stand out among other projects",
                middle: "Visual Aid is inviting to viewers",
                top: "Visual Aid clearly grabs viewer attention and directs it toward the topic."},

        ],
        categories: [
            {title: "Presentation", criteria: [16, 17, 18]},
            {title: "Introduction", criteria: [1, 2,]},
            {title: "Hypothesis", criteria: [3, 4,]},
            {title: "Experimental Design", criteria: [5, 6, 7, 8, 19]},
            {title: "Results", criteria: [9, 10,]},
            {title: "Conclusions", criteria: [11, 12, 13]},
            {title: "Visual Aid", criteria: [14, 15, 20]},


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