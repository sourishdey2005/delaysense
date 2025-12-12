'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Compass, BarChart, Info, Zap, LogIn, LogOut, LayoutDashboard, Telescope, ShieldAlert } from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useAuth } from '@/hooks/use-auth';

const baseNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/predict', label: 'Predict', icon: Compass },
  { href: '/insights', label: 'Insights', icon: BarChart },
  { href: '/analysis', label: 'Analysis', icon: Telescope },
  { href: '/risk-center', label: 'Risk Center', icon: ShieldAlert },
  { href: '/about', label: 'About', icon: Info },
];

const passengerDashboard = { href: '/passenger-dashboard', label: 'Dashboard', icon: LayoutDashboard };
const airlineDashboard = { href: '/airline-dashboard', label: 'Dashboard', icon: LayoutDashboard };
const govDashboard = { href: '/government-dashboard', label: 'Dashboard', icon: LayoutDashboard };


export function SidebarNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [...baseNavItems];
  if (user) {
      if(user.role === 'passenger') navItems.splice(1, 0, passengerDashboard);
      if(user.role === 'airline') navItems.splice(1, 0, airlineDashboard);
      if(user.role === 'government') navItems.splice(1, 0, govDashboard);
  }

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Icons.logo className="size-8 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold tracking-tight font-headline">DelaySense</h2>
            <p className="text-xs text-muted-foreground">Operations Assistant</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  asChild
                >
                  <div>
                    <item.icon />
                    <span>{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <Separator className="my-2" />
        <div className="p-2">
            {user ? (
                 <Button onClick={handleLogout} variant="outline" className="w-full">
                    <LogOut className="mr-2" />
                    Logout
                </Button>
            ) : (
                <Link href="/login" passHref>
                    <Button asChild className="w-full">
                      <div>
                        <LogIn className="mr-2" />
                        Login
                      </div>
                    </Button>
                </Link>
            )}
        </div>
        <Separator className="my-2" />
        <div className="p-2">
          <Link href="/predict">
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Zap className="mr-2" />
              New Prediction
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </>
  );
}
