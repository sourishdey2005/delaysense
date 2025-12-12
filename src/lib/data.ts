
export const airlines = [
  'IndiGo', 'Vistara', 'Air India', 'SpiceJet', 
  'Delta', 'American', 'United', 'Southwest', 
  'Emirates', 'Etihad', 'Qatar Airways', 'Lufthansa', 
  'Singapore Airlines', 'British Airways', 'KLM'
];

export const airports = [
  'DEL', 'BOM', 'BLR', 'MAA', 'CCU', // India
  'JFK', 'LAX', 'ORD', 'DFW', 'ATL', // US
  'DXB', 'LHR', 'SIN', 'FRA', 'CDG'  // International
];

export const weatherConditions = [
  'Clear', 'Rain', 'Storm', 'Fog', 'Snow', 'Cloudy', 'Haze', 'Monsoon'
];

export const airportCongestionLevels = [
  'Low', 'Medium', 'High'
];

export const airportDelayData = [
  { airport: 'DEL', delays: 130 },
  { airport: 'BOM', delays: 125 },
  { airport: 'JFK', delays: 115 },
  { airport: 'LHR', delays: 110 },
  { airport: 'LAX', delays: 100 },
  { airport: 'ORD', delays: 95 },
  { airport: 'BLR', delays: 90 },
];

export const delayByHourData = [
  { hour: '00:00', delays: 5 }, { hour: '01:00', delays: 3 }, { hour: '02:00', delays: 2 },
  { hour: '03:00', delays: 1 }, { hour: '04:00', delays: 4 }, { hour: '05:00', delays: 8 },
  { hour: '06:00', delays: 15 }, { hour: '07:00', delays: 20 }, { hour: '08:00', delays: 30 },
  { hour: '09:00', delays: 28 }, { hour: '10:00', delays: 32 }, { hour: '11:00', delays: 35 },
  { hour: '12:00', delays: 38 }, { hour: '13:00', delays: 36 }, { hour: '14:00', delays: 45 },
  { hour: '15:00', delays: 50 }, { hour: '16:00', delays: 55 }, { hour: '17:00', delays: 60 },
  { hour: '18:00', delays: 65 }, { hour: '19:00', delays: 58 }, { hour: '20:00', delays: 50 },
  { hour: '21:00', delays: 40 }, { hour: '22:00', delays: 25 }, { hour: '23:00', delays: 15 },
];

export const featureImportanceData = {
    featureImportances: {
        "Departure Difference": 0.35, "Airport Congestion": 0.25,
        "Weather Conditions": 0.2, "Departure Time": 0.1,
        "Flight Duration": 0.05, "Distance": 0.03, "Airline": 0.02
    }
};

export const travelTimeData = {
  labels: ['Travel to Airport', 'Security Wait', 'Walk to Gate'],
  times: [
    { label: 'Travel to Airport', time: 45 },
    { label: 'Security Wait', time: 25 },
    { label: 'Walk to Gate', time: 15 },
  ]
};

export const gateCongestionData = [
  { gate: 'A1', congestion: 0.8 }, { gate: 'B5', congestion: 0.6 }, { gate: 'C2', congestion: 0.3 },
  { gate: 'D9', congestion: 0.9 }, { gate: 'E1', congestion: 0.5 }, { gate: 'F3', congestion: 0.2 },
  { gate: 'G4', congestion: 0.4 }, { gate: 'H2', congestion: 0.7 }, { gate: 'J6', congestion: 0.5 },
];

export const flightRecommendations = [
    { id: 1, airline: 'Vistara', flightNumber: 'UK870', destination: 'BOM', departs: '10:00 AM', onTimePercentage: 94, historicalDataPoints: 2100 },
    { id: 2, airline: 'Emirates', flightNumber: 'EK201', destination: 'DXB', departs: '10:30 AM', onTimePercentage: 92, historicalDataPoints: 4500 },
    { id: 3, airline: 'IndiGo', flightNumber: '6E534', destination: 'BLR', departs: '11:00 AM', onTimePercentage: 89, historicalDataPoints: 3200 },
];

export const weatherAlerts = [
    { id: 1, airport: 'BOM', alert: 'Heavy monsoon rains expected around 2 PM. Potential for significant delays.', severity: 'High' },
    { id: 2, airport: 'DEL', alert: 'Dense fog predicted for early morning flights. Visibility may cause delays.', severity: 'Medium' },
];

export const securityQueueData = [
    { terminal: 'T1', waitTime: 15 },
    { terminal: 'T2', waitTime: 35 },
    { terminal: 'T3', waitTime: 20 },
];

