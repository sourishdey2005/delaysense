import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gauge, PieChart as PieIcon, Thermometer, Cloudy, Donut, Map, Users, BaggageClaim } from 'lucide-react';
import { 
    FlightDelayGauge, 
    AirlinePerformancePie,
    HourlyDelayHeatmap,
    WeatherImpactBar,
    AirportCongestionDonut,
    RouteDelayMap,
    GateCrowdingBubble,
    LuggageDelayPie
} from './charts';

export default function VisualizationsPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Traveler Experience Visualizations</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Gauge className="text-primary"/>Flight Delay Probability</CardTitle>
            <CardDescription>Real-time delay risk for your flight (AI101).</CardDescription>
          </CardHeader>
          <CardContent>
            <FlightDelayGauge />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><PieIcon className="text-primary"/>Airline On-Time Performance</CardTitle>
            <CardDescription>Delayed vs. on-time flights for a selected airline.</CardDescription>
          </CardHeader>
          <CardContent>
            <AirlinePerformancePie />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Donut className="text-primary"/>Airport Congestion Level</CardTitle>
            <CardDescription>Congestion risk at the selected airport (DEL).</CardDescription>
          </CardHeader>
          <CardContent>
            <AirportCongestionDonut />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Cloudy className="text-primary"/>Weather Impact on Delays</CardTitle>
            <CardDescription>How different weather conditions affect delay likelihood.</CardDescription>
          </CardHeader>
          <CardContent>
            <WeatherImpactBar />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Thermometer className="text-primary"/>Hourly Delay Heatmap</CardTitle>
            <CardDescription>Hourly delay patterns throughout the day at the airport.</CardDescription>
          </CardHeader>
          <CardContent>
            <HourlyDelayHeatmap />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Map className="text-primary"/>Origin to Destination Delay Map</CardTitle>
            <CardDescription>Simulated delay intensity on major routes across India.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <RouteDelayMap />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BaggageClaim className="text-primary"/>Luggage Delay Probability</CardTitle>
            <CardDescription>The chance of your luggage being delayed.</CardDescription>
          </CardHeader>
          <CardContent>
            <LuggageDelayPie />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="text-primary"/>Gate Crowding Real-Time Graph</CardTitle>
            <CardDescription>Live visualization of passenger density at various gates.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <GateCrowdingBubble />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
