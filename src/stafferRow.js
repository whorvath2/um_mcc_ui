import React from "react";

export default function StafferRow({staffer, makeChoice, isOdd}) {
    function capitalizer(word) {
        let out = '';
        if (!word) {
            return out;
        } else if (word.match(/^[js]r$/i)) {
            console.log(word);
            out = word[0].toUpperCase() + "r";
            console.log(out);
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
    const capitalize = (maybeWords) => {
        if (maybeWords) {
            return maybeWords.toLowerCase()
                .split(/[, ]+/)
                .map((word) => capitalizer(word))
                .join(' ');
        }
        else return ''
    }

    return (
        <div className={"row"} key={staffer.key}>
            <button className={"button".concat(
                    isOdd ? " text-bg-primary" : "")}
                aria-label={staffer.key}
                onClick={() => makeChoice(staffer)}>
                <span className={"fw-bold"}>{capitalize(staffer.name)}</span> {capitalize(staffer.title)} ({capitalize(staffer.department)})
            </button>
        </div>
    );
}
