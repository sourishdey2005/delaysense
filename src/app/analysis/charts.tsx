'use client';

import { Bar, BarChart as RechartsBarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Pie, PieChart, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { passengerSentimentData, wifiSpeedData, checkinLoadData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

const chartConfig = {
  sentiment: {
    label: 'Sentiment Score',
    color: 'hsl(var(--chart-1))',
  },
  anxious: {
    label: 'Anxious',
    color: 'hsl(var(--destructive))',
  },
  calm: {
    label: 'Calm',
    color: 'hsl(var(--chart-2))',
  },
  neutral: {
    label: 'Neutral',
    color: 'hsl(var(--muted))',
  },
  speed: {
    label: 'Speed (Mbps)',
    color: 'hsl(var(--chart-4))',
  },
  load: {
    label: 'Queue Time (min)',
    color: 'hsl(var(--chart-5))',
  }
};

const SENTIMENT_COLORS = [chartConfig.calm.color, chartConfig.neutral.color, chartConfig.anxious.color];

export function PassengerSentimentChart() {
  return (
    <div className="h-[250px]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={passengerSentimentData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            startAngle={90}
            endAngle={450}
          >
            {passengerSentimentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}

export function WifiSpeedChart() {
  return (
    <div className="h-[250px]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <RechartsBarChart data={wifiSpeedData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="terminal" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} domain={[0, 100]} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="speed" fill="var(--color-speed)" radius={4} />
        </RechartsBarChart>
      </ChartContainer>
    </div>
  );
}

export function CheckinLoadChart() {
  return (
    <div className="h-[250px]">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <LineChart data={checkinLoadData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 2)} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="load" stroke="var(--color-load)" strokeWidth={2} dot={false} />
            </LineChart>
      </ChartContainer>
    </div>
  );
}

export function AirlinePunctualityTable({ data }: { data: { airline: string, score: number, flights: number }[] }) {
    const getBadgeVariant = (score: number) => {
        if (score > 90) return 'default';
        if (score > 80) return 'secondary';
        return 'destructive';
    }
    return (
        <div className="space-y-4">
            {data.sort((a,b) => b.score - a.score).map(airline => (
                 <div key={airline.airline} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                    <div>
                        <p className="font-semibold">{airline.airline}</p>
                        <p className="text-xs text-muted-foreground">{airline.flights.toLocaleString()} flights tracked</p>
                    </div>
                    <Badge variant={getBadgeVariant(airline.score)} className="text-lg">
                        {airline.score.toFixed(1)}%
                    </Badge>
                </div>
            ))}
        </div>
    );
}