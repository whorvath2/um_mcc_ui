import React from "react";

export default function StafferRow({staffer, makeChoice}) {
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
    const nameFixer = (staffer) => {
        const name = capitalize(staffer.name)
        const words = name.split(' ')
        const findSuffix = new RegExp('^i+|iv|v$', 'i')
        let result
        if (words[1].match(findSuffix)) {
            words[1] = words[1].toUpperCase();
            result = words[0] + ' ' + words[1] + ', ' + words.slice(2).join(' ')
        }
        else{
            result = words[0] + ', ' + words.slice(1).join(' ')
        }
        return result
    }

    return (
        <div className='StafferRow row' key={staffer.key}>
            <button className='button' onClick={() => makeChoice(staffer)}>
                <b>{nameFixer(staffer)}</b> {capitalize(staffer.title)} ({capitalize(staffer.department)})
            </button>
        </div>
    );
}
