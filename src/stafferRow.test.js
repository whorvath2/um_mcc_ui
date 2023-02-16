import StafferRow from './stafferRow'
import {render, screen, cleanup} from '@testing-library/react'
import {fakeStaffList} from "./setupTests";

it('Capitalizes names correctly', () => {
    const staffers = JSON.parse(fakeStaffList);
    render(<StafferRow staffer={staffers[0]} isOdd={true} makeChoice={() => {}} />);
    let element = screen.getByRole("button", {ariaLabel: staffers[0].key});
    expect(element.textContent).toBe("Doe II John Q Grand Poo-bah (Foobar)");
    cleanup();
    render(<StafferRow staffer={staffers[1]} isOdd={false} makeChoice={() => {}} />);
    element = screen.getByRole("button", {ariaLabel: staffers[1].key});
    expect(element.textContent).toBe("Inoverra Jr Margaret A Grand Vizier (Foobar)")
    cleanup();
});
