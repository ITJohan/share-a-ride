import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal, { ModalProvider } from 'styled-react-modal';
import config from '../config';
import SearchTrip from '../components/trips/SearchTrips';
import FloatingButtons from '../components/trips/FloatingButtons';
import DisplayScreen from './Trip/Display';
import AddTrip from '../components/trips/AddTrip';
import Pagination from '../components/trips/Pagination';

const Trips = ({ showNotification }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [page, setPage] = useState(0);
  const tripsPerPage = 10;

  const getTrips = async (query) => {
    try {
      const res = await fetch(`${config.api.url}trips/${query}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.data || data.message || 'No error message provided');
      }

      if (data === 'no results found') {
        showNotification('No results found', 'red', 3);
        setFilteredTrips([]);
        return;
      }

      setFilteredTrips(
        data
          .map((trip) => ({
            ...trip,
            // mocking the driver
            driver: {
              firstName: 'John',
              lastName: 'Doe',
            },
            startTime: new Date(trip.startTime),
            seatsAvailable: Number.parseInt(trip.seatsAvailable, 10),
            price: Number.parseInt(trip.price, 10),
          })),
      );
    } catch (error) {
      showNotification('Could not retrieve trips', 'red', 3);
      console.error(error.message);
      setFilteredTrips([]);
    }
  };

  useEffect(() => {
    getTrips('');
  }, []); // eslint-disable-line

  return (
    <div>
      <DisplayScreen
        trips={
          filteredTrips.slice(
            page * tripsPerPage, page * tripsPerPage + tripsPerPage
          )
        }
      />
      <ModalProvider>
        <Modal
          isOpen={isSearchOpen}
          onBackgroundClick={() => setIsSearchOpen(false)}
          onEscapeKeydown={() => setIsSearchOpen(false)}
        >
          <SearchTrip
            closeSearch={() => setIsSearchOpen(false)}
            getTrips={getTrips}
          />
        </Modal>
        <Modal
          isOpen={isAddOpen}
          onBackgroundClick={() => setIsAddOpen(false)}
          onEscapeKeydown={() => setIsAddOpen(false)}
        >
          <AddTrip
            closeAdd={() => setIsAddOpen(false)}
            showNotification={showNotification}
          />
        </Modal>
      </ModalProvider>
      <Pagination
        numberOfPages={
          Math.floor(
            filteredTrips.length / tripsPerPage
          )
        }
        page={page}
        setPage={setPage}
      />
      <FloatingButtons
        openSearch={() => setIsSearchOpen(true)}
        openAdd={() => setIsAddOpen(true)}
      />
    </div>
  );
};

Trips.propTypes = {
  showNotification: PropTypes.func.isRequired,
};

export default Trips;
