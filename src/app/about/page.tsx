import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { BrainCircuit, Code } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">About DelaySense</h2>
      </div>
      <div className="space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Icons.logo className="size-12 text-primary" />
            <div>
              <CardTitle>DelaySense: Airline Operations Assistant</CardTitle>
              <p className="text-muted-foreground">Predicting the future of air travel, one flight at a time.</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-muted-foreground">
              DelaySense is a proof-of-concept application built to demonstrate the power of machine learning in the aviation industry. By analyzing various flight parameters, our system provides predictions on potential delays, helping airlines optimize operations, reduce costs, and enhance passenger satisfaction. This tool serves as an intelligent assistant, offering actionable insights and foresight into the complex dynamics of airline scheduling.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BrainCircuit className="text-primary"/>
                        Our Technology
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   <p className="text-muted-foreground">
                     The core of DelaySense is a machine learning model trained on a vast synthetic dataset of flight records. We leverage a classification algorithm to distinguish between flights that are likely to be on-time versus those that may be delayed.
                   </p>
                   <p className="text-muted-foreground">
                    Our feature importance analysis, powered by generative AI, provides clear, human-readable explanations of which factors are most influential, turning complex data into understandable insights.
                   </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Code className="text-primary"/>
                        The Stack
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                   <p className="text-muted-foreground">
                     This application is built with a modern, production-ready tech stack:
                   </p>
                   <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li><strong>Frontend:</strong> Next.js & React</li>
                        <li><strong>Styling:</strong> Tailwind CSS & ShadCN UI</li>
                        <li><strong>AI/ML:</strong> Google Gemini via Genkit</li>
                        <li><strong>Backend & Hosting:</strong> Firebase</li>
                   </ul>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
