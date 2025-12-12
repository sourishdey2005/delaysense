'use client';

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Pie, PieChart, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { gateCongestionData, securityQueueData, foodCourtCrowdData } from '@/lib/data';
import { useState, useEffect } from 'react';

const chartConfig = {
  congestion: {
    label: 'Congestion',
    color: 'hsl(var(--primary))',
  },
  waitTime: {
    label: 'Wait Time (mins)',
    color: 'hsl(var(--accent))',
  },
   probability: {
    label: 'Probability',
    color: 'hsl(var(--destructive))',
  },
  remaining: {
    label: 'Remaining',
    color: 'hsl(var(--muted))',
  },
  crowd: {
    label: 'Crowd Level',
    color: 'hsl(var(--chart-3))'
  }
};

export function GateCongestionChart() {
  return (
    <div className="h-[200px]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <RechartsBarChart data={gateCongestionData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="gate" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} domain={[0, 1]} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="congestion" fill="var(--color-congestion)" radius={4} />
        </RechartsBarChart>
      </ChartContainer>
    </div>
  );
}

export function SecurityQueueChart() {
  return (
    <div className="h-[200px]">
        <ChartContainer config={chartConfig} className="w-full h-full">
            <RechartsBarChart data={securityQueueData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid horizontal={false} />
                <YAxis dataKey="terminal" type="category" tickLine={false} axisLine={false} tickMargin={8} width={50} fontSize={12} />
                <XAxis type="number" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="waitTime" fill="var(--color-waitTime)" radius={4} layout="vertical" />
            </RechartsBarChart>
        </ChartContainer>
    </div>
  );
}

const COLORS = ['hsl(var(--destructive))', 'hsl(var(--muted))'];

export function BaggageDelayChart({ percentage }: { percentage: number }) {
  const data = [
    { name: 'Delay Probability', value: percentage },
    { name: 'On-Time Probability', value: 100 - percentage },
  ];
  return (
    <div className="h-[120px] w-[120px] mx-auto">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={50}
            paddingAngle={5}
            startAngle={90}
            endAngle={450}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}

export function FoodCourtCrowdChart() {
    const [liveFoodData, setLiveFoodData] = useState(foodCourtCrowdData);

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveFoodData(prevData => prevData.map(item => ({
                ...item,
                crowd: Math.max(0.1, Math.min(1.0, item.crowd + (Math.random() - 0.5) * 0.2))
            })));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[200px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <RechartsBarChart data={liveFoodData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} fontSize={12} domain={[0, 1]} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Bar dataKey="crowd" fill="var(--color-crowd)" radius={4} />
                </RechartsBarChart>
            </ChartContainer>
        </div>
    );
}
