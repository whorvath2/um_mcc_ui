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
