
'use client';

import React, { useState, useEffect } from 'react';
import { Bar, BarChart as RechartsBarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, Legend, LineChart, Line, Scatter, ScatterChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { airlinePerformanceData, weatherImpactData, hourlyHeatmapData, airportCongestionData, gateCrowdingData, luggageData, boardingTimeData, passengerFootfallData, securityQueueForecastData, delayReasonData, pricePredictionData, loungeCrowdingData, foodCourtWaitTimeData, wifiSpeedData, delayHistogramData, travelStressData } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const chartConfigBar = {
  delay: { label: 'Delay Index', color: 'hsl(var(--destructive))' },
};

const chartConfigPie = {
  ontime: { label: 'On-Time', color: 'hsl(var(--chart-2))' },
  delayed: { label: 'Delayed', color: 'hsl(var(--destructive))' },
};

// 1. Flight Delay Probability Gauge Meter
export function FlightDelayGauge() {
  const [probability, setProbability] = useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      setProbability(Math.floor(Math.random() * 90) + 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const gaugeData = [
    { name: 'risk', value: probability, fill: probability > 75 ? 'hsl(var(--destructive))' : probability > 40 ? 'hsl(var(--chart-3))' : 'hsl(var(--chart-2))' },
    { name: 'remaining', value: 100 - probability, fill: 'hsl(var(--muted))' }
  ];

  const color = probability > 75 ? 'text-destructive' : probability > 40 ? 'text-chart-3' : 'text-chart-2';
  
  return (
     <div className="w-full h-48 relative">
        <ChartContainer config={{}} className="w-full h-full">
            <PieChart startAngle={180} endAngle={0} innerRadius="60%" outerRadius="80%">
                <Pie data={gaugeData} dataKey="value" stroke="none" cornerRadius={5}>
                    {gaugeData.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                </Pie>
            </PieChart>
        </ChartContainer>
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none mt-[-2rem]">
            <p className={`text-5xl font-bold font-headline transition-colors ${color}`}>{probability}%</p>
            <p className="text-muted-foreground text-sm">Delay Risk</p>
        </div>
    </div>
  );
}

// 2. Airline On-Time Performance Pie Chart
export function AirlinePerformancePie() {
  const [data, setData] = useState(airlinePerformanceData);
  useEffect(() => {
    const interval = setInterval(() => {
      const delayed = Math.floor(Math.random() * 25) + 5;
      setData([
        { name: 'On-Time', value: 100 - delayed, color: 'hsl(var(--chart-2))' },
        { name: 'Delayed', value: delayed, color: 'hsl(var(--destructive))' },
      ]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-48">
      <ChartContainer config={chartConfigPie} className="mx-auto aspect-square w-full max-w-[250px]">
        <PieChart>
          <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={2}>
            {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
          </Pie>
           <Legend />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

// 3. Hourly Delay Heatmap
export function HourlyDelayHeatmap() {
    const [data, setData] = useState(hourlyHeatmapData);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => prevData.map(d => ({ ...d, value: Math.max(0, Math.min(100, d.value + (Math.random() - 0.5) * 10)) })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="w-full grid grid-cols-6 md:grid-cols-12 gap-1">
          <TooltipProvider>
            {data.map(({ hour, value }) => {
                const hue = 10; // Red-Orange
                const lightness = 95 - (value / 100) * 80; // from light to dark red
                return (
                    <Tooltip key={hour} >
                        <TooltipTrigger asChild>
                            <div 
                                className="h-10 w-full rounded-sm transition-colors duration-300"
                                style={{ backgroundColor: `hsl(${hue}, 80%, ${lightness}%)` }}
                            />
                        </TooltipTrigger>
                         <TooltipContent>
                            <p>{hour}: {Math.round(value)}% Delay Index</p>
                        </TooltipContent>
                    </Tooltip>
                )
            })}
            </TooltipProvider>
        </div>
    );
}

// 4. Weather Impact Bar Graph
export function WeatherImpactBar() {
  const [data, setData] = useState(weatherImpactData);
  useEffect(() => {
    const interval = setInterval(() => {
      setData(d => d.map(item => ({ ...item, delay: Math.max(5, item.delay + (Math.random() - 0.5) * 5) })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64">
      <ChartContainer config={chartConfigBar} className="w-full h-full">
        <RechartsBarChart data={data} margin={{ left: -10, right: 10 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={12}/>
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent/>} />
            <Bar dataKey="delay" radius={4}>
                {data.map((entry) => (
                    <Cell key={entry.name} fill={`hsl(var(--chart-${entry.delay > 20 ? 5 : entry.delay > 10 ? 3 : 2 }))`} />
                ))}
            </Bar>
        </RechartsBarChart>
      </ChartContainer>
    </div>
  );
}

// 5. Airport Congestion Level Donut Chart
export function AirportCongestionDonut() {
  const [data, setData] = useState(airportCongestionData);
  useEffect(() => {
    const interval = setInterval(() => {
      const high = Math.floor(Math.random() * 40) + 10;
      const medium = Math.floor(Math.random() * 40) + 10;
      const low = 100 - high - medium;
      setData([
        { name: 'Low', value: low, color: 'hsl(var(--chart-2))' },
        { name: 'Medium', value: medium, color: 'hsl(var(--chart-3))' },
        { name: 'High', value: high, color: 'hsl(var(--destructive))' },
      ]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-48">
      <ChartContainer config={{}} className="mx-auto aspect-square w-full max-w-[250px]">
        <PieChart>
          <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70}>
            {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
          </Pie>
           <Legend />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

// 6. Origin -> Destination Route Delay Map
export function RouteDelayMap() {
    const initialRoutes = [
        { id: 'del-bom', d: "M100 150 Q 150 250 200 350", strokeWidth: 2, delay: 20 },
        { id: 'del-blr', d: "M100 150 Q 200 400 250 550", strokeWidth: 3, delay: 60 },
        { id: 'bom-maa', d: "M200 350 Q 300 450 350 500", strokeWidth: 1.5, delay: 10 },
        { id: 'ccu-del', d: "M450 200 Q 250 150 100 150", strokeWidth: 2.5, delay: 45 },
    ];
    const cities = [
        { id: 'DEL', cx: 100, cy: 150, name: 'Delhi' },
        { id: 'BOM', cx: 200, cy: 350, name: 'Mumbai' },
        { id: 'BLR', cx: 250, cy: 550, name: 'Bengaluru' },
        { id: 'MAA', cx: 350, cy: 500, name: 'Chennai' },
        { id: 'CCU', cx: 450, cy: 200, name: 'Kolkata' },
    ]
    const [liveRoutes, setLiveRoutes] = useState(initialRoutes);

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveRoutes(prev => prev.map(r => ({...r, delay: Math.max(0, Math.min(100, r.delay + (Math.random() - 0.5) * 10))})));
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const getRouteColor = (delay: number) => {
        if (delay > 70) return 'hsl(var(--destructive))';
        if (delay > 40) return 'hsl(var(--chart-3))';
        return 'hsl(var(--chart-2))';
    }

    return (
        <svg viewBox="0 0 600 700" className="w-full h-full">
            {/* Placeholder for map of India */}
            <path d="M100 50 L50 200 L150 400 L250 600 L400 550 L500 350 L450 150 L300 50 Z" fill="hsl(var(--muted) / 0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
            
            {liveRoutes.map(route => (
                <path key={route.id} d={route.d} stroke={getRouteColor(route.delay)} strokeWidth={route.strokeWidth} fill="none" className="transition-all" strokeDasharray="5 5" />
            ))}

            {cities.map(city => (
                <g key={city.id}>
                    <circle cx={city.cx} cy={city.cy} r="8" fill="hsl(var(--primary))" />
                    <text x={city.cx + 12} y={city.cy + 5} fontSize="14" fill="hsl(var(--foreground))" className="font-semibold">{city.name}</text>
                </g>
            ))}
        </svg>
    )
}

// 7. Gate Crowding Real-Time Bubble Graph
export function GateCrowdingBubble() {
    const [data, setData] = useState(gateCrowdingData);

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => prev.map(bubble => ({
                ...bubble,
                size: Math.max(10, Math.min(50, bubble.size + (Math.random() - 0.5) * 10)),
                people: Math.max(10, Math.floor(bubble.size * 2))
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const getBubbleColor = (size: number) => {
        const hue = 10;
        const lightness = 80 - (size/50)*40;
        return `hsl(${hue}, 80%, ${lightness}%)`;
    }

    return (
        <div className="w-full h-full relative border border-dashed rounded-md bg-muted/20">
          <TooltipProvider>
            {data.map(bubble => (
                <Tooltip key={bubble.id}>
                    <TooltipTrigger asChild>
                         <div 
                            className="absolute rounded-full flex items-center justify-center text-white font-bold text-xs transition-all duration-500"
                            style={{
                                left: `${bubble.x}%`,
                                top: `${bubble.y}%`,
                                width: `${bubble.size}px`,
                                height: `${bubble.size}px`,
                                backgroundColor: getBubbleColor(bubble.size),
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            {bubble.id}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{bubble.people} people</p>
                    </TooltipContent>
                </Tooltip>
            ))}
            </TooltipProvider>
        </div>
    );
}

// 8. Luggage Delay Probability Pie Chart
export function LuggageDelayPie() {
  const [data, setData] = useState([
    { name: 'On-Time', value: 88, color: 'hsl(var(--chart-2))' },
    { name: 'Delayed', value: 12, color: 'hsl(var(--destructive))' },
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      const delayed = Math.floor(Math.random() * 20) + 5;
      setData([
        { name: 'On-Time', value: 100 - delayed, color: 'hsl(var(--chart-2))' },
        { name: 'Delayed', value: delayed, color: 'hsl(var(--destructive))' },
      ]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-48 relative">
      <ChartContainer config={chartConfigPie} className="mx-auto aspect-square w-full max-w-[250px]">
        <PieChart>
          <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={2}>
            {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-2xl font-bold text-foreground">
            {data.find(p => p.name === 'Delayed')?.value}%
        </p>
      </div>
    </div>
  );
}

// 9. Boarding Time Predictor Line Chart
export function BoardingTimeChart() {
  return (
    <div className="h-[250px]">
      <ChartContainer config={{}} className="w-full h-full">
        <LineChart data={boardingTimeData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="flight" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} label={{ value: 'Mins', angle: -90, position: 'insideLeft' }}/>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="scheduled" name="Scheduled" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} strokeDasharray="5 5" />
          <Line type="monotone" dataKey="actual" name="Actual" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

// 10. Passenger Footfall Trend at Airport
export function PassengerFootfallChart() {
  return (
    <div className="h-[250px]">
      <ChartContainer config={{}} className="w-full h-full">
        <LineChart data={passengerFootfallData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="footfall" name="Footfall" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2) / 0.1)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

// 11. Security Queue Time Forecast Bar Chart
export function SecurityQueueForecastChart() {
  return (
    <div className="h-[250px]">
      <ChartContainer config={{}} className="w-full h-full">
        <RechartsBarChart data={securityQueueForecastData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="waitTime" name="Wait Time (min)" fill="hsl(var(--chart-4))" radius={4} />
        </RechartsBarChart>
      </ChartContainer>
    </div>
  );
}

// 12. Seat Turbulence Risk Heatmap
export function SeatTurbulenceHeatmap() {
    const getRiskColor = (risk: string) => {
        if (risk === 'High') return 'bg-destructive';
        if (risk === 'Medium') return 'bg-chart-3';
        return 'bg-chart-2';
    };
    return (
        <div className="grid grid-cols-6 gap-1">
            {Array.from({ length: 30 }).map((_, i) => (
                <TooltipProvider key={i}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn("h-8 w-full rounded-sm text-white flex items-center justify-center text-xs", getRiskColor(i % 5 === 0 ? 'High' : i % 3 === 0 ? 'Medium' : 'Low'))}>
                                {`${Math.floor(i/6)+10}${String.fromCharCode(65 + i%6)}`}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Seat {`${Math.floor(i/6)+10}${String.fromCharCode(65 + i%6)}`}: {i % 5 === 0 ? 'High' : i % 3 === 0 ? 'Medium' : 'Low'} Risk</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    );
}

// 13. Delay Reason Categorization Pie Chart
export function DelayReasonPieChart() {
    const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
    return (
        <div className="w-full h-48">
            <ChartContainer config={{}} className="mx-auto aspect-square w-full max-w-[250px]">
                <PieChart>
                    <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={delayReasonData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70}>
                        {delayReasonData.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
            </ChartContainer>
        </div>
    );
}

// 14. Gate Change Probability Indicator
export function GateChangeIndicator() {
  const [probability, setProbability] = useState(15);
  useEffect(() => {
    const interval = setInterval(() => setProbability(Math.floor(Math.random() * 100)), 3000);
    return () => clearInterval(interval);
  }, []);

  const color = probability > 75 ? 'text-destructive' : probability > 40 ? 'text-chart-3' : 'text-chart-2';
  return (
    <div className="text-center h-48 flex flex-col justify-center items-center">
        <p className={`text-6xl font-bold font-headline transition-colors ${color}`}>{probability}%</p>
        <p className="text-muted-foreground text-sm">Chance of Gate Change</p>
    </div>
  );
}

// 15. Price Prediction Trend Line
export function PricePredictionTrend() {
    return (
        <div className="h-[250px]">
            <ChartContainer config={{}} className="w-full h-full">
                <LineChart data={pricePredictionData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} fontSize={12} domain={['dataMin - 500', 'dataMax + 500']}/>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="price" name="Price (₹)" stroke="hsl(var(--chart-5))" strokeWidth={2} dot={false} />
                </LineChart>
            </ChartContainer>
        </div>
    );
}

// 16. Lounge Crowding Radar Chart
export function LoungeCrowdingRadar() {
    return (
        <div className="h-[200px]">
            <ChartContainer config={{}} className="w-full h-full">
                <RadarChart data={loungeCrowdingData}>
                    <CartesianGrid />
                    <PolarGrid />
                    <PolarAngleAxis dataKey="lounge" fontSize={10}/>
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Radar name="Crowding" dataKey="value" stroke="hsl(var(--accent))" fill="hsl(var(--accent) / 0.6)" />
                </RadarChart>
            </ChartContainer>
        </div>
    );
}

// 17. Food Court Wait Time Bar Chart
export function FoodCourtWaitTimeChart() {
    return (
        <div className="h-[200px]">
            <ChartContainer config={{}} className="w-full h-full">
                <RechartsBarChart data={foodCourtWaitTimeData} layout="vertical">
                    <CartesianGrid horizontal={false} />
                    <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} width={80}/>
                    <XAxis type="number" hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Bar dataKey="waitTime" name="Wait (mins)" fill="hsl(var(--chart-3))" radius={4} />
                </RechartsBarChart>
            </ChartContainer>
        </div>
    );
}

// 18. WiFi Speed Prediction Scatter Plot
export function WifiSpeedScatterPlot() {
    return (
        <div className="h-[250px]">
            <ChartContainer config={{}} className="w-full h-full">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="crowd" name="Crowd Level" unit="%" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis type="number" dataKey="speed" name="Speed" unit="Mbps" tickLine={false} axisLine={false} fontSize={12} />
                    <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />}/>
                    <Scatter name="WiFi Speed vs Crowd" data={wifiSpeedData} fill="hsl(var(--chart-1))" />
                </ScatterChart>
            </ChartContainer>
        </div>
    );
}

// 19. Past 30-day Delay Histogram
export function DelayHistogram() {
    return (
        <div className="h-[250px]">
            <ChartContainer config={{}} className="w-full h-full">
                <RechartsBarChart data={delayHistogramData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="range" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} fontSize={12} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Bar dataKey="flights" name="Flights" fill="hsl(var(--chart-4))" radius={4} />
                </RechartsBarChart>
            </ChartContainer>
        </div>
    );
}

// 20. Personalized Travel Stress Score Sunburst Chart
export function TravelStressSunburst() {
    const COLORS = ["hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--destructive))"];
    return (
        <div className="w-full h-full">
            <ChartContainer config={{}} className="mx-auto aspect-square w-full max-w-[300px]">
                <PieChart>
                    <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={travelStressData.inner} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
                       {travelStressData.inner.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Pie data={travelStressData.outer} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label>
                       {travelStressData.outer.map((entry, index) => <Cell key={entry.name} fill={entry.color} />)}
                    </Pie>
                </PieChart>
            </ChartContainer>
        </div>
    );
}
