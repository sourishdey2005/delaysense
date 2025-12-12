import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart, Compass, PlaneTakeoff } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'home-hero');

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center rounded-xl overflow-hidden shadow-lg border border-border">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        <div className="relative z-10 p-8 max-w-2xl text-left self-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-headline leading-tight">
            Sense Delays Before They Happen
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-lg">
            Leverage machine learning to predict flight delays with unparalleled accuracy. DelaySense is your co-pilot for smarter airline operations.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/predict">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Predicting
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/insights">
              <Button size="lg" variant="outline">
                View Insights
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="text-primary" />
              <span>Predictive Power</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Input flight details and get instant delay predictions. Our advanced model analyzes multiple factors to give you a clear On Time or Delayed forecast.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="text-primary" />
              <span>Actionable Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Dive into our analytics dashboard. Understand delay patterns by airport, time of day, and see what factors influence delays the most.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlaneTakeoff className="text-primary" />
              <span>Operational Efficiency</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Optimize your operations by anticipating disruptions. Reduce costs, improve passenger satisfaction, and stay ahead of the curve.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
