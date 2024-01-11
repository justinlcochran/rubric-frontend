import React from 'react';

function Loader(props) {
    return (
        <div className="flex justify-center items-center h-full mx-auto my-8">
            <div className="border-t-4 border-b-4 border-white h-6 w-6 rounded-full animate-spin mx-auto"></div>
        </div>
    );
}

export default Loader;