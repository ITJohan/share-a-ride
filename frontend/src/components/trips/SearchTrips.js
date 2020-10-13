import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import config from '../../config';
import {
  FieldFactory,
  PrimaryButton,
  InactiveButton,
  Label,
} from '../UI';
import kommuner from './kommuner.json';
import DropDown from './DropDown';

const StyledInput = FieldFactory(styled.input``);

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.fill};
  padding: ${(props) => props.theme.padding.section};
  margin: 30% auto;
  width: 90%;
  max-width: 26rem;
  border-radius: ${(props) => props.theme.size.corner};
  -webkit-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  -moz-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
`;

const StyledTextRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing.subsection};

  &:nth-child(1) {
    margin: 0;
  }
`;

const StyledSelectRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing.subsection};
`;

const StyledSelectColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & input::-webkit-calendar-picker-indicator {
    display: none;
  }

  &:nth-child(2) {
    margin-left: ${(props) => props.theme.spacing.subsection};
  }

  & > div {
    margin-top: 0;
  }
`;

const Button = css`
  padding: ${(props) => props.theme.size.button};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.subsection};
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  ${Button}
  margin-left: ${(props) => props.theme.spacing.subsection};
`;

const StyledInactiveButton = styled(InactiveButton)`
  ${Button}
  margin-right: ${(props) => props.theme.spacing.subsection};
`;

const SearchTrips = ({ closeSearch, setFilteredTrips, showNotification }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [datetime, setDatetime] = useState('');
  const [seats, setSeats] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const options = [];

  const loadingData = async () => {
    console.log(kommuner);
    kommuner.map((detail, index) => {
      options[index] = detail.Kommun;
      return options[index];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createQuery = () => {
      let query = '';

      if (from !== '') query += `&startLocation=${from}`;
      if (to !== '') query += `&destination=${to}`;
      if (datetime !== '') query += `&startTime=${datetime}`;
      if (seats !== '') query += `&seatsAvailable=${seats}`;
      if (minPrice !== '') query += `&priceMin=${minPrice}`;
      if (maxPrice !== '') query += `&priceMax=${maxPrice}`;

      return query === '' ? query : `?${query}`;
    };

    try {
      const url = `${config.api.url}trips/${createQuery()}`;
      const res = await fetch(url);
      const data = await res.json();

      if (typeof data !== 'string') {
        setFilteredTrips(
          data
            .map((trip) => ({
              ...trip,
              driver: {
                firstName: 'David',
                lastName: 'Hernandez',
                // avatarUrl: 'https://vip.nypost.com/wp-content/uploads/sites/2/2015/01/clark1.jpg',
              },
              startTime: new Date(trip.startTime),
              seatsAvailable: Number.parseInt(trip.seatsAvailable, 10),
              price: Number.parseInt(trip.price, 10),
            })),
        );
      } else {
        showNotification('No trips found', 'red', 3);
      }
    } catch (error) {
      console.warn('Could not retrieve trips', error.message);
    }

    closeSearch();
  };

  useEffect(() => { loadingData(); }, []);
  return (
    <StyledForm aria-label="Search form" onSubmit={handleSubmit}>
      <StyledTextRow>
        <Label htmlFor="from">From</Label>
        <DropDown items={options} placeholder="Enter startLocation..." id="from" />
      </StyledTextRow>
      <StyledTextRow>
        <Label htmlFor="to">To</Label>
        <StyledInput
          type="text"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Enter destination..."
        />
      </StyledTextRow>

      <StyledSelectRow>
        <StyledSelectColumn>
          <Label htmlFor="datetime">Date/time</Label>
          <StyledInput
            type="datetime-local"
            id="datetime"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </StyledSelectColumn>
      </StyledSelectRow>

      <StyledSelectRow>
        <StyledSelectColumn>
          <Label htmlFor="seats">Seats</Label>
          <StyledInput
            type="number"
            id="seats"
            min="1"
            max="100"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            placeholder="Enter seats..."
          />
        </StyledSelectColumn>

        <StyledSelectColumn>
          <Label htmlFor="price">Price</Label>
          <StyledSelectRow id="price">
            <StyledInput
              type="number"
              min="0"
              max="1000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
            />
            <StyledInput
              type="number"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
            />
          </StyledSelectRow>
        </StyledSelectColumn>

      </StyledSelectRow>
      <StyledSelectRow>
        <StyledInactiveButton onClick={closeSearch}>Close</StyledInactiveButton>
        <StyledPrimaryButton type="submit">Search</StyledPrimaryButton>
      </StyledSelectRow>
    </StyledForm>
  );
};

SearchTrips.propTypes = {
  closeSearch: PropTypes.func.isRequired,
  setFilteredTrips: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default SearchTrips;
