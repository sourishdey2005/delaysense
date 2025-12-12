import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldAlert, Calculator, BaggageClaim, ArrowUpCircle, Umbrella } from 'lucide-react';
import { flightRiskData, upgradeProbabilityData, travelInsuranceData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function RiskCenterPage() {

    const getRiskColor = (risk: 'Low' | 'Medium' | 'High' | 'Very High') => {
        if (risk === 'High') return 'bg-destructive/70';
        if (risk === 'Medium') return 'bg-chart-3/70';
        if (risk === 'Very High') return 'bg-destructive';
        return 'bg-chart-2/70';
    }


  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Risk & Compensation Center</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ShieldAlert className="text-primary"/>
                    Flight Delay & Cancellation Risk Score
                </CardTitle>
                <CardDescription>Heatmap showing the real-time risk score for flights departing from this airport.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-white">
                    {flightRiskData.map(flight => (
                        <div key={flight.flight} className={cn("p-3 rounded-lg text-center", getRiskColor(flight.risk))}>
                            <p className="font-bold text-sm">{flight.flight}</p>
                            <p className="text-xs font-semibold">{flight.risk} Risk</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calculator className="text-primary"/>Delay Compensation Calculator</CardTitle>
                <CardDescription>Estimate your potential compensation for a delayed flight.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">For a 4-hour delay on DEL-BOM:</p>
                <p className="text-4xl font-bold text-primary mt-2">₹4,500</p>
                <p className="text-xs text-muted-foreground mt-1">Based on airline regulations and flight distance.</p>
                <Button className="mt-4" size="sm">File a Claim</Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BaggageClaim className="text-primary"/>Baggage Carousel Predictor</CardTitle>
                <CardDescription>Estimate when your bags will arrive at the carousel.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                 <p className="text-sm text-muted-foreground">Carousel 5 Load</p>
                 <div className="my-2">
                    <Progress value={65} className="h-3" />
                 </div>
                 <p className="text-lg font-semibold">Estimated Arrival: <span className="text-primary">8 mins</span></p>
                 <p className="text-xs text-muted-foreground">Based on plane-to-terminal distance and current load.</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ArrowUpCircle className="text-primary"/>Fluid Ticket Upgrade Predictor</CardTitle>
                <CardDescription>Check your business class upgrade probability.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                 <p className="text-sm text-muted-foreground">For flight AI101 to JFK:</p>
                 <p className="text-5xl font-bold font-headline text-chart-2 mt-2">{upgradeProbabilityData.probability}%</p>
                 <div className="mt-2">
                    <Badge variant={upgradeProbabilityData.level === 'High' ? 'default' : 'secondary'}>{upgradeProbabilityData.level} Probability</Badge>
                 </div>
            </CardContent>
        </Card>

        <Card className="lg:col-span-3">
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><Umbrella className="text-primary"/>ML-Based Travel Insurance Advisor</CardTitle>
                <CardDescription>Get AI-powered recommendations for your trip.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-md">
                    <h4 className="font-semibold">Your Trip Profile:</h4>
                     <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Destination: {travelInsuranceData.tripProfile.destination}</li>
                        <li>Duration: {travelInsuranceData.tripProfile.duration}</li>
                        <li>Risk Level: <span className="font-bold">{travelInsuranceData.tripProfile.riskLevel}</span> (based on flight & destination)</li>
                    </ul>
                </div>
                 <div className="p-4 bg-primary/10 border border-primary/20 rounded-md">
                    <h4 className="font-semibold">AI Recommendation:</h4>
                    <p className="text-sm text-muted-foreground">
                        We recommend the <span className="font-bold text-foreground">{travelInsuranceData.recommendation.planName}</span> plan for its comprehensive coverage of trip cancellations and medical emergencies, which aligns with your trip's risk profile.
                    </p>
                     <Button className="mt-3" size="sm">View Plan Details</Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
