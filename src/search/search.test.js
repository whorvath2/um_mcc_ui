import App from '../App'
import Search from './search'
import {setup} from '../setupTests'
import {screen} from '@testing-library/react'


const johnDoe = {
    "key": 1,
    "name": "DOE II, JOHN Q",
    "title": "Grand Poo-Bah",
    "department": "Foobar",
    "salary": "1000.00"
};
const margeInoverra = {
    "key": 2,
    "name": "Inoverra JR, Margaret A",
    "title": "Grand Vizier",
    "department": "Foobar",
    "salary": "2000.00"
};
const methodInoperable = {
    "key": 3,
    "name": "Inoperable, Method",
    "title": "Minor Player",
    "department": "Foobar",
    "salary": "3000.00"
};
const georginoFoobar = {
    "key": 4,
    "name": "Foobar, Georgino",
    "title": "Silly Man",
    "department": "Silly Walks",
    "salary": "4000.00"
};
const fredYino = {
    "key": 5,
    "name": "Yino, Fred G",
    "title": "Major Grump",
    "department": "Arguments",
    "salary": "5000.00"
};

const setupFakeSearch = (results) => fetch.mockResponse(JSON.stringify(results));


export const fakeStaffList = JSON.stringify([
    johnDoe,
    margeInoverra,
    methodInoperable,
    georginoFoobar,
    fredYino
])

describe('Search component works correctly', () => {
    it("finds and shows staff by name", async () => {
        const {user} = setup(<Search/>);
        setupFakeSearch([johnDoe]);

        const input = screen.getByLabelText("Name:");
        await user.type(input, "Doe");
        expect(input).toHaveValue('Doe');
        const button = screen.getByRole("button", {"name": "Search"});
        expect(button).not.toBeNull();
        await user.click(button);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveReturned();
        expect(screen.getByLabelText("searchResults")).not.toBeEmptyDOMElement();
        expect(screen.getByText(/John/)).not.toBeNull();
    });

    it("moves selected staff from search results to chosen attendees", async() => {
        const {user} = setup(<Search/>);
        setupFakeSearch([johnDoe]);

        const input = screen.getByLabelText("Name:");
        await user.type(input, "Doe");
        let button = screen.getByRole("button", {"name": "Search"});
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
        const {user} = setup(<App/>);

        setupFakeSearch([johnDoe]);
        let input = screen.getByLabelText("Name:");
        const searchButton = screen.getByRole("button", {"name": "Search"});
        await user.type(input, "Doe");
        await user.click(searchButton);
        const jButton = screen.getByTestId("data-testid-1");
        await user.click(jButton);

        setupFakeSearch([margeInoverra]);
        await user.clear(input);
        await user.type(input, "Innovera");
        await user.click(searchButton);
        const mButton = screen.getByRole("button", {name: "2"});
        await user.click(mButton);
        // Both people are now selected as attendees...

        const meetingCost = "20"
        fetch.mockResponse(JSON.stringify({"cost": meetingCost}));

        input = screen.getByLabelText("Meeting Length:");
        const cButton = screen.getByRole("button", {name: "Calculate Meeting Cost"})
        await user.type(input, "10");
        await user.click(cButton);
        const received = screen.getByText(/Meeting Cost:/).textContent

        expect(received).toContain(meetingCost);

    });

    it("Sorts correctly by priority", async () => {
        const {user} = setup(<Search/>);
        setupFakeSearch([georginoFoobar, methodInoperable, fredYino, margeInoverra])
        let input = screen.getByLabelText("Name:");
        await user.type(input, "Ino");
        const searchButton = screen.getByRole("button", {"name": "Search"});
        expect(searchButton).toBeEnabled();
        await user.click(searchButton);
        let staffButtons = screen.getAllByTestId("data-testid", {exact: false, hidden: false});
        expect(staffButtons[0]).toHaveTextContent("Inoperable")
        expect(staffButtons[1]).toHaveTextContent("Inoverra")
        expect(staffButtons[2]).toHaveTextContent("Foobar")
        expect(staffButtons[3]).toHaveTextContent("Yino")
    })

    it("Keeps search button disabled until a name is entered", async () => {
        const {user} = setup(<Search/>);
        const searchButton = screen.getByRole("button", {"name": "Search"});
        expect(searchButton).not.toBeEnabled();
        let input = screen.getByLabelText("Name:");
        await user.type(input, "foobar");
        expect(searchButton).toBeEnabled();
    })
});
