import App from '../App'
import Search from './search'
import {fakeStaffList, setup} from '../setupTests'
import {screen} from '@testing-library/react'


function setupSearch() {
    fetch.mockResponse(fakeStaffList);
}

const meetingCost = "20"
function setupCostCalculator(){
    fetch.resetMocks();
    fetch.mockResponse(JSON.stringify({"cost": meetingCost}));
}

describe('Search', () => {
    it("finds and shows staff by name", async() => {
        const {user} = setup(<Search />);

        setupSearch();

        const input = screen.getByLabelText("Name:");
        await user.type(input, "Doe");
        expect(input).toHaveValue('Doe');
        const button = screen.getByRole("button", { "name": "Search"});
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
        let button = screen.getByRole("button", { "name": "Search"});
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

    it("Displays meeting costs when asked", async() => {
        const {user} = setup(<App />);
        setupSearch();

        let input = screen.getByLabelText("Name:");
        const sButton = screen.getByRole("button", { "name": "Search"});

        await user.type(input, "Doe");
        await user.click(sButton);
        await user.clear(input);
        await user.type(input, "Innovera");
        await user.click(sButton);

        const jButton = screen.getByRole("button", {name: "1"});
        const mButton = screen.getByRole("button", {name: "2"});
        await user.click(jButton);
        await user.click(mButton);

        setupCostCalculator();
        // Both people are now selected as attendees...
        input = screen.getByLabelText("Meeting Length:");
        const cButton = screen.getByRole("button", {name: "Calculate Meeting Cost"})
        await user.type(input, "10");
        await user.click(cButton);
        const received = screen.getByText(/Meeting Cost:/).textContent

        expect(received).toContain(meetingCost);

    });
});
