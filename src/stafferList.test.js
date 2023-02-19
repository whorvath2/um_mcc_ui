import React from 'react';
import { screen, render } from '@testing-library/react';
import StafferList from './StafferList';

describe('StafferList', () => {
    it('should render a list of staffers', () => {
        const stateRef = { current: [
                { key: 1, name: 'John Doe', chosen: false },
                { key: 2, name: 'Jane Doe', chosen: true },
                { key: 3, name: 'Jim Smith', chosen: false },
            ]};
        const makeChoice = jest.fn();
        const areChosen = false;
        const id = 'staffer-list';

        render(<StafferList stateRef={stateRef} makeChoice={makeChoice} areChosen={areChosen} id={id} />);

        const listContainer = screen.getByLabelText(id);
        expect(listContainer).toBeInTheDocument();

        const stafferRows = screen.getAllByRole('button');
        expect(stafferRows).toHaveLength(2);
    });
});
