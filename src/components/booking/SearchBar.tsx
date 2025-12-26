/*
 * SearchBar - Booking.com-style Search Input
 * 
 * Design: Glassmorphism card floating over hero
 * Features: From, To, Date, Time, Travellers, CTA
 * Behavior: Sticky on scroll, mobile responsive
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, MapPin, Users, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface SearchBarProps {
  onSearch?: (data: SearchData) => void;
  defaultFrom?: string;
  defaultTo?: string;
  sticky?: boolean;
}

export interface SearchData {
  from: string;
  to: string;
  date: Date | undefined;
  time: 'Morning' | 'Afternoon' | 'Evening';
  travellers: number;
}

const SearchBar = ({ 
  onSearch, 
  defaultFrom = '', 
  defaultTo = '',
  sticky = true 
}: SearchBarProps) => {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [travellers, setTravellers] = useState(1);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isTravellersOpen, setIsTravellersOpen] = useState(false);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ from, to, date, time, travellers });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full ${sticky ? 'sticky top-4' : ''} z-30 px-4`}
    >
      <div className="container max-w-6xl mx-auto">
        {/* Glassmorphism card */}
        <div className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
          {/* Search grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* From */}
            <div className="md:col-span-3">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-light mb-2">
                From
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Paris"
                  className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-xl text-body font-light focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* To */}
            <div className="md:col-span-3">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-light mb-2">
                To
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Amsterdam"
                  className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-xl text-body font-light focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Date */}
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-light mb-2">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full flex items-center gap-2 px-4 py-3 bg-background/50 border border-border rounded-xl text-body font-light hover:bg-background/70 transition-all text-left">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="flex-1 truncate">
                      {date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select'}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time */}
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-light mb-2">
                Time
              </label>
              <Popover open={isTimeOpen} onOpenChange={setIsTimeOpen}>
                <PopoverTrigger asChild>
                  <button className="w-full flex items-center gap-2 px-4 py-3 bg-background/50 border border-border rounded-xl text-body font-light hover:bg-background/70 transition-all text-left">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="flex-1">{time}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="start">
                  {(['Morning', 'Afternoon', 'Evening'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTime(t);
                        setIsTimeOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-body font-light transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>

            {/* Travellers */}
            <div className="md:col-span-1">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-light mb-2">
                Travellers
              </label>
              <Popover open={isTravellersOpen} onOpenChange={setIsTravellersOpen}>
                <PopoverTrigger asChild>
                  <button className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-background/50 border border-border rounded-xl text-body font-light hover:bg-background/70 transition-all">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{travellers}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-32 p-2" align="start">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setTravellers(num);
                        setIsTravellersOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-body font-light transition-colors"
                    >
                      {num} {num === 1 ? 'traveller' : 'travellers'}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>

            {/* CTA Button */}
            <div className="md:col-span-1">
              <Button
                onClick={handleSearch}
                className="w-full h-[50px] bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-light text-body shadow-lg hover:shadow-xl transition-all"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;
