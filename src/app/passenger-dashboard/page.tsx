'use client';

import withAuth from '@/components/auth/with-auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Plane, User, Bell, Suitcase, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function PassengerDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">My Travel Hub</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Flights</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Upcoming flights scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Trips</CardTitle>
            <Suitcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Active trip to San Francisco</p>
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Bell className="text-primary"/>
                Upcoming Flight Status
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                <div>
                    <p className="font-semibold">DL456 to JFK</p>
                    <p className="text-sm text-muted-foreground">Scheduled Departure: 18:30</p>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-chart-2">On Time</p>
                    <p className="text-xs text-muted-foreground">Gate A12</p>
                </div>
            </div>
             <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                <div>
                    <p className="font-semibold">UA789 to ORD</p>
                    <p className="text-sm text-muted-foreground">Scheduled Departure: 20:00</p>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-destructive">Delayed</p>
                    <p className="text-xs text-muted-foreground">New Departure: 20:45</p>
                </div>
            </div>
        </CardContent>
       </Card>
    </div>
  );
}

export default withAuth(PassengerDashboardPage, ['passenger']);
