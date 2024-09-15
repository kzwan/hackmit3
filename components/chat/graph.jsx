import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 9800 },
  { name: 'Mar', value: 15000 },
  { name: 'Apr', value: 12780 },
  { name: 'May', value: 13600 },
  { name: 'Jun', value: 14250 },
  { name: 'Jul', value: 15890 },
];


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm text-gray-600">{`${label}`}</p>
        <p className="text-lg font-bold text-blue-600">{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BeautifulLineGraph = () => {
  return (
    <div className="w-full h-96 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Financials</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            stroke="#888888"
            tick={{fill: '#888888'}}
          />
          <YAxis 
            stroke="#888888" 
            tick={{fill: '#888888'}}
          />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#8884d8" 
            strokeWidth={3}
            dot={{ r: 6, fill: "#8884d8", strokeWidth: 2, stroke: "#ffffff" }}
            activeDot={{ r: 8, fill: "#8884d8", strokeWidth: 2, stroke: "#ffffff" }}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BeautifulLineGraph;