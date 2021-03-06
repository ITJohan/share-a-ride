import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../themes/base';
import Pagination from './Pagination';

describe('Pagination', () => {
  test('displays only 1 if there is 1 page', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={1}
          page={0}
          setPage={() => ''}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).toBeNull();
  });

  test('displays 1 2 3 4 5 6 7 for 7 pages', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={7}
          page={0}
          setPage={() => ''}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.queryByText('8')).toBeNull();
  });

  test('displays 1 2 3 4 5 ... 10 for 10 pages when on page 1', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={1}
          setPage={() => ''}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('6')).toBeNull();
  });

  test('displays 1 2 3 4 5 ... 10 for 10 pages when on page 2', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={2}
          setPage={() => ''}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('6')).toBeNull();
  });

  test('displays 1 2 3 4 5 ... 10 for 10 pages when on page 3', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={3}
          setPage={() => ''}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('6')).toBeNull();
  });

  test('displays 1 2 3 4 5 ... 10 for 10 pages when on page 4', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={4}
          setPage={() => ''}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('6')).toBeNull();
  });

  test('displays 1 ... 4 5 6 ... 10 for 10 pages when on page 5', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={5}
          setPage={() => ''}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('...')[0]).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getAllByText('...')[1]).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('7')).toBeNull();
  });

  test('displays 1 ... 6 7 8 9 10 for 10 pages when on page 7', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={7}
          setPage={() => ''}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('5')).toBeNull();
  });

  test('displays 1 ... 6 7 8 9 10 for 10 pages when on page 8', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={8}
          setPage={() => ''}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('5')).toBeNull();
  });

  test('displays 1 ... 6 7 8 9 10 for 10 pages when on page 9', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={9}
          setPage={() => ''}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('5')).toBeNull();
  });

  test('displays 1 ... 6 7 8 9 10 for 10 pages when on page 10', () => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={10}
          setPage={() => ''}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('5')).toBeNull();
  });

  test('dont do anything when clicking < when on first page', () => {
    let page = 1;

    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={page}
          setPage={num => page = num} // eslint-disable-line
        />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('‹'));
    expect(page).toBe(1);
  });

  test('goes to page 1 when clicking < on page 2', () => {
    let page = 2;

    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={page}
          setPage={num => page = num} // eslint-disable-line
        />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('‹'));
    expect(page).toBe(1);
  });

  test('doesnt do anything when clicking > on the last page', () => {
    let page = 10;

    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={page}
          page={page}
          setPage={num => page = num} // eslint-disable-line
        />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('›'));
    expect(page).toBe(10);
  });

  test('goes to page 2 when clicking > on page 1', () => {
    let page = 1;

    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={page}
          setPage={num => page = num} // eslint-disable-line
        />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('›'));
    expect(page).toBe(2);
  });

  test('goes to page 2 when clicking 2 on page 1', () => {
    let page = 1;

    render(
      <ThemeProvider theme={theme}>
        <Pagination
          numberOfPages={10}
          page={page}
          setPage={num => page = num} // eslint-disable-line
        />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('2'));
    expect(page).toBe(2);
  });
});
