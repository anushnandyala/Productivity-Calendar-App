import React from "react";

export const CurrentBoxes = ()  => {
    return (
        <>
            <div id="currentDayDisplay">Current Day:</div>

            <div id="currentBoxContainer">             
                <div className="currentBox schedule"></div>
                <div className="currentBox exams"></div>
                <div className="currentBox assignments"></div>
            </div>
        </>

        
    )
};