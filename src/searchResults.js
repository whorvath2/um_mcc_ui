import React from 'react';

export default function SearchResults({resultsStateRef}) {
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
        <div className="mt-xxl-5 container">
            <div className="row">
                <label className="col-form-label">Results: </label>
                <ul id="results">
                    {resultsStateRef.current.map((staffer) => (
                        <li key={staffer.key}>
                            <b>{nameFixer(staffer)}</b> {capitalize(staffer.title)} ({capitalize(staffer.department)})</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
