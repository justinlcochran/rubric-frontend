import React from 'react';
import CriterionBlock from "./criterionBlock";

function CategoryCard({ title, criteria }) {
    return (
        <div className={`mx-2 bg-blue-500 rounded shadow-xl py-2 my-4`}>
            <h1 className={'mb-2 text-white select-none text-3xl'}>{title}</h1>
            <div className={`mx-auto`}>
                {criteria.map(item =>
                    <div className={'mx-2 mb-4'}>
                        <CriterionBlock text={item.text} bottom={item.bottom} middle={item.middle} top={item.top} criterionID={item.criterionID}/>
                    </div>)}
            </div>
        </div>
    );
}

export default CategoryCard;