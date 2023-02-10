import React from "react";

export default function StafferRow({staffer, makeChoice, isOdd}) {

    const findSep = new RegExp('[, ]', 'i');

    const capitalize = (word) => {
        if (word) {
            return word.toLowerCase()
                .split(findSep)
                .map(function (words) {
                    if (words && words.length > 1) {
                        return words[0].toUpperCase() + words.slice(1);
                    }
                    else if (words) {
                        return words[0].toUpperCase();
                    }
                    else {
                        return '';
                    }
                })
                .join(' ');
        }
        else return ''
    }

    return (
        <div className={"StafferRow row"} key={staffer.key}>
            <button
                className={"button".concat(
                    isOdd ? " text-bg-primary" : "")}
                onClick={() => makeChoice(staffer)}>
                <b>{staffer.name}</b> {capitalize(staffer.title)} ({capitalize(staffer.department)})
            </button>
        </div>
    );
}
