'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScanLine, Ticket, Loader2, Plane, User, Calendar, Clock, Waypoints, Armchair, PlaneTakeoff, PlaneLanding, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { scanTicket, type ScanTicketOutput } from '@/ai/flows/scan-ticket-flow';
import { useToast } from '@/hooks/use-toast';

export function TicketScanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ticketDetails, setTicketDetails] = useState<ScanTicketOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTicketDetails(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScanTicket = async () => {
    if (!imagePreview) {
        toast({
            variant: "destructive",
            title: "No Image Selected",
            description: "Please select a ticket image to scan.",
        });
        return;
    }

    setIsLoading(true);
    setTicketDetails(null);

    try {
      const result = await scanTicket({ ticketImage: imagePreview });
      setTicketDetails(result);
      toast({
        title: "Scan Successful",
        description: "Flight ticket details have been extracted.",
      });
    } catch (error) {
      console.error('Ticket scan error:', error);
      toast({
        variant: "destructive",
        title: "Scan Failed",
        description: "Could not extract details from the ticket. Please try another image.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setImagePreview(null);
    setTicketDetails(null);
    setIsLoading(false);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  const onOpenChange = (open: boolean) => {
    if (!open) {
        resetState();
    }
    setIsOpen(open);
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button size="lg" variant="outline">
          <ScanLine className="mr-2" />
          Scan Ticket
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Ticket className="text-primary" />
            AI Ticket Scanner
          </SheetTitle>
          <SheetDescription>
            Upload a photo of your flight ticket to automatically extract the details.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-1">
            <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="ticket-image">Upload Ticket</Label>
                <Input id="ticket-image" type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
            </div>

            {imagePreview && (
                <div className="border-2 border-dashed rounded-lg p-2 relative aspect-video">
                    <Image src={imagePreview} alt="Ticket Preview" layout="fill" objectFit="contain" />
                </div>
            )}
            
            {isLoading && (
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground p-8">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p>Scanning ticket...</p>
                    <p className="text-xs text-center">AI is analyzing the image. This might take a moment.</p>
                </div>
            )}

            {ticketDetails && (
                <div className="space-y-4 rounded-lg bg-muted/50 p-4 border">
                    <h3 className="font-semibold text-lg">Scanned Details</h3>
                     <div className="grid grid-cols-2 gap-4 text-sm">
                        <InfoItem icon={User} label="Passenger" value={ticketDetails.passengerName} />
                        <InfoItem icon={Plane} label="Flight" value={ticketDetails.flightNumber} />
                        <InfoItem icon={Calendar} label="Date" value={ticketDetails.departureDate} />
                        <InfoItem icon={Clock} label="Boarding" value={ticketDetails.boardingTime} />
                        <InfoItem icon={Waypoints} label="Gate" value={ticketDetails.gate} />
                        <InfoItem icon={Armchair} label="Seat" value={ticketDetails.seat} />
                     </div>
                     <div className="flex items-center justify-between text-sm pt-2 border-t">
                        <InfoItem icon={PlaneTakeoff} label="From" value={ticketDetails.departureAirport} />
                         <ArrowRight className="text-muted-foreground"/>
                        <InfoItem icon={PlaneLanding} label="To" value={ticketDetails.arrivalAirport} className="text-right" />
                     </div>
                </div>
            )}

            </div>
        </div>
        <SheetFooter>
          <Button onClick={handleScanTicket} disabled={isLoading || !imagePreview} className="w-full">
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scanning...</>
            ) : (
              <><ScanLine className="mr-2" /> Scan Ticket</>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}


const InfoItem = ({ icon: Icon, label, value, className }: { icon: React.ElementType, label: string, value: string, className?: string }) => {
    if (!value) return null;
    return (
        <div className={className}>
            <p className="text-xs text-muted-foreground flex items-center gap-1"><Icon className="size-3" /> {label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    )
}
