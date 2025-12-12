
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { travelTimeData, gateCongestionData } from '@/lib/data';
import { useMemo } from 'react';

const timeChartConfig = {
  time: {
    label: 'Minutes',
    color: 'hsl(var(--primary))',
  },
};

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export function TravelTimeChart() {
  return (
    <div className="h-[150px]">
       <ChartContainer config={timeChartConfig} className="w-full h-full">
        <PieChart>
          <Pie
            data={travelTimeData.times}
            dataKey="time"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="hsl(var(--primary))"
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
              const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
              return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {travelTimeData.times.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Legend layout="vertical" align="right" verticalAlign="middle" iconSize={10} />
        </PieChart>
      </ChartContainer>
    </div>
  );
}


export function GateCongestionChart() {
    const congestionColor = useMemo(() => (value: number) => {
        if (value > 0.75) return 'hsl(var(--destructive))';
        if (value > 0.5) return 'hsl(var(--chart-3))';
        return 'hsl(var(--chart-2))';
    }, []);

    return (
        <div className="grid grid-cols-6 gap-2">
            {gateCongestionData.map(item => (
                <div key={item.gate} className="flex flex-col items-center">
                    <div
                        className="w-full h-8 rounded flex items-center justify-center font-bold text-xs text-white"
                        style={{ backgroundColor: congestionColor(item.congestion), opacity: item.congestion + 0.1 }}
                        title={`Congestion: ${(item.congestion * 100).toFixed(0)}%`}
                    >
                    </div>
                    <span className="text-xs mt-1 text-muted-foreground">{item.gate}</span>
                </div>
            ))}
        </div>
    )
}
