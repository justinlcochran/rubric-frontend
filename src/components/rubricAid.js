import React from 'react';

function RubricAid({bottom, middle, top}) {
    return (
        <div className={'col-span-5 flex bg-slate-100'}>
            <div className={' text-black text-xs my-auto py-2 text-left'}><p>{(bottom) ? (bottom.includes("\n")) ? bottom.split('\n').map(item => <p>{item}</p>) : bottom : bottom}</p></div>
            <div className={'grow min-w-[12%]'}></div>
            <div className={' text-black text-xs my-auto mx-2 p-2 text-left'}><p>{(middle) ? (middle.includes("\n")) ? middle.split('\n').map(item => <p>{item}</p>) : middle : middle}</p></div>
            <div className={'grow min-w-[12%]'}></div>
            <div className={' text-black text-xs my-auto py-2 text-left'}>{(top) ? (top.includes("\n")) ? top.split('\n').map(item => <p>{item}</p>) : top : top}</div>
        </div>
    );
}

export default RubricAid;
