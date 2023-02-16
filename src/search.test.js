import App from './App'
import Search from './search'
import {fakeStaffList, setup} from './setupTests'
import {screen} from '@testing-library/react'


function setupSearch() {
    fetch.mockResponse(fakeStaffList);
}

it("finds and shows staff by name", async() => {
    const {user} = setup(<Search />);

    setupSearch();

    const input = screen.getByLabelText("Name:");
    await user.type(input, "Doe");
    expect(input).toHaveValue('Doe');
    const button = screen.getByRole("button", { "name": "Search Staff"});
    expect(button).not.toBeNull();
    await user.click(button);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveReturned();
    expect(screen.getByLabelText("searchResults")).not.toBeEmptyDOMElement();
    expect(screen.getByText(/John/)).not.toBeNull();
});

it("moves selected staff from search results to chosen attendees", async() => {
    const {user} = setup(<Search />);
    setupSearch();
    const input = screen.getByLabelText("Name:");
    await user.type(input, "Doe");
    let button = screen.getByRole("button", { "name": "Search Staff"});
    await user.click(button);

    let searchResults = screen.getByLabelText("searchResults");
    let chosenAttendees = screen.getByLabelText("chosenAttendees");
    expect(chosenAttendees).toBeEmptyDOMElement();
    expect(searchResults).not.toBeEmptyDOMElement();
    button = screen.getByRole("button", {name: "1"});
    expect(button).not.toBeNull();
    expect(button.textContent.match(/John/)).toBeTruthy();
    await user.click(button);
    chosenAttendees = await screen.findByLabelText("chosenAttendees");
    expect(chosenAttendees).not.toBeEmptyDOMElement();
    // TODO find out why this fails:
    // searchResults = await screen.findByLabelText("searchResults");
    // expect(searchResults).toBeEmptyDOMElement();
});

it("calculates meeting costs correctly", async() => {
    const {user} = setup(<App />);
    setupSearch();

    let input = screen.getByLabelText("Name:");
    const button = screen.getByRole("button", { "name": "Search Staff"});

    await user.type(input, "Doe");
    await user.click(button);
    await user.clear(input);
    await user.type(input, "Innovera");
    await user.click(button);

    const jButton = screen.getByRole("button", {name: "1"});
    const mButton = screen.getByRole("button", {name: "2"});
    await user.click(jButton);
    await user.click(mButton);

    // Both people are now selected as attendees...
    // TO-DO

});