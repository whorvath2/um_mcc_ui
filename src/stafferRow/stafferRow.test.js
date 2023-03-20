import React from 'react';
import {StafferRow} from './stafferRow'
import {cleanup, render, screen} from '@testing-library/react'
import {fakeStaffList} from "../search/search.test";

describe('StafferRow component works correctly', () => {
    it('Renders a staff record and capitalizes names correctly', () => {

        const staffers = JSON.parse(fakeStaffList);

        render(<StafferRow staffer={staffers[0]} isOdd={true} makeChoice={() => {
        }}/>);
        let element = screen.getByTestId(`data-testid-${staffers[0].key}`);
        expect(element.textContent).toBe("Doe II John Q Grand Poo-bah (Foobar)");
        cleanup();

        render(<StafferRow staffer={staffers[1]} isOdd={false} makeChoice={() => {
        }}/>);
        element = screen.getByTestId(`data-testid-${staffers[1].key}`);
        expect(element.textContent).toBe("Inoverra Jr Margaret A Grand Vizier (Foobar)")
        cleanup();
    });
});