import React from 'react';
import StafferRow from "./stafferRow";

export default function StafferList({stateRef, makeChoice, areChosen}) {
    return (
        <div className="col ">{
            stateRef.current
                .filter(staffer => staffer && staffer.chosen === areChosen)
                .map((staffer, index) => (<StafferRow key={staffer.key} staffer={staffer} makeChoice={makeChoice} isOdd={index % 2 === 0} />))
        }
        </div>
    )
}
