import React from 'react';
import { Plane } from 'lucide-react';

interface FlightInfo {
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  duration: string;
  flightNumber: string;
  airline: string;
  price: string;
}

const parseFlightData = (data: string): FlightInfo[] => {
  console.log(data)
  // Replace single quotes with double quotes to make it valid JSON
  const jsonString = data.replace(/'/g, '"');

  // Parse the JSON string
  const flights = JSON.parse(jsonString);
  return flights.map((flight: any) => ({
    departureTime: new Date(flight.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    arrivalTime: new Date(flight.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    origin: flight.departure_airport,
    destination: flight.arrival_airport,
    duration: `${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m`,
    flightNumber: flight.flight_number,
    airline: flight.airline,
    price: `$${flight.price}`
  }));
};

const FlightData: React.FC<{ flightInfo: FlightInfo }> = ({ flightInfo }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-lg font-bold flex items-center">
          <Plane className="mr-2" />
          Flight Information
        </h2>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-left">
            <p className="text-2xl font-bold">{flightInfo.departureTime}</p>
            <p className="text-sm text-gray-600">{flightInfo.origin}</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <p className="text-sm text-gray-600">{flightInfo.duration}</p>
            <div className="w-24 h-px bg-gray-300 my-2"></div>
            <p className="text-xs text-gray-500">{flightInfo.flightNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{flightInfo.arrivalTime}</p>
            <p className="text-sm text-gray-600">{flightInfo.destination}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Airline:</span> {flightInfo.airline}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Price:</span> {flightInfo.price}
          </p>
        </div>
      </div>
    </div>
  );
};

const FlightDataList: React.FC<{ data: string }> = ({ data }) => {
  const flightInfoList = parseFlightData(data);

  return (
    <div className="space-y-4">
      {flightInfoList.map((flightInfo, index) => (
        <FlightData key={index} flightInfo={flightInfo} />
      ))}
    </div>
  );
};

export default FlightDataList;