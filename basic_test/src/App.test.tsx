import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders span & button elements', () => {
  // render method returns a lots of functions - 'queries' that can be used
  render(<App />);
  // screen - to output html document
  // getByText - method to extract text element
  const spanElement = screen.getByText(/My name is/i);

  // check to see test can render a button
  const buttonElement = screen.getByText(/Set Name to Rupak/i);

  // this ensure that the spanElement & buttonElement is in the html document
  expect(spanElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();

  // clicking our button - mock event
  // fireEvent trigger DOM event: fireEvent(node, event)
  // fireEvent.* helpers for default event types, example for 'Click event' is fireEvent.click(node
  fireEvent.click(buttonElement);

  // ensure that span element is updated with the new value
  const spanElement2 = screen.getByText(/My name is: Rupak/i)
  expect(spanElement2).toBeInTheDocument();
});
