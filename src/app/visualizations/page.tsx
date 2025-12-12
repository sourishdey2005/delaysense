import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gauge, PieChart as PieIcon, Thermometer, Cloudy, Donut, Map, Users, BaggageClaim, Timer, Footprints, ShieldCheck, Armchair, Layers, LocateFixed, TrendingUp, Radar, Utensils, Wifi, History, Smile } from 'lucide-react';
import { 
    FlightDelayGauge, 
    AirlinePerformancePie,
    HourlyDelayHeatmap,
    WeatherImpactBar,
    AirportCongestionDonut,
    RouteDelayMap,
    GateCrowdingBubble,
    LuggageDelayPie,
    BoardingTimeChart,
    PassengerFootfallChart,
    SecurityQueueForecastChart,
    SeatTurbulenceHeatmap,
    DelayReasonPieChart,
    GateChangeIndicator,
    PricePredictionTrend,
    LoungeCrowdingRadar,
    FoodCourtWaitTimeChart,
    WifiSpeedScatterPlot,
    DelayHistogram,
    TravelStressSunburst
} from './charts';
import { ClientOnly } from '@/components/ui/client-only';

export default function VisualizationsPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Traveler Experience Visualizations</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Gauge className="text-primary"/>Flight Delay Probability</CardTitle>
            <CardDescription>Real-time delay risk for your flight (AI101).</CardDescription>
          </CardHeader>
          <CardContent>
            <ClientOnly>
                <FlightDelayGauge />
            </ClientOnly>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><PieIcon className="text-primary"/>Airline On-Time Performance</CardTitle>
            <CardDescription>Delayed vs. on-time flights for a selected airline.</CardDescription>
          </CardHeader>
          <CardContent>
            <ClientOnly>
                <AirlinePerformancePie />
            </ClientOnly>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Donut className="text-primary"/>Airport Congestion Level</CardTitle>
            <CardDescription>Congestion risk at the selected airport (DEL).</CardDescription>
          </CardHeader>
          <CardContent>
            <ClientOnly>
                <AirportCongestionDonut />
            </ClientOnly>
          </CardContent>
        </Card>
        <Card className="xl:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BaggageClaim className="text-primary"/>Luggage Delay Probability</CardTitle>
                <CardDescription>The chance of your luggage being delayed.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly>
                    <LuggageDelayPie />
                </ClientOnly>
            </CardContent>
        </Card>
        
         <Card className="lg:col-span-3 xl:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Thermometer className="text-primary"/>Hourly Delay Heatmap</CardTitle>
            <CardDescription>Hourly delay patterns throughout the day at the airport.</CardDescription>
          </CardHeader>
          <CardContent>
            <ClientOnly>
                <HourlyDelayHeatmap />
            </ClientOnly>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Map className="text-primary"/>Origin to Destination Delay Map</CardTitle>
            <CardDescription>Simulated delay intensity on major routes across India.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <ClientOnly>
                <RouteDelayMap />
            </ClientOnly>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="text-primary"/>Gate Crowding Real-Time Graph</CardTitle>
            <CardDescription>Live visualization of passenger density at various gates.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ClientOnly>
                <GateCrowdingBubble />
            </ClientOnly>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3 xl:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Cloudy className="text-primary"/>Weather Impact on Delays</CardTitle>
            <CardDescription>How different weather conditions affect delay likelihood.</CardDescription>
          </CardHeader>
          <CardContent>
            <ClientOnly>
                <WeatherImpactBar />
            </ClientOnly>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Timer className="text-primary"/>Boarding Time Predictor</CardTitle>
                <CardDescription>Difference between scheduled vs. actual boarding times.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly><BoardingTimeChart /></ClientOnly>
            </CardContent>
        </Card>

        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Footprints className="text-primary"/>Passenger Footfall Trend</CardTitle>
                <CardDescription>Passenger footfall trend at the airport.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly><PassengerFootfallChart /></ClientOnly>
            </CardContent>
        </Card>
        
        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-primary"/>Security Queue Forecast</CardTitle>
                <CardDescription>Forecasted queue times at security check.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly><SecurityQueueForecastChart /></ClientOnly>
            </CardContent>
        </Card>

        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Armchair className="text-primary"/>Seat Turbulence Risk</CardTitle>
                <CardDescription>Heatmap showing turbulence impact by seat.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly><SeatTurbulenceHeatmap /></ClientOnly>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Layers className="text-primary"/>Delay Reason Categorization</CardTitle>
                <CardDescription>Breakdown of delay causes.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly><DelayReasonPieChart /></ClientOnly>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><LocateFixed className="text-primary"/>Gate Change Probability</CardTitle>
                <CardDescription>Likelihood of a last-minute gate change.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly><GateChangeIndicator /></ClientOnly>
            </CardContent>
        </Card>

        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="text-primary"/>Price Prediction Trend</CardTitle>
                <CardDescription>Upcoming ticket price trend for your route.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly><PricePredictionTrend /></ClientOnly>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Radar className="text-primary"/>Lounge Crowding</CardTitle>
                <CardDescription>Crowd levels in different airport lounges.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly><LoungeCrowdingRadar /></ClientOnly>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Utensils className="text-primary"/>Food Court Wait Times</CardTitle>
                <CardDescription>Live wait time estimates for food outlets.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly><FoodCourtWaitTimeChart /></ClientOnly>
            </CardContent>
        </Card>

        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wifi className="text-primary"/>WiFi Speed Prediction</CardTitle>
                <CardDescription>Predicted WiFi speed across airport zones.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly><WifiSpeedScatterPlot /></ClientOnly>
            </CardContent>
        </Card>

        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><History className="text-primary"/>30-Day Delay Histogram</CardTitle>
                <CardDescription>Delay distribution for the DEL-BOM route.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClientOnly><DelayHistogram /></ClientOnly>
            </CardContent>
        </Card>

         <Card className="xl:col-span-4">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Smile className="text-primary"/>Personalized Travel Stress Score</CardTitle>
                <CardDescription>A sunburst chart showing factors contributing to your travel stress.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
                <ClientOnly><TravelStressSunburst /></ClientOnly>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
