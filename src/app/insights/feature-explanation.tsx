'use client';

import { use } from 'react';
import type { ExplainFeatureImportanceOutput } from '@/ai/flows/explain-feature-importance';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb } from 'lucide-react';

export function FeatureExplanation({ promise }: { promise: Promise<ExplainFeatureImportanceOutput> }) {
  const result = use(promise);
  return (
    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
      <h4 className="font-semibold flex items-center gap-2"><Lightbulb className="text-primary" /> AI Explanation</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation}</p>
    </div>
  );
}

export function FeatureExplanationSkeleton() {
    return (
        <div className="p-4 rounded-lg bg-muted/50 space-y-3">
            <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    )
}
