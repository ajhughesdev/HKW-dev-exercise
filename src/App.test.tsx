import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

// Mock data for testing
const mockData = [
  {
    "customerID": 96757,
    "fullName": "Cohen, Jamie",
    "date": "2011-05-02T02:20:07",
    "orderNumber": "wqI5QgGo",
    "email": "becksarah@king-johnson.biz",
    "orderStatus": "shipped",
    "clubMember": true,
    "location": "East Jenniferchester, NH"
  }
];

// Mock the fetch request
jest.spyOn(global, 'fetch').mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

describe('App', () => {
  test('search bar functionality', () => {
    const { getByPlaceholderText } = render(<App />);
    const searchBar = getByPlaceholderText('Search');

    fireEvent.change(searchBar, { target: { value: 'test' } });

    expect(searchBar.value).toBe('test');
  });

  test('column toggler functionality', () => {
    const { getByText } = render(<App />);
    const columnToggler = getByText('Column Toggler');

    fireEvent.click(columnToggler);

    // Assuming that clicking the column toggler changes its text
    expect(columnToggler.textContent).toBe('Column Toggler Clicked');
  });

  test('row selection functionality', () => {
    const { getByTestId } = render(<App />);
    const rowCheckbox = getByTestId('row-checkbox');

    fireEvent.click(rowCheckbox);

    expect(rowCheckbox.checked).toBe(true);
  });

  test('column sorting functionality', () => {
    const { getByText } = render(<App />);
    const columnHeader = getByText('Column Header');

    fireEvent.click(columnHeader);

    // Assuming that clicking the column header changes its color
    expect(columnHeader.style.color).toBe('blue');
  });

  test('pagination functionality', () => {
    const { getByText } = render(<App />);
    const nextPageButton = getByText('Next Page');

    fireEvent.click(nextPageButton);

    // Assuming that clicking the next page button changes its text
    expect(nextPageButton.textContent).toBe('Page 2');
  });
});