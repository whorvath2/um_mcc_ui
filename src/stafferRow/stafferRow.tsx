import React from 'react';
import {Staffer} from '../types/staffer'

export interface StafferRowType {
    staffer: Staffer,
    isOdd: boolean,
    makeChoice: CallableFunction
}

export function StafferRow(props: StafferRowType) {

    function capitalizer(word: string) {
        let out = '';
        if (!word) {
            return out;
        } else if (word.match(/^[js]r$/i)) {
            out = word[0].toUpperCase() + "r";
        } else if (word.match(/^[iv]+$/i)) {
            out = word.toUpperCase();
        } else if (word === "of") {
            out = word;
        } else {
            out = word[0].toUpperCase();
            if (word.length > 1) {
                out += word.slice(1);
            }
        }
        if (out === "Mi" || out === "Mm") {
            out = out.toUpperCase();
        }
        return out;
    }

    const capitalize = (maybeWords?: string) => {
        if (maybeWords) {
            return maybeWords.toLowerCase()
                .split(/[, ]+/)
                .map((word) => capitalizer(word))
                .join(' ');
        } else return ''
    }

    const staffer: Staffer = props.staffer;
    const isOdd = props.isOdd;
    const makeChoice = props.makeChoice;
    return (
        <div className={"row"} key={staffer.key}>
            <button data-testid={`data-testid-${staffer.key}`}
                    className={"button".concat(
                        isOdd ? " text-bg-primary" : "")}
                    aria-label={staffer.key.toString()}
                    onClick={() => makeChoice(staffer)}>
                <span
                    className={"fw-bold"}>{capitalize(staffer.name)}</span> {capitalize(staffer.title)} ({capitalize(staffer.department)})
            </button>
        </div>
    );
}
