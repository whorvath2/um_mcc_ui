import React from "react";
import Footer from "./footer";

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

    function buttonDisabled(){
        return chosenStateRef.current.length === 0 || !minutesState;
    }

    return (
        <div className={"sticky-bottom"}>
            <div className={"row bg-white p-1"}>
                <div className={"col"}/>
            </div>
            <div className={"row border-top border-5 border-white"}>
                <div className={"col"}/>
                <div className={"col-5 text-bg-secondary p-3"}>
                    <form className="form hstack gap-3" onSubmit={calculateCost}>
                        <label className="label left" htmlFor={"meetingLength"}>Meeting Length:</label>
                        <input id="meetingLength"
                               className="form-control w-50"
                               type="number"
                               placeholder="Enter length in minutes"
                               onChange={event => setMinutesState(event.target.valueAsNumber)}/>
                        <button className={"btn btn-primary w-50"} disabled={buttonDisabled()}>Calculate Meeting Cost</button>
                    </form>
                </div>
                <div className={"col-5 text-bg-secondary p-3"}>
                    <h2 className={"text-center"}>Meeting Cost: {costState}</h2>
                </div>
                <div className={"col"}/>
            </div>
            <Footer/>
        </div>
    )
}