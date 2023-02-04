import React from 'react';
import StafferRow from "./stafferRow";

export default function StafferList({stateRef, makeChoice, areChosen}) {
    return (
        <div className="col">{
            stateRef.current
                .filter(staffer => staffer && staffer.chosen === areChosen)
                .map(staffer => (<StafferRow key={staffer.key} staffer={staffer} makeChoice={makeChoice} />))
        }
        </div>
    )
}
