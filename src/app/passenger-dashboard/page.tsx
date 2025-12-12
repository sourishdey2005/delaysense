
'use client';

import withAuth from '@/components/auth/with-auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Plane, User, Bell, BriefcaseBusiness, ArrowRight, Car, Shield, PersonStanding, Clock, Map, CloudDrizzle, BaggageClaim, Search, Sparkles, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GateCongestionChart, SecurityQueueChart, BaggageDelayChart } from './charts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { flightRecommendations, weatherAlerts, luggageData } from '@/lib/data';

function PassengerDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">My Travel Hub</h2>
          <p className="text-muted-foreground">Welcome back, {user?.username}. Your intelligent travel assistant.</p>
        </div>
      </div>

      <Tabs defaultValue="trip">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trip">My Trip</TabsTrigger>
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
        </TabsList>
        <TabsContent value="trip" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="text-primary"/>
                            Upcoming Flight Status
                        </CardTitle>
                        <CardDescription>Personalized delay predictions for your flights.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 bg-muted/50 rounded-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">DL456 to JFK</p>
                                    <p className="text-sm text-muted-foreground">Scheduled Departure: 18:30</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-chart-2">On Time</p>
                                    <p className="text-xs text-muted-foreground">Gate A12</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-md">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">UA789 to ORD</p>
                                    <p className="text-sm text-muted-foreground">Scheduled Departure: 20:00</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-destructive">Delayed</p>
                                    <p className="text-xs text-muted-foreground">New Departure: 20:45</p>
                                </div>
                            </div>
                            <div className="border-t border-dashed my-3"></div>
                            <div>
                                <h4 className="font-semibold text-sm mb-2">Smart Rebooking Assistant</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                                    <div className="p-2 bg-background/50 rounded">
                                    <p className="font-bold">AA123 to ORD</p>
                                    <p>Departs: 20:15, Arrives: 22:30</p>
                                    <p className="text-chart-2">On Time</p>
                                    <Button size="sm" className="h-6 mt-1">Select</Button>
                                    </div>
                                    <div className="p-2 bg-background/50 rounded">
                                    <p className="font-bold">DL987 to ORD</p>
                                    <p>Departs: 20:30, Arrives: 22:45</p>
                                    <p className="text-chart-2">On Time</p>
                                    <Button size="sm" className="h-6 mt-1" variant="secondary">Select</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="text-primary"/>
                            Smart Travel Time
                        </CardTitle>
                        <CardDescription>Estimated door-to-gate travel time.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="flex items-center gap-2 text-muted-foreground"><Car /> Travel to Airport</span>
                            <span className="font-semibold">35 min</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="flex items-center gap-2 text-muted-foreground"><Shield /> Security Wait</span>
                            <span className="font-semibold">20 min</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="flex items-center gap-2 text-muted-foreground"><PersonStanding /> Walk to Gate</span>
                            <span className="font-semibold">10 min</span>
                        </div>
                        <div className="border-t border-dashed my-2"></div>
                        <div className="flex justify-between items-center font-bold text-base">
                            <span>Total Estimated Time</span>
                            <span>65 min</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Map className="text-primary"/> Gate Congestion</CardTitle>
                        <CardDescription>Live heatmap of terminal gate crowding.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <GateCongestionChart />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-1">
                <CardHeader className="flex flex-row items-center gap-4">
                    <User className="h-12 w-12 text-primary" />
                    <div>
                        <CardTitle>Welcome, {user?.username}</CardTitle>
                        <CardDescription>Manage your trips and profile</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Ready for your next adventure? Predict delays and travel smarter.</p>
                </CardContent>
                <CardFooter>
                    <Link href="/predict" className="w-full">
                        <Button className="w-full">
                            Predict a New Flight
                            <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </CardFooter>
                </Card>
            </div>
        </TabsContent>
        <TabsContent value="ai" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary" /> AI Flight Recommendations</CardTitle>
                <CardDescription>Flights with the lowest historical delay probability.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {flightRecommendations.map(flight => (
                  <div key={flight.id} className="flex justify-between items-center p-2 bg-muted/50 rounded-md text-sm">
                    <div>
                      <p className="font-semibold">{flight.airline} {flight.flightNumber} to {flight.destination}</p>
                      <p className="text-xs text-muted-foreground">Departs: {flight.departs}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-chart-2">{flight.onTimePercentage}% On-Time</p>
                      <p className="text-xs text-muted-foreground">Based on {flight.historicalDataPoints} flights</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-primary" /> Weather Impact Alerts</CardTitle>
                <CardDescription>Real-time warnings for weather-based delay risks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {weatherAlerts.map(alert => (
                  <div key={alert.id} className={`p-3 rounded-md border-l-4 ${alert.severity === 'High' ? 'border-destructive bg-destructive/10' : 'border-chart-3/10 bg-chart-3/10'}`}>
                    <p className="font-semibold flex items-center gap-2"><CloudDrizzle /> {alert.airport}</p>
                    <p className="text-sm text-muted-foreground">{alert.alert}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield className="text-primary" /> Security Queue Predictor</CardTitle>
                <CardDescription>AI-powered wait time estimations for your terminal.</CardDescription>
              </CardHeader>
              <CardContent>
                <SecurityQueueChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BaggageClaim className="text-primary" /> Baggage Delay Predictor</CardTitle>
                <CardDescription>Predict if your checked bags will be delayed at arrival.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <BaggageDelayChart percentage={luggageData.baggageDelayProbability} />
                 <p className="text-lg font-semibold mt-2">{luggageData.baggageDelayProbability}% Chance of Baggage Delay</p>
                <p className="text-sm text-muted-foreground">Based on flight load, airline, and destination airport.</p>
              </CardContent>
            </Card>
             <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Search className="text-primary" /> Personalized Luggage Tracking</CardTitle>
                    <CardDescription>ML-powered lost-luggage probability and tracking.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                            <p className="font-semibold">Your Bag (Tag: {luggageData.tag})</p>
                            <p className="text-sm text-muted-foreground">Status: <span className="font-medium text-chart-2">{luggageData.status}</span></p>
                        </div>
                        <div className="text-right">
                             <p className="text-xs text-muted-foreground">Lost Luggage Probability</p>
                             <p className="font-semibold text-destructive">{luggageData.lostProbability}%</p>
                        </div>
                    </div>
                     <div className="relative pt-4">
                        <div className="flex mb-2 items-center justify-between text-xs">
                           <div><span className={`inline-block py-1 px-2 uppercase rounded-full ${luggageData.progress >= 0 ? 'text-white bg-primary' : 'text-muted-foreground bg-muted'}`}>Checked In</span></div>
                           <div><span className={`inline-block py-1 px-2 uppercase rounded-full ${luggageData.progress >= 50 ? 'text-white bg-primary' : 'text-muted-foreground bg-muted'}`}>Loaded</span></div>
                           <div><span className={`inline-block py-1 px-2 uppercase rounded-full ${luggageData.progress >= 100 ? 'text-white bg-primary' : 'text-muted-foreground bg-muted'}`}>At Destination</span></div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-muted">
                            <div style={{ width: `${luggageData.progress}%`}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"></div>
                        </div>
                    </div>
                </CardContent>
             </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default withAuth(PassengerDashboardPage, ['passenger']);
