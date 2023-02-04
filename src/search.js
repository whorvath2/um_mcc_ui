import React from 'react';
import StafferList from "./stafferList";

export default function Search() {
    const [termState, setTermState] = React.useState("");
    const [resultsState, _setResultsState] = React.useState([]);
    const [chosenState, _setChosenState] = React.useState([]);
    
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

    function makeChoice(staffer) {
        staffer.chosen = !staffer.chosen
        if (staffer.chosen){
            setChosenState(chosenState.filter(item => item.key !== staffer.key).concat(staffer))
            setResultsState(resultsState.filter(emp => emp.key !== staffer.key))
        }
        else{
            setChosenState(chosenState.filter(emp => emp.key !== staffer.key))
            setResultsState(resultsState.concat(staffer))
        }
    }

    function search(e) {
        e.preventDefault();
        const query ='name='.concat(`${termState}`);
        if (!query) {
            return [];
        }
        fetch('http://localhost:8662/um_mcc/find?' + query)
            .then(response => {
                return response.json();
            }).then(data => {
                data.forEach(item => {item.chosen = false})
                setResultsState(data ? data : []);
            })
            .catch((error) => {
                return console.log(error);
            });
    }
    return (
        <div className="Search">
            <h5 className="title">Find Staff</h5>
            <form onSubmit={search}>
                <label className="label left">Name:
                    <input id="searchTerm"
                           className="form-control"
                           type="text"
                           placeholder="Search by name"
                           onChange={event => setTermState(event.target.value || "")}/>
                </label>
                <button className="btn btn-primary">Search Staff</button>
            </form>
            <div className="container text-left">
                <div className="row">
                    <div className="col">
                        <label className="col-form-label">Search Results:</label>
                        <StafferList stateRef={resultsStateRef} makeChoice={makeChoice} areChosen={false} />
                    </div>
                    <div className="col">
                        <label className="col-form-label">Selected Attendees:</label>
                        <StafferList stateRef={chosenStateRef} makeChoice={makeChoice} areChosen={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}