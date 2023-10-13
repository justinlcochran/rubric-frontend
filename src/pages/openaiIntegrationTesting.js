import React, {useState} from 'react';

function OpenaiIntegrationTesting(props) {
    let [prompt, setPrompt] = useState("")
    let [response, setResponse] = useState(null)

    const handleChange = (e) => {
        setPrompt(e.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("Going")
        const response = await fetch('https://baqombrpq62pg6kmylg6wla5hm0llxyb.lambda-url.us-east-1.on.aws/', {
            method: 'POST',
            body: JSON.stringify(prompt),
        });

        const result = await response.json();
        setResponse(result.body);
    };
    console.log(prompt)

    return (
        <div>
            <input type={"text"} onChange={handleChange}></input>
            <button onClick={handleSubmit}>Button</button>
            {(response) && <p>{response}</p>}
        </div>
    );
}

export default OpenaiIntegrationTesting;