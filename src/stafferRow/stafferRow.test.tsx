import React from 'react';
import {StafferRow} from './stafferRow'
import {cleanup, render, screen} from '@testing-library/react'
import {fakeStaffList} from "../setupTests";

describe('StafferRow', () => {
    it('Renders a staff record and capitalizes names correctly', () => {

        const staffers = JSON.parse(fakeStaffList);

        render(<StafferRow staffer={staffers[0]} isOdd={true} makeChoice={() => {
        }}/>);
        let element = screen.getByRole("button", {name: staffers[0].key.toString()});
        expect(element.textContent).toBe("Doe II John Q Grand Poo-bah (Foobar)");
        cleanup();

        render(<StafferRow staffer={staffers[1]} isOdd={false} makeChoice={() => {
        }}/>);
        element = screen.getByRole("button", {name: staffers[1].key.toString()});
        expect(element.textContent).toBe("Inoverra Jr Margaret A Grand Vizier (Foobar)")
        cleanup();
    });
});