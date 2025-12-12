
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
        "Departure Difference": 0.35,
        "Airport Congestion": 0.25,
        "Weather Conditions": 0.2,
        "Departure Time": 0.1,
        "Flight Duration": 0.05,
        "Distance": 0.03,
        "Airline": 0.02
    }
};


export const travelTimeData = {
  labels: ['Travel to Airport', 'Security Wait', 'Walk to Gate'],
  times: [
    { label: 'Travel to Airport', time: 35 },
    { label: 'Security Wait', time: 20 },
    { label: 'Walk to Gate', time: 10 },
  ]
};

export const gateCongestionData = [
  { gate: 'A1', congestion: 0.8 }, { gate: 'A2', congestion: 0.6 }, { gate: 'A3', congestion: 0.3 },
  { gate: 'A4', congestion: 0.9 }, { gate: 'A5', congestion: 0.5 }, { gate: 'A6', congestion: 0.2 },
  { gate: 'B1', congestion: 0.4 }, { gate: 'B2', congestion: 0.7 }, { gate: 'B3', congestion: 0.5 },
  { gate: 'B4', congestion: 0.3 }, { gate: 'B5', congestion: 0.8 }, { gate: 'B6', congestion: 0.6 },
  { gate: 'C1', congestion: 0.2 }, { gate: 'C2', congestion: 0.5 }, { gate: 'C3', congestion: 0.7 },
];

export const flightRecommendations = [
    { id: 1, airline: 'Delta', flightNumber: 'DL234', destination: 'LAX', departs: '10:00 AM', onTimePercentage: 92, historicalDataPoints: 1500 },
    { id: 2, airline: 'United', flightNumber: 'UA567', destination: 'LAX', departs: '10:30 AM', onTimePercentage: 85, historicalDataPoints: 1200 },
    { id: 3, airline: 'JetBlue', flightNumber: 'JB890', destination: 'LAX', departs: '11:00 AM', onTimePercentage: 88, historicalDataPoints: 800 },
];

export const weatherAlerts = [
    { id: 1, airport: 'JFK', alert: 'Thunderstorms expected around 4 PM. Potential for ground stops.', severity: 'High' },
    { id: 2, airport: 'ORD', alert: 'Heavy fog reported. Visibility may cause delays.', severity: 'Medium' },
];

export const securityQueueData = [
    { terminal: 'T1', waitTime: 15 },
    { terminal: 'T2', waitTime: 25 },
    { terminal: 'T3', waitTime: 10 },
    { terminal: 'T4', waitTime: 40 },
];

export const luggageData = {
    tag: 'UA-123456',
    status: 'Loaded on Plane',
    lostProbability: 2,
    baggageDelayProbability: 15,
    progress: 50,
};
