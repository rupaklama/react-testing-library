import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import { getUser } from './get-user';
import { mocked } from 'ts-jest/utils';

// mock event
jest.mock('./get-user');
const mockGetUser = mocked(getUser, true); // true - deep copy

// describe block - test context with multiple test cases inside of it
describe('When everything is Ok', () => {
  // code reuse
  // This func gets executed before each tests below.
  beforeEach(async () => {
    render(<App />);
    // calling mock event
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled());
  });

  test('should render the App component without crashing', () => {
    // This is an implicit assertion meaning no expect statement here
    // render method renders component
    // render method returns a lots of functions - 'queries' that can be used
    // render(<App />);
    // Note: Every time we render a component with render() method
    // it will add 'Container' automatically for us.
    // 'Container' is reference to the DOM node where the component
    // is mounted - <body><div></div></body>
    // screen.debug() to print out actual 'html output' for debugging
    // screen.debug()
  });

  test('should select children that is being passed to the CustomInput component', () => {
    // implicit assertion here again without expect statement
    // render(<App />);

    // getByText - method to extract text element
    // screen.getByText('Input:');

    // we can also make explicit assertion with expect
    // this ensure that the text element 'Input:' is in the html document
    expect(screen.getByText(/Input:/i)).toBeInTheDocument(); //i is regular expression for string
  });

  test('should select the input element by its role', () => {
    // render(<App />);

    // getByRole: This can be used to query every element that is exposed in the accessibility tree.
    // find by aria element role - accessibility/aria label attribs of an element
    screen.getByRole('textbox'); //  textbox is referring to the input element/component

    // same thing as above with explicit assertion - expect statement
    // expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('should select a label element by its text', () => {
    // render(<App />);
    // getByLabelText - selects label element by its text
    screen.getByLabelText('Input:');
  });

  test('should select input element by placeholder text', () => {
    // render(<App />);
    // getByPlaceholderText - selects PlaceholderText in element
    screen.getByPlaceholderText('enter text');
  });

  // NOTE: Using 'queryBy' instead of getBy like above
  // the difference between getBy* and queryBy* is that getBy* throws an error
  // if the element is not found and queryBy* does not.
  // NOTE: only use queryBy* in scenarios where asserting that something isn't there like returning null
  test('should select the input element by its role with `queryByRole`', () => {
    // queryByRole: This can be used to query every element that is exposed in the accessibility tree.
    // find by aria element role - accessibility/aria label attribs of an element
    // expect(screen.queryByRole('textbox')).toBeNull(); //  textbox is referring to the input element/component
    screen.queryByRole('textbox');
  });
});

describe('When the component fetches the user successfully', () => {
  beforeAll(() => {
    // clear the mock request
    mockGetUser.mockClear();
  });

  // our api call gets call once
  test('should call getUser once', async () => {
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
  });

  test('should render the username passed', async () => {
    mockGetUser.mockImplementationOnce(() =>
      Promise.resolve({ id: '1', name: 'Rupak' })
    );
    render(<App />);
    expect(screen.queryByText(/Username/)).toBeNull()
    expect(await screen.findByText(/Username/)).toBeInTheDocument();
  });
});

describe('When the user enters some text in the input element', () => {
  test('should display the text in the screen', async () => {
    // fireEvent trigger DOM event: fireEvent(node, event)
    // fireEvent.* helpers for default event types, example for 'Click event' is fireEvent.click(node
    render(<App />);
    await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1));
    fireEvent.change(screen.getByRole('textbox'), {
      // user input value
      target: { value: 'David' },
    })
    screen.getByText(/You typed: David/i)
  })
})
