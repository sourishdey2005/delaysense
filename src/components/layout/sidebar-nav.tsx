'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Compass, BarChart, Info, Zap } from 'lucide-react';
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

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/predict', label: 'Predict', icon: Compass },
  { href: '/insights', label: 'Insights', icon: BarChart },
  { href: '/about', label: 'About', icon: Info },
];

export function SidebarNav() {
  const pathname = usePathname();

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
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
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
