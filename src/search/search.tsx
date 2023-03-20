import React, {FormEvent} from 'react';
import StafferList from "../stafferList/stafferList";
import MeetingCalculator from "../meetingCalculator/meetingCalculator";
import {Staffer} from "../types/staffer";

export default function Search() {
    const [nameState, setNameState] = React.useState<string>("");
    const [titleState, setTitleState] = React.useState<string>("");
    const [deptState, setDeptState] = React.useState<string>("");
    const [resultsState, _setResultsState] = React.useState<Staffer[]>(() => []);
    const [chosenState, _setChosenState] = React.useState<Staffer[]>(() => []);

    const resultsStateRef: React.MutableRefObject<Staffer[]> = React.useRef(resultsState)
    const chosenStateRef: React.MutableRefObject<Staffer[]> = React.useRef(chosenState)

    const setResultsState = (data: Staffer[]) => {
        data.sort(sortByPriority);
        resultsStateRef.current = data;
        _setResultsState(data);
    }

    const setChosenState = (data: Staffer[]) => {
        data.sort(sortByPriority);
        chosenStateRef.current = data;
        _setChosenState(data);
    }

    const sortByName = (stafferOne: Staffer, stafferTwo: Staffer): number =>
        (stafferOne.name.toUpperCase() > stafferTwo.name.toUpperCase()) ? 1 : -1;

    /**
     * (This function is not case-sensitive.) Returns -1 if stafferOne's name starts with the search term and
     * stafferTwo's does not; 1 if stafferTwo's name starts with the search term and stafferOne's does not;
     * otherwise delegates to {@link sortByName(Staffer, Staffer)}. I.e., this function provides a means of
     * sorting a list of staffers such that those whose family names match the search term are prioritized
     * first, and the rest are sorted in alphabetical order.
     *
     * @param stafferOne The first staffer whose name will be compared to the second's.
     * @param stafferTwo The second staffer whose name will be compared to the first's.
     */
    const sortByPriority = (stafferOne: Staffer, stafferTwo: Staffer): number => {
        const ucNameState = nameState.toUpperCase();
        const ucNameOne = stafferOne.name.toUpperCase();
        const ucNameTwo = stafferTwo.name.toUpperCase();
        const nameOneStartsWithSearchTerm = ucNameOne.startsWith(ucNameState);
        const nameTwoStartsWithSearchTerm = ucNameTwo.startsWith(ucNameState);
        if ((nameOneStartsWithSearchTerm && nameTwoStartsWithSearchTerm)
            || (!nameOneStartsWithSearchTerm && !nameTwoStartsWithSearchTerm)) {
            return sortByName(stafferOne, stafferTwo);
        }
        return (nameOneStartsWithSearchTerm) ? -1 : 1;
    }

    function makeChoice(staffer: Staffer): void {
        staffer.chosen = !staffer.chosen
        if (staffer.chosen && !chosenState.some((emp: Staffer) => emp.key === staffer.key)) {
            setChosenState(chosenState.concat(staffer));
            setResultsState(resultsState.filter(emp => emp.key !== staffer.key));
        } else if (!staffer.chosen && !resultsState.some(emp => emp.key === staffer.key)) {
            setChosenState(chosenState.filter(emp => emp.key !== staffer.key));
            setResultsState(resultsState.concat(staffer));
        }
    }

    function search(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setResultsState([]);

        if (!nameState) {
            alert("Name is required");
            return;
        }
        // The API is robust to empty title and department parameters
        const query = 'name='.concat(`${nameState}`)
            .concat('&department=').concat(`${deptState}`)
            .concat('&title=').concat(`${titleState}`);
        fetch('http://localhost:8000/um_mcc/find?' + query)
            .then(response => response.json())
            .then(data => {
                const chosenKeys = chosenState.map(item => item.key);
                data = data.filter((item: { key: number; }) => !chosenKeys.includes(item.key))
                data.forEach((item: { chosen: boolean; }) => {
                    item.chosen = false
                })
                setResultsState(data ? data : []);
            })
            .catch((error) => {
                console.log(error);
                alert("The API service is not responding.");
            });
    }

    return (
        <div className={"container p-5"}>
            <div className={"row"}>
                <div className={"col-2"}/>
                <div className={"col col-4 gx-5 sticky-top"}>
                    <h3 className={"title"}>Find Staff</h3>
                    <form id="searchForm" className={"form vstack"} onSubmit={search}>
                        <label className={"label m-2"} htmlFor={"searchName"}>Name:</label>
                        <input required
                               id={"searchName"}
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
                        <button className={"btn btn-primary m-1"} disabled={nameState.length === 0}>Search</button>
                        <input className={"btn btn-secondary m-1"} type="reset" onClick={event => {
                            setNameState("");
                            setTitleState("");
                            setDeptState("");
                            setResultsState([]);
                        }}>
                        </input>
                    </form>
                    <div>
                        <p className={"col-form-label"}>Search Results:</p>
                        <StafferList staffers={resultsStateRef} makeChoice={makeChoice} areChosen={false}
                                     name={"searchResults"}/>
                    </div>
                </div>
                <div className={"col col-4 gx-5"}>
                    <div className={"row m-2"}>
                        <h3 className={"title"}>Selected Attendees</h3>
                        <StafferList staffers={chosenStateRef} makeChoice={makeChoice} areChosen={true}
                                     name={"chosenAttendees"}/>
                    </div>
                </div>
                <div className={"col-2"}/>
            </div>
            <MeetingCalculator chosenStateRef={chosenStateRef}/>
        </div>
    )
}