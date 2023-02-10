import React from 'react';
import StafferList from "./stafferList";
import MeetingCalculator from "./meetingCalculator";

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
        fetch('http://localhost:8000/um_mcc/find?' + query)
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {item.chosen = false})
                setResultsState(data ? data : []);
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className={"Search"}>
            <div className={"row"}>
                <div className={"col-2"}/>
                <div className={"col col-4 gx-5 sticky-top"}>
                    <div className={"row m-2"}>
                    <h3 className={"title"}>Find Staff</h3>
                        <form className={"form"} onSubmit={search}>
                            <label className={"label m-3"} htmlFor={"searchTerm"}>Name:</label>
                            <input id={"searchTerm"}
                                   className={"form-control"}
                                   type={"text"}
                                   placeholder={"Search by name"}
                                   onChange={event => setTermState(event.target.value || "")}/>
                            <button className={"btn btn-primary m-3"}>Search Staff</button>
                            <div className={"m-2"}>
                                <p className={"col-form-label"}>Search Results:</p>
                                <StafferList stateRef={resultsStateRef} makeChoice={makeChoice} areChosen={false} id={"searchResults"}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={"col col-4 gx-5"}>
                    <div className={"row m-2"}>
                        <h3 className={"title"}>Selected Attendees</h3>
                        <StafferList stateRef={chosenStateRef} makeChoice={makeChoice} areChosen={true} id="chosenAttendees"/>
                    </div>
                </div>
                <div className={"col-2"}/>
            </div>
            <MeetingCalculator chosenStateRef={chosenStateRef} />
        </div>
    )
}