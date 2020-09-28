import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import SearchTrips from './SearchTrips';
import theme from '../../themes/base';

describe('SearchTrips', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <SearchTrips closeSearch={() => ''} />
      </ThemeProvider>,
    );
  });

  test('renders the form', () => {
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('renders start location input', () => {
    expect(screen.getByLabelText('From')).toBeInTheDocument();
  });

  test('renders destination input', () => {
    expect(screen.getByLabelText('To')).toBeInTheDocument();
  });

  test('renders date selector', () => {
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
  });

  test('renders time selector', () => {
    expect(screen.getByLabelText('Time')).toBeInTheDocument();
  });

  test('renders seats selector', () => {
    expect(screen.getByLabelText('Seats')).toBeInTheDocument();
  });

  test('renders price selector', () => {
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
  });

  test('renders search button', () => {
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('should accept a start location', () => {
    const input = screen.getByLabelText('From');
    fireEvent.change(input, {target: {value: 'Göteborg'}});
    expect(input.value).toBe('Göteborg');
  })

  test('should accept a destination', () => {
    const input = screen.getByLabelText('To');
    fireEvent.change(input, {target: {value: 'Oslo'}});
    expect(input.value).toBe('Oslo');
  })

  test('should accept a date', () => {
    const input = screen.getByLabelText('Date');
    fireEvent.change(input, {target: {value: '2020-09-24'}});
    expect(input.value).toBe('2020-09-24');
  })

  test('should accept a time', () => {
    const input = screen.getByLabelText('Time');
    fireEvent.change(input, {target: {value: '18:00'}});
    expect(input.value).toBe('18:00');
  })

  test('should accept number of seats', () => {
    const input = screen.getByLabelText('Seats');
    fireEvent.change(input, {target: {value: '4'}});
    expect(input.value).toBe('4');
  })

  test('should accept price', () => {
    const input = screen.getByLabelText('Price');
    fireEvent.change(input, {target: {value: '100'}});
    expect(input.value).toBe('100');
  })

  test('should not accept a negative price', () => {
    const input = screen.getByLabelText('Price');
    const searchBtn = screen.getByRole('button', {name: 'Search'});

    fireEvent.change(input, {target: {value: '-100'}});
    fireEvent.click(searchBtn);
    expect(searchBtn).toBeInTheDocument();
  })

  test('should not accept a negative seat number', () => {
    const input = screen.getByLabelText('Seats');
    const searchBtn = screen.getByRole('button', {name: 'Search'});

    fireEvent.change(input, {target: {value: '-1'}});
    fireEvent.click(searchBtn);
    expect(searchBtn).toBeInTheDocument();
  })
});
