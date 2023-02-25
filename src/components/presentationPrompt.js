import React from 'react';

function PresentationPrompt(props) {
    return (
        <div className={`mx-2 bg-blue-400 rounded shadow-xl py-2 my-4`}>
            <h1 className={'mb-2 text-white select-none text-2xl'}>Student presentations should address each of the following:</h1>
            <div className={"py-4 mx-auto max-w-fit"}>
                <ul className={"text-sm text-white select-none"}>
                    <li className={"text-left"}>- What did you investigate? (Intro)</li>
                    <li className={"text-left"}>- What question did you try to answer? (Hypothesis)</li>
                    <li className={"text-left"}>- How did you do your experiment? (Method)</li>
                    <li className={"text-left"}>- What did you see? (Results)</li>
                    <li className={"text-left"}>- What did you learn? (Conclusions)</li>
                </ul>
            </div>
        </div>
    );
}

export default PresentationPrompt;