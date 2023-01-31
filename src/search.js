import React, {useState} from 'react';

export default function Search() {
    const [state, setState] = useState({
        searchTerm: "",
        searchResults: [],
        chosenStaff: [],
    })

    function handleStateChange(e) {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    function findStaff(query) {
        if (!query) {
            return [];
        }
        return fetch('http://localhost:8662/um_mcc/find?' + query)
        .then((response) => {
            return response.json();
        // }).then((content) => {
        //     return JSON.parse(content);
        }).catch((error) => {
            return console.log(error);
        });
    }

    function search(e) {
        e.preventDefault()
        const query ='name='.concat(`${state.searchTerm}`)
        const staff = findStaff(query)
        if (staff) {
            handleStateChange(e)
        }
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
                                <input id="searchTerm" className="form-control"
                                       type="text"
                                       placeholder="Search by name"
                                       onChange={handleStateChange}/>
                                <label className="col-form-label">Results: </label>
                            </div>
                            <button className="btn btn-primary">Search Staff</button>
                        </form>
                        <ul id="results">
                            {state.searchResults.map((staffer) => (
                                <li>{staffer.name} {staffer.title} {staffer.department}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}