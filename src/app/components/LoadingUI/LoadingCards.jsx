import React from 'react';
import Spinner from './Spinner';

const LoadingCards = ({ type }) => {
    return (
        <div className='relative flex items-center justify-center gap-2'>
            {/* <div className={` ${type == "vertical" ? "w-full xxs:w-64 aspect-[4/5] " : "w-full xxs:w-96 aspect-[4/2] "}`}>

            </div> */}
            <div className={`${type == "vertical" ? "h-[25rem]" : "h-64"}`}>
                <Spinner></Spinner>
            </div>
        </div>
    );
}

export default LoadingCards;
