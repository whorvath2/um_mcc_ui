// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import fetchMock from "jest-fetch-mock";
import userEvent from "@testing-library/user-event";
import {render} from "@testing-library/react";

fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});

export function setup(jsx) {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    }
}

export const fakeStaffList = JSON.stringify([
    {"key": 1, "name":"DOE II, JOHN Q", "title": "Grand Poo-Bah", "department": "Foobar", "salary": "1000.00"},
    {"key": 2, "name":"Inoverra JR, Margaret A", "title": "Grand Vizier", "department": "Foobar", "salary": "2000.00"}
])