import React from 'react';

function Loader(props) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            {/* Loader */}
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300"></div>
        </div>
    );
}

export default Loader;