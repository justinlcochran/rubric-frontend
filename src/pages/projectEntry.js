import React, {useState} from 'react';

function ProjectEntry(props) {

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        for (const value of formData.values()) {
            console.log(value);
        }

        const response = await fetch('https://x336gulrsaplshc5k4owblvlgy0zbzym.lambda-url.us-east-1.on.aws/', {
            method: 'POST',
            headers: {'Content-Type': 'text/csv'},
            body: formData,
        });

        const result = await response.json();
        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
}



export default ProjectEntry;