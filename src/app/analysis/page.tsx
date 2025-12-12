import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wifi, Smile, UserCheck, CheckCircle } from 'lucide-react';
import { AirlinePunctualityTable, CheckinLoadChart, PassengerSentimentChart, WifiSpeedChart } from './charts';
import { airlinePunctualityData } from '@/lib/data';

export default function AnalysisPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Analysis & Prediction Center</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smile className="text-primary" />
              Passenger Mood Sentiment
            </CardTitle>
            <CardDescription>Predicted passenger sentiment based on current delay statuses and feedback.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <PassengerSentimentChart />
            <p className="text-center text-muted-foreground mt-4">The model predicts a general sentiment of <span className="font-bold text-foreground">Calm</span>, but with a notable pocket of <span className="font-bold text-destructive">Anxiety</span> detected.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="text-primary" />
              Airport WiFi Speed Prediction
            </CardTitle>
            <CardDescription>Predicted WiFi speed (in Mbps) across different terminals based on current load.</CardDescription>
          </CardHeader>
          <CardContent>
            <WifiSpeedChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="text-primary" />
              Check-in Counter Load Predictor
            </CardTitle>
            <CardDescription>Estimated queue times at airline check-in counters throughout the day.</CardDescription>
          </CardHeader>
          <CardContent>
            <CheckinLoadChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-primary" />
              Real-Time Airline Punctuality
            </CardTitle>
            <CardDescription>Live on-time performance scores for major airlines operating in the airport.</CardDescription>
          </CardHeader>
          <CardContent>
            <AirlinePunctualityTable data={airlinePunctualityData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
