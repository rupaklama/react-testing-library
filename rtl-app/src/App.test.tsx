import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// describe block - test context with multiple test cases inside of it
describe('When everything is Ok', () => {

  // code reuse
  // This func gets executed before each tests below. 
  beforeEach(() => {
    render(<App />)
  })

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
});
