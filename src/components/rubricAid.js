import React from 'react';

function RubricAid({bottom, middle, top}) {
    return (
        <div className={'col-span-5 grid grid-cols-5 bg-slate-100'}>
            <div className={'col-span-1 text-black text-xs my-auto py-2'}><p>{(bottom) ? (bottom.includes("\n")) ? bottom.split('\n').map(item => <p>{item}</p>) : bottom : bottom}</p></div>
            <div className={'col-span-1'}></div>
            <div className={'col-span-1 text-black text-xs my-auto mx-2 p-2'}><p>{(middle) ? (middle.includes("\n")) ? middle.split('\n').map(item => <p>{item}</p>) : middle : middle}</p></div>
            <div className={'col-span-1'}></div>
            <div className={'col-span-1 text-black text-xs my-auto py-2'}>{(top) ? (top.includes("\n")) ? top.split('\n').map(item => <p>{item}</p>) : top : top}</div>
        </div>
    );
}

export default RubricAid;
