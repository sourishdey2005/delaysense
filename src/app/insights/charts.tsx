'use client';

import { Bar, BarChart as RechartsBarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { airportDelayData, delayByHourData, featureImportanceData } from '@/lib/data';

const chartConfig = {
  delays: {
    label: 'Delays',
    color: 'hsl(var(--primary))',
  },
  importance: {
    label: 'Importance',
    color: 'hsl(var(--accent))',
  },
};

export function AirportDelayChart() {
  return (
    <div className="h-[300px]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <RechartsBarChart data={airportDelayData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="airport" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="delays" fill="var(--color-delays)" radius={4} />
        </RechartsBarChart>
      </ChartContainer>
    </div>
  );
}

export function DelayByHourChart() {
  return (
    <div className="h-[300px]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <LineChart data={delayByHourData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 2)} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="delays" stroke="var(--color-delays)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export function FeatureImportanceChart() {
  const formattedData = Object.entries(featureImportanceData.featureImportances)
    .map(([name, value]) => ({ name, importance: value }))
    .sort((a, b) => b.importance - a.importance);

  return (
    <div className="h-[300px]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <RechartsBarChart data={formattedData} layout="vertical" margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
          <CartesianGrid horizontal={false} />
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={8} width={150} fontSize={12} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="importance" fill="var(--color-importance)" radius={4} layout="vertical" />
        </RechartsBarChart>
      </ChartContainer>
    </div>
  );
}
