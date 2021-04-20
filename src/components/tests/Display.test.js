import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from './../Display';
import mockFetchShow from '../../api/fetchShow';
import { act } from 'react-dom/test-utils';

const testShow = {
        name: 'Justin',
        image: 'x',
        summary: 'this is the summary',
        seasons: [
            {id:0, name: "Season 1", episodes: []}, 
            {id:1, name: "Season 2", episodes: []}, 
            {id:2, name: "Season 3", episodes: []}, 
            {id:3, name: "Season 4", episodes: []}
        ]
}

jest.mock('../../api/fetchShow');

test('Display renders without any passed in props', () => {
    render(<Display />);
})

test('When the fetch button is pressed, the show component displays', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />)
    userEvent.click(screen.getByRole('button', { name: /press to get show data/i }))
    expect(await screen.findByTestId('show-container')).toBeInTheDocument();
})

test('when fetch button pressed, select options match amount of those rendered', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />);
    userEvent.click(screen.getByRole('button', { name: /press to get show data/i }));
    expect(await screen.findAllByTestId('season-option')).toHaveLength(4);
})

test('when fetch button pressed, displayFunc is called', async () => {
    const mockDisplayFunc = jest.fn();
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display displayFunc={mockDisplayFunc} />);
    userEvent.click(screen.getByRole('button', { name: /press to get show data/i }));
    expect(await mockDisplayFunc).toHaveBeenCalled();
})












///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.