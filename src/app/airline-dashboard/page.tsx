'use client';

import withAuth from '@/components/auth/with-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Building, Plane, Users } from 'lucide-react';

function AirlineDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Airline Dashboard</h2>
      </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Airline</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{user?.username}</div>
            <p className="text-xs text-muted-foreground">Operations overview</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Flights</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">Flights currently in air</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23,450</div>
            <p className="text-xs text-muted-foreground">Passengers flying today</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(AirlineDashboardPage, ['airline']);
