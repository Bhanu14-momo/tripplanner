import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
// Adding icons for Edit and Delete
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const [trip, setTrip] = useState({ destination: '', date: '', activities: '' });
  const [trips, setTrips] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrip((prevTrip) => ({ ...prevTrip, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trip.destination || !trip.date || !trip.activities) {
      alert('Please fill in all the fields.');
      return;
    }

    const newTrip = { ...trip, id: Date.now() }; // Unique ID based on timestamp
    setTrips((prevTrips) => [...prevTrips, newTrip]);
    setTrip({ destination: '', date: '', activities: '' }); // Reset form fields
  };

  const handleClearAll = () => {
    setTrips([]); // Clear all trips
  };

  const handleDelete = (id) => {
    setTrips(trips.filter((trip) => trip.id !== id));
  };

  const handleEdit = (id) => {
    const tripToEdit = trips.find((trip) => trip.id === id);
    setTrip(tripToEdit); // Populate the form with the trip details to edit
    handleDelete(id); // Remove the trip temporarily for editing
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <Container className="mt-5 p-4" style={{ backgroundColor: '#1e1e1e', color: 'white' }}>
      <Row>
        <Col md={6}>
          <h2>Plan Your Trip</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter destination"
                name="destination"
                value={trip.destination}
                onChange={handleInputChange}
                style={{ backgroundColor: '#333', color: 'white', borderColor: '#555' }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Trip Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={trip.date}
                onChange={handleInputChange}
                style={{ backgroundColor: '#333', color: 'white', borderColor: '#555' }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Activities</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter activities"
                name="activities"
                value={trip.activities}
                onChange={handleInputChange}
                style={{ backgroundColor: '#333', color: 'white', borderColor: '#555' }}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: '100%' }}>
              Add Trip
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Your Trips</h2>
          {trips.map((trip) => (
            <Card
              key={trip.id}
              className="mb-3 trip-card"
              style={{ backgroundColor: '#333', color: 'white' }}
            >
              <Card.Body>
                <Card.Title>{trip.destination}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{formatDate(trip.date)}</Card.Subtitle>
                <Card.Text>{trip.activities}</Card.Text>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(trip.id)}
                  style={{ marginRight: '10px' }}
                >
                  <FaEdit /> Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(trip.id)}>
                  <FaTrash /> Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
          <Button variant="danger" onClick={handleClearAll} style={{ width: '100%' }}>
            Clear All Trips
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
