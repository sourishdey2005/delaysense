import { PredictionForm } from './prediction-form';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function PredictPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Flight Delay Prediction</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Enter Flight Details</CardTitle>
            <CardDescription>
              Fill in the form below to get a delay prediction from our model.
            </CardDescription>
          </CardHeader>
          <PredictionForm />
        </Card>
      </div>
    </div>
  );
}
