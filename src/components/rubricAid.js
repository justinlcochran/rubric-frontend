import React from 'react';

function RubricAid({bottom, middle, top}) {
    return (
        <div className={'col-span-5 grid grid-cols-5 bg-slate-100'}>
            <div className={'col-span-1 text-black text-xs my-auto py-2'}>{bottom}</div>
            <div className={'col-span-1'}></div>
            <div className={'col-span-1 text-black text-xs my-auto mx-2 p-2'}>{middle}</div>
            <div className={'col-span-1'}></div>
            <div className={'col-span-1 text-black text-xs my-auto py-2'}>{top}</div>
        </div>
    );
}

export default RubricAid;