export const luggageData = {
    tag: 'AI-654321',
    status: 'Checked In',
    lostProbability: 1.5,
    baggageDelayProbability: 12,
    progress: 10,
};

export const foodCourtCrowdData = [
    { name: 'Bikanervala', crowd: 0.8, wait: 15 },
    { name: 'Subway', crowd: 0.9, wait: 20 },
    { name: 'Cafe Coffee Day', crowd: 0.6, wait: 8 },
    { name: 'Foodies Bar', crowd: 0.7, wait: 12 },
];

export const seatComfortData = {
    turbulenceForecast: 'Light to Moderate',
    recommendedSeats: ['15A', '16F', '17A', '22C']
};

export const runwayTrafficData = {
    departures: 7,
    arrivals: 4,
};

export const ticketPriceData = {
    currentPrice: 8500.75,
    prediction: 8250.50
};

export const passengerSentimentData = [
    { name: 'Calm', value: 65 },
    { name: 'Neutral', value: 25 },
    { name: 'Anxious', value: 10 },
];

export const wifiSpeedData = [
    { terminal: 'T1', speed: 65 },
    { terminal: 'T2', speed: 30 },
    { terminal: 'T3', speed: 80 },
];

export const checkinLoadData = [
    { hour: '06:00', load: 15 }, { hour: '07:00', load: 25 }, { hour: '08:00', load: 30 },
    { hour: '09:00', load: 20 }, { hour: '10:00', load: 18 }, { hour: '11:00', load: 22 },
    { hour: '12:00', load: 28 }, { hour: '13:00', load: 35 }, { hour: '14:00', load: 40 },
    { hour: '15:00', load: 30 }, { hour: '16:00', load: 25 }, { hour: '17:00', load: 32 },
];

export const airlinePunctualityData = [
    { airline: 'IndiGo', score: 91.2, flights: 3200 },
    { airline: 'Vistara', score: 93.5, flights: 1800 },
    { airline: 'Air India', score: 86.8, flights: 2105 },
    { airline: 'Emirates', score: 95.1, flights: 1500 },
    { airline: 'Lufthansa', score: 90.5, flights: 980 },
];

export const loungeCrowdingData = [
    { name: 'Plaza Premium (DEL)', level: 'Medium' },
    { name: 'Adani Lounge (BOM)', level: 'High' },
    { name: '080 Lounge (BLR)', level: 'Medium' },
    { name: 'Encalm Lounge (DEL)', level: 'Low' },
];

export const specialNeedsAssistanceData = {
    predictedTime: 22,
    assignedHelper: 'Rohan S.',
};

export const flightRiskData = [
    { flight: '6E 237', risk: 'Low' },
    { flight: 'AI 804', risk: 'Low' },
    { flight: 'UK 990', risk: 'Medium' },
    { flight: 'BA 142', risk: 'High' },
    { flight: 'EK 517', risk: 'Low' },
    { flight: 'LH 761', risk: 'Very High' },
    { flight: 'SQ 401', risk: 'Medium' },
    { flight: 'SG 8169', risk: 'Low' },
];

export const upgradeProbabilityData = {
    probability: 72,
    level: 'High'
}

export const travelInsuranceData = {
    tripProfile: {
        destination: 'London (LHR)',
        duration: '7 days',
        riskLevel: 'Medium'
    },
    recommendation: {
        planName: 'SafeTravel Plus'
    }
}

// New data for visualizations page
export const airlinePerformanceData = [
    { name: 'On-Time', value: 82, color: 'hsl(var(--chart-2))' },
    { name: 'Delayed', value: 18, color: 'hsl(var(--destructive))' },
]

export const weatherImpactData = [
    { name: 'Clear', delay: 5 },
    { name: 'Cloudy', delay: 8 },
    { name: 'Rain', delay: 15 },
    { name: 'Fog', delay: 25 },
    { name: 'Storm', delay: 40 },
]

export const hourlyHeatmapData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  value: Math.floor(Math.random() * 100),
}));

export const airportCongestionData = [
    { name: 'Low', value: 40, color: 'hsl(var(--chart-2))' },
    { name: 'Medium', value: 35, color: 'hsl(var(--chart-3))' },
    { name: 'High', value: 25, color: 'hsl(var(--destructive))' },
];

export const gateCrowdingData = Array.from({length: 12}, (_, i) => ({
    id: `G${i + 1}`,
    x: Math.random() * 90 + 5,
    y: Math.random() * 80 + 10,
    size: Math.random() * 30 + 10,
    people: Math.floor(Math.random() * 100) + 10,
}));
