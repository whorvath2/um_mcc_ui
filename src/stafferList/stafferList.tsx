import React from 'react';
import {StafferRow} from "../stafferRow/stafferRow";
import {Staffer} from "../types/staffer";

export interface StafferListType {
    name: string,
    staffers: React.MutableRefObject<Staffer[]>,
    makeChoice: CallableFunction,
    areChosen: boolean
}

export default function StafferList(props: StafferListType) {
    const name = props.name;
    const staffers: React.MutableRefObject<Staffer[]> = props.staffers;
    const makeChoice: CallableFunction = props.makeChoice;
    const areChosen: boolean = props.areChosen;

    return (
        <div className={"col"} id={name} aria-label={name}>{
            staffers.current
                .filter((staffer: Staffer) => staffer && staffer.chosen === areChosen)
                .map((staffer: Staffer, index: number) => (
                    <StafferRow key={staffer.key} staffer={staffer} makeChoice={makeChoice} isOdd={index % 2 === 0}/>))
        }
        </div>
    )
}
