import React from 'react';
import { Formik, Form } from 'formik';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import TripCard from './Card';
import TripModel from '../../../model/Trip';
import BookingModel from '../../../model/Booking';
import ThemeShape from '../../../model/ThemeShape';
import config from '../../../config';
import { InactiveButton } from '../../UI';

const StyledForm = styled(Form)`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    & > *:not(:last-child) {
        margin-right: ${(props) => props.theme.spacing.subsection};
    }

    & > ${InactiveButton} {
        // appearance: none;
        height: 80%;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
`;

const CancelCard = ({ trip, showNotification, theme }) => {
  const cancelBooking = async (id, seats) => {
    console.log(`Cancelling booking with id: ${id} for ${seats} seats`);

    const res = await fetch(`${config.api.url}bookings/${id}/`, { method: 'DELETE', mode: 'cors' });
    const data = await res.json();

    try {
      if (!res.ok) {
        throw new Error(data.data || data.message || 'No error message provided');
      }
    } catch (error) {
      return showNotification(error.message, theme.colors.error, 5);
    }

    return showNotification('Booking deleted', theme.colors.success, 5);
  };

  return (
    <TripCard
      trip={trip}
      controlFactory={({ tripID }) => (
        <Formik
          initialValues={{ seats: 1 }}
          onSubmit={(values) => cancelBooking(tripID, values.seats)}
        >
          {() => (
            <StyledForm>
              <InactiveButton type="submit">Cancel booking</InactiveButton>
            </StyledForm>
          )}
        </Formik>
      )}
    />
  );
};

CancelCard.propTypes = {
  trip: PropTypes.shape({
    ...TripModel,
    // Expect a booking object, that this component can request to cancel
    booking: PropTypes.shape(BookingModel),
  }).isRequired,
  showNotification: PropTypes.func.isRequired,
  theme: ThemeShape.isRequired,
};

export default withTheme(CancelCard);
