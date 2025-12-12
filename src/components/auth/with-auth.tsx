'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles?: string[]
) {
  const AuthComponent = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace('/login');
      } else if (!loading && user && allowedRoles && !allowedRoles.includes(user.role)) {
        // If user does not have the required role, redirect them
        // You can redirect to a generic dashboard or an unauthorized page
        router.replace('/'); 
      }
    }, [user, loading, router, allowedRoles]);

    if (loading || !user) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      );
    }
    
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return (
            <div className="flex h-screen w-full items-center justify-center text-center">
                <div>
                    <h1 className="text-2xl font-bold">Access Denied</h1>
                    <p className="text-muted-foreground">You do not have permission to view this page.</p>
                </div>
            </div>
        )
    }

    return <WrappedComponent {...props} />;
  };
  
  AuthComponent.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;
  return AuthComponent;
}

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
