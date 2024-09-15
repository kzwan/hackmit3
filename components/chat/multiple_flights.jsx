import React from 'react';
import { Plane, Clock, DollarSign, Leaf } from 'lucide-react';

const flightData = [
  {'departure_airport': 'John F. Kennedy International Airport', 'arrival_airport': 'Los Angeles International Airport', 'departure_time': '2024-09-15 06:30', 'arrival_time': '2024-09-15 09:42', 'duration': 372, 'airplane': 'Airbus A320', 'airline': 'JetBlue', 'flight_number': 'B6 123', 'price': 869, 'carbon_emissions': 388000, 'type': 'Round trip'},
  {'departure_airport': 'John F. Kennedy International Airport', 'arrival_airport': 'Los Angeles International Airport', 'departure_time': '2024-09-15 06:00', 'arrival_time': '2024-09-15 08:58', 'duration': 358, 'airplane': 'Airbus A321 (Sharklets)', 'airline': 'American', 'flight_number': 'AA 1', 'price': 922, 'carbon_emissions': 534000, 'type': 'Round trip'},
  {'departure_airport': 'John F. Kennedy International Airport', 'arrival_airport': 'Los Angeles International Airport', 'departure_time': '2024-09-15 08:05', 'arrival_time': '2024-09-15 11:00', 'duration': 355, 'airplane': 'Boeing 767', 'airline': 'Delta', 'flight_number': 'DL 713', 'price': 987, 'carbon_emissions': 300000, 'type': 'Round trip'}
];

const FlightCard = ({ flight }) => {
  const departureDate = new Date(flight.departure_time);
  const arrivalDate = new Date(flight.arrival_time);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Plane className="text-blue-500 mr-2" size={24} />
          <span className="text-lg font-semibold">{flight.airline} - {flight.flight_number}</span>
        </div>
        <span className="text-sm text-gray-500">{flight.type}</span>
      </div>
      
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">Departure</p>
          <p className="font-semibold">{formatTime(departureDate)}</p>
          <p className="text-sm">{flight.departure_airport}</p>
        </div>
        <div className="text-center">
          <Clock className="inline-block text-gray-400 mb-1" size={18} />
          <p className="text-sm text-gray-500">{formatDuration(flight.duration)}</p>
          <p className="text-xs text-gray-400">{flight.airplane}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Arrival</p>
          <p className="font-semibold">{formatTime(arrivalDate)}</p>
          <p className="text-sm">{flight.arrival_airport}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center">
          <DollarSign className="text-green-500 mr-1" size={18} />
          <span className="font-semibold">${flight.price}</span>
        </div>
        <div className="flex items-center">
          <Leaf className="text-green-500 mr-1" size={18} />
          <span>{(flight.carbon_emissions / 1000).toFixed(2)} kg CO2</span>
        </div>
      </div>
    </div>
  );
};

const MultiFlightDisplay = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Flights</h2>
      {flightData.map((flight, index) => (
        <FlightCard key={index} flight={flight} />
      ))}
    </div>
  );
};

export default MultiFlightDisplay;