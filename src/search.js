import React from 'react';

export default function Search() {
    const [termState, setTermState] =     React.useState("");
    const [resultsState, _setResultsState] =     React.useState([]);
    const [chosenState, _setChosenState] =     React.useState([]);
    
    const resultsStateRef = React.useRef(resultsState)
    const chosenStateRef = React.useRef(chosenState)
    const setResultsState = data => {
        resultsStateRef.current = data;
        _setResultsState(data);
    }
    const setChosenState = data => {
        chosenStateRef.current = data;
        _setChosenState(data);
    }

    function search(e) {
        e.preventDefault()
        const query ='name='.concat(`${termState}`)
        if (!query) {
            return [];
        }
        fetch('http://localhost:8662/um_mcc/find?' + query)
            .then(response => {
                return response.json();
            }).then(data => {
                setResultsState(data ? data : []);
            })
            .catch((error) => {
                return console.log(error);
            });
    }
    return (
        <div className="mt-xxl-5 container col-sm-4">
            <div className="row">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Find Staff</h5>
                        <form onSubmit={search}>
                            <div className="mb-3">
                                <label className="col-form-label">Name: </label>
                                <input id="searchTerm"
                                       className="form-control"
                                       type="text"
                                       placeholder="Search by name"
                                       onChange={event => setTermState(event.target.value || "")}/>
                                <label className="col-form-label">Results: </label>
                            </div>
                            <button className="btn btn-primary">Search Staff</button>
                        </form>
                        <ul id="results">
                            {resultsStateRef.current.map((staffer) => (
                                <li key={staffer.key}>{staffer.name} {staffer.title} {staffer.department}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}