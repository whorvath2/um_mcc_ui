import React from "react";

export default function MeetingCalculator({chosenStateRef}) {
    const [minutesState, setMinutesState] = React.useState(0)
    const [costState, setCostState] = React.useState("$0");

    function calculateCost(e){
        e.preventDefault();
        if (!minutesState){
            return 0
        }
        fetch('http://localhost:8000/um_mcc/cost/' + minutesState, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(chosenStateRef.current)
        })
            .then(response => response.json())
            .then(data => {
                setCostState("$" + data.cost);
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="row sticky-bottom m-3">
            <div className={"col-2"}/>
            <div className={"col col-4 text-bg-secondary p-3"}>
                <form className="form vstack gap-3" onSubmit={calculateCost}>
                    <label className="label left" htmlFor={"meetingLength"}>Meeting Length:</label>
                    <input id="meetingLength"
                           className="form-control w-50"
                           type="number"
                           placeholder="Enter length in minutes"
                           onChange={event => setMinutesState(event.target.valueAsNumber)}/>
                    <button className={"btn btn-primary w-50"}>Calculate Meeting Cost</button>
                </form>
            </div>
            <div className={"col col-4 text-bg-secondary p-3"}>
                <div className={"row"}>
                    <h2 className={"sticky-bottom text-center"}>Meeting Cost: {costState}</h2>
                </div>
            </div>
        </div>
    )
}