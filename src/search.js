import React from 'react';
import StafferList from "./stafferList";

export default function Search() {
    const [minutesState, setMinutesState] = React.useState(0)
    const [termState, setTermState] = React.useState("");
    const [costState, setCostState] = React.useState("$0");
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
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {item.chosen = false})
                setResultsState(data ? data : []);
            })
            .catch((error) => console.log(error));
    }

    function calculateCost(e){
        e.preventDefault();
        if (!minutesState){
            return 0
        }
        fetch('http://localhost:8662/um_mcc/cost/' + minutesState, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(chosenState)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCostState("$" + data.cost);
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="Search row">
            <div className="col-2"/>
            <div className="col gx-5">
                <h3 className="title">Find Staff</h3>
                <form className="form" onSubmit={search}>
                    <label className="label">Name:
                        <input id="searchTerm"
                               className="form-control"
                               type="text"
                               placeholder="Search by name"
                               onChange={event => setTermState(event.target.value || "")}/>
                    </label>
                    <button className="btn btn-primary">Search Staff</button>
                    <div>
                        <label className="col-form-label">Search Results:</label>
                        <StafferList stateRef={resultsStateRef} makeChoice={makeChoice} areChosen={false} />
                    </div>
                </form>
            </div>
            <div className="col gx-5">
                <h3 className="title">Selected Attendees</h3>
                <StafferList stateRef={chosenStateRef} makeChoice={makeChoice} areChosen={true}/>
                <form className="form" onSubmit={calculateCost}>
                    <label className="label left">Meeting Length:
                        <input id="meetingLength"
                               className="form-control"
                               type="number"
                               placeholder="Enter length in minutes"
                               onChange={event => setMinutesState(event.target.valueAsNumber)}/>
                    </label>
                    <button className={"btn btn-primary"}>Calculate Meeting Cost</button>
                </form>
                <p>Meeting Cost: {costState}</p>
            </div>
            <div className="col-2"/>

        </div>
    )
}