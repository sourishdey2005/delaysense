export const airlines = [
  'Delta', 'American', 'United', 'Southwest', 'Alaska', 'JetBlue', 'Spirit', 'Frontier'
];

export const airports = [
  'JFK', 'LAX', 'ORD', 'DFW', 'DEN', 'ATL', 'SFO', 'LAS', 'MCO', 'SEA'
];

export const weatherConditions = [
  'Clear', 'Rain', 'Storm', 'Fog', 'Snow', 'Cloudy'
];

export const airportCongestionLevels = [
  'Low', 'Medium', 'High'
];

export const airportDelayData = [
  { airport: 'JFK', delays: 120 },
  { airport: 'LAX', delays: 110 },
  { airport: 'ORD', delays: 105 },
  { airport: 'DFW', delays: 95 },
  { airport: 'ATL', delays: 80 },
  { airport: 'SFO', delays: 75 },
  { airport: 'DEN', delays: 60 },
];

export const delayByHourData = [
  { hour: '00:00', delays: 5 },
  { hour: '01:00', delays: 3 },
  { hour: '02:00', delays: 2 },
  { hour: '03:00', delays: 1 },
  { hour: '04:00', delays: 2 },
  { hour: '05:00', delays: 4 },
  { hour: '06:00', delays: 10 },
  { hour: '07:00', delays: 15 },
  { hour: '08:00', delays: 25 },
  { hour: '09:00', delays: 22 },
  { hour: '10:00', delays: 28 },
  { hour: '11:00', delays: 30 },
  { hour: '12:00', delays: 35 },
  { hour: '13:00', delays: 32 },
  { hour: '14:00', delays: 40 },
  { hour: '15:00', delays: 45 },
  { hour: '16:00', delays: 50 },
  { hour: '17:00', delays: 55 },
  { hour: '18:00', delays: 60 },
  { hour: '19:00', delays: 50 },
  { hour: '20:00', delays: 40 },
  { hour: '21:00', delays: 30 },
  { hour: '22:00', delays: 20 },
  { hour: '23:00', delays: 10 },
];

export const featureImportanceData = {
  featureImportances: {
    'Departure Difference': 0.35,
    'Airport Congestion': 0.25,
    'Weather Conditions': 0.20,
    'Departure Time': 0.10,
    'Flight Duration': 0.05,
    'Distance': 0.03,
    'Airline': 0.02,
  }
};
