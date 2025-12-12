'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, PlaneTakeoff, Clock, AlertTriangle } from 'lucide-react';
import { airlines, airports, weatherConditions, airportCongestionLevels } from '@/lib/data';

const formSchema = z.object({
  airline: z.string().min(1, 'Airline is required.'),
  flightDuration: z.coerce.number().min(1, 'Duration must be positive.'),
  departureTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM).'),
  departureDifference: z.coerce.number(),
  weatherConditions: z.string().min(1, 'Weather is required.'),
  airportCongestion: z.string().min(1, 'Congestion level is required.'),
  distance: z.coerce.number().min(1, 'Distance must be positive.'),
  originAirport: z.string().min(1, 'Origin is required.'),
  destinationAirport: z.string().min(1, 'Destination is required.'),
});

type PredictionResult = {
  status: 'On Time' | 'Delayed';
  probability: number;
};

export function PredictionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      airline: '',
      flightDuration: 120,
      departureTime: '14:30',
      departureDifference: 0,
      weatherConditions: '',
      airportCongestion: '',
      distance: 800,
      originAirport: '',
      destinationAirport: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);

    // Simulate ML model prediction
    await new Promise(resolve => setTimeout(resolve, 1500));

    const probability = Math.random();
    setResult({
      status: probability > 0.4 ? 'Delayed' : 'On Time',
      probability: probability > 0.4 ? Math.floor(probability * 100) : Math.floor((1-probability) * 100),
    });

    setIsLoading(false);
  };

  const ResultAnimation = ({ isDelayed }: { isDelayed: boolean }) => (
    <div className="w-48 h-48 mx-auto my-4 bg-muted/20 rounded-lg flex items-center justify-center">
       <span className="text-muted-foreground text-sm">
         {/* Placeholder for Lottie animation */}
         {isDelayed ? <AlertTriangle className="size-24 text-destructive" /> : <PlaneTakeoff className="size-24 text-chart-2" />}
       </span>
    </div>
  );

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField control={form.control} name="airline" render={({ field }) => (
                <FormItem>
                  <FormLabel>Airline</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select an airline" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>{airlines.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="flightDuration" render={({ field }) => (
                <FormItem>
                  <FormLabel>Flight Duration (mins)</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="departureTime" render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Time (HH:MM)</FormLabel>
                  <FormControl><Input placeholder="e.g., 14:30" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="departureDifference" render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Difference (mins)</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="weatherConditions" render={({ field }) => (
                <FormItem>
                  <FormLabel>Weather Conditions</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select weather" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>{weatherConditions.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="airportCongestion" render={({ field }) => (
                <FormItem>
                  <FormLabel>Airport Congestion</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select congestion level" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>{airportCongestionLevels.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="distance" render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance (km)</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="originAirport" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Origin" /></SelectTrigger></FormControl>
                      <SelectContent>{airports.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="destinationAirport" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Destination" /></SelectTrigger></FormControl>
                      <SelectContent>{airports.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Predicting...</> : 'Predict Delay'}
            </Button>
          </form>
        </Form>
      </CardContent>
      {(isLoading || result) && (
        <div className="lg:col-start-3 lg:row-start-1 mt-8 lg:mt-0">
          {isLoading && (
              <Card>
                  <CardContent className="text-center p-6 flex flex-col items-center justify-center h-[350px]">
                      <Loader2 className="h-16 w-16 animate-spin text-primary" />
                      <p className="mt-4 text-muted-foreground">Analyzing flight data...</p>
                  </CardContent>
              </Card>
          )}
          {result && !isLoading && (
            <Card className={`bg-gradient-to-br ${result.status === 'Delayed' ? 'from-destructive/20 to-destructive/20' : 'from-chart-2/20 to-chart-2/20'} border-2 ${result.status === 'Delayed' ? 'border-destructive' : 'border-chart-2'}`}>
              <CardContent className="text-center p-6">
                <h3 className="text-lg font-semibold text-muted-foreground">Prediction Result</h3>
                <ResultAnimation isDelayed={result.status === 'Delayed'} />
                <p className={`text-5xl font-bold font-headline ${result.status === 'Delayed' ? 'text-destructive' : 'text-chart-2'}`}>
                  {result.status}
                </p>
                <div className="flex items-center justify-center gap-2 mt-4 text-2xl font-semibold">
                  {result.status === 'Delayed' ? <AlertTriangle className="text-destructive/80" /> : <Clock className="text-chart-2/80" />}
                  <span>
                    {result.probability}%
                    <span className="text-sm text-muted-foreground ml-1">
                      chance
                    </span>
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  );
}
