import React from 'react';
import { BarChart as ChartIcon, Clock, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AirportDelayChart, DelayByHourChart, FeatureImportanceChart } from './charts';

export default function InsightsPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Insights Dashboard</h2>
      </div>
      
      <Card className="grid md:grid-cols-2 gap-4 items-start">
        <div>
          <CardHeader>
            <CardTitle>Feature Importance</CardTitle>
            <CardDescription>Key factors influencing flight delays, according to our model.</CardDescription>
          </CardHeader>
          <CardContent>
            <FeatureImportanceChart />
          </CardContent>
        </div>
        <div className="p-6">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
            <h4 className="font-semibold flex items-center gap-2"><Lightbulb className="text-primary" /> Static Explanation</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The most influential factor in predicting flight delays is the 'Departure Difference', which is the difference between scheduled and actual departure time. This is because initial delays have a strong cascading effect on the system. 'Airport Congestion' and adverse 'Weather Conditions' are also significant factors, as they directly impact airport capacity and operational feasibility.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartIcon />
              Airport Delay Contribution
            </CardTitle>
            <CardDescription>Top airports contributing to delays.</CardDescription>
          </CardHeader>
          <CardContent>
            <AirportDelayChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock />
              Delay by Hour of the Day
            </CardTitle>
            <CardDescription>Peak delay times throughout the day.</CardDescription>
          </CardHeader>
          <CardContent>
            <DelayByHourChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
