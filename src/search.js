import React from 'react';
import StafferList from "./stafferList";
import MeetingCalculator from "./meetingCalculator";

export default function Search() {
    const [nameState, setNameState] = React.useState("");
    const [titleState, setTitleState] = React.useState("");
    const [deptState, setDeptState] = React.useState("");
    const [resultsState, _setResultsState] = React.useState([]);
    const [chosenState, _setChosenState] = React.useState([]);

    const resultsStateRef = React.useRef(resultsState)
    const chosenStateRef = React.useRef(chosenState)

    const setResultsState = data => {
        data.sort(sortByName);
        resultsStateRef.current = data;
        _setResultsState(data);
    }

    const setChosenState = data => {
        data.sort(sortByName);
        chosenStateRef.current = data;
        _setChosenState(data);
    }

    function sortByName(stafferOne, stafferTwo) {
        return (stafferOne.name === stafferTwo.name) ? 0 : (stafferOne.name > stafferTwo.name) ? 1 : -1;
    }

    function makeChoice(staffer) {
        staffer.chosen = !staffer.chosen
        if (staffer.chosen && !chosenState.some(emp => emp.key === staffer.key)) {
            setChosenState(chosenState.concat(staffer));
            setResultsState(resultsState.filter(emp => emp.key !== staffer.key));
        } else if (!staffer.chosen && !resultsState.some(emp => emp.key === staffer.key)) {
            setChosenState(chosenState.filter(emp => emp.key !== staffer.key));
            setResultsState(resultsState.concat(staffer));
        }
    }

    function search(e) {
        e.preventDefault();
        setResultsState([]);

        // The API is robust to empty title and department parameters
        const query = 'name='.concat(`${nameState}`)
            .concat('&department=').concat(`${deptState}`)
            .concat('&title=').concat(`${titleState}`);
        if (!query) {
            return [];
        }
        fetch('http://localhost:8000/um_mcc/find?' + query)
            .then(response => response.json())
            .then(data => {
                const chosenKeys = chosenState.map(item => item.key);
                data = data.filter(item => !chosenKeys.includes(item.key))
                data.forEach(item => {
                    item.chosen = false
                })
                setResultsState(data ? data : []);
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className={"container p-5"}>
            <div className={"row"}>
                <div className={"col-2"}/>
                <div className={"col col-4 gx-5 sticky-top"}>
                    <h3 className={"title"}>Find Staff</h3>
                    <form className={"form vstack"} onSubmit={search}>
                        <label className={"label m-2"} htmlFor={"searchName"}>Name:</label>
                        <input id={"searchName"}
                               className={"form-control m-1"}
                               type={"text"}
                               placeholder={"Search by name"}
                               onChange={event => {
                                   const nametxt = event.target.value;
                                   setNameState(nametxt || "");
                                   if (!nametxt) {
                                       setResultsState([]);
                                   }
                               }}/>
                        <label className={"label m-2"} htmlFor={"searchTitle"}>Title:</label>
                        <input id={"searchTitle"}
                               className={"form-control m-1"}
                               type={"text"}
                               placeholder={"Search by title (optional)"}
                               onChange={event => {
                                   const titletxt = event.target.value;
                                   setTitleState(titletxt || "");
                               }}/>
                        <label className={"label m-2"} htmlFor={"searchDept"}>Department:</label>
                        <input id={"searchDept"}
                               className={"form-control m-1"}
                               type={"text"}
                               placeholder={"Search by department (optional)"}
                               onChange={event => {
                                   const depttxt = event.target.value;
                                   setDeptState(depttxt || "");
                               }}/>
                        <button className={"btn btn-primary m-1"}>Search</button>
                    </form>
                    <div>
                        <p className={"col-form-label"}>Search Results:</p>
                        <StafferList stateRef={resultsStateRef} makeChoice={makeChoice} areChosen={false}
                                     id={"searchResults"}/>
                    </div>
                </div>
                <div className={"col col-4 gx-5"}>
                    <div className={"row m-2"}>
                        <h3 className={"title"}>Selected Attendees</h3>
                        <StafferList stateRef={chosenStateRef} makeChoice={makeChoice} areChosen={true}
                                     id="chosenAttendees"/>
                    </div>
                </div>
                <div className={"col-2"}/>
            </div>
            <MeetingCalculator chosenStateRef={chosenStateRef}/>
        </div>
    )
}