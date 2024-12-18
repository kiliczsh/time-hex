import { cn } from "@/lib/utils";
import { Clock, Palette } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const convertBase16 = (num: number): string => {
  return num < 10 ? num.toString() : num.toString(16);
};

const getHex = (d: Date): string => {
  const milliseconds = d.getMilliseconds();
  const seconds = d.getSeconds();
  const minutes = d.getMinutes();
  const hours = d.getHours();
  const array: string[] = [];

  const calc = (hours + minutes / 60) / 24;
  array[0] = convertBase16(Math.round(calc * 15));

  const calc2 = hours >= 20 ? (hours + minutes / 60) / 4 : (hours + minutes / 60) / 10;
  const calc3 = Math.floor(calc2);
  array[1] = convertBase16(Math.round((calc2 - calc3) * 15));

  const calc4 = (minutes + seconds / 60) / 60;
  array[2] = convertBase16(Math.round(calc4 * 15));

  const calc5 = (minutes + seconds / 60) / 10;
  const calc6 = Math.floor(calc5);
  array[3] = convertBase16(Math.round((calc5 - calc6) * 15));

  const calc7 = (seconds + milliseconds / 1000) / 60;
  array[4] = convertBase16(Math.round(calc7 * 15));

  const calc8 = (seconds + milliseconds / 1000) / 10;
  const calc9 = Math.floor(calc8);
  array[5] = convertBase16(Math.round((calc8 - calc9) * 15));

  return array.join('');
};

const ColorClock = () => {
  const [time, setTime] = useState(new Date());
  const [showColor, setShowColor] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(function updateClock() {
      setTime(new Date());
      requestAnimationFrame(updateClock);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const timeColor = `#${getHex(time)}`;
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const handleClick = (showColorValue: boolean) => {
    setIsAnimating(true);
    setTimeout(() => {
      setShowColor(showColorValue);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-between z-[250] min-h-screen p-4"
      style={{
        backgroundColor: timeColor,
        '--time-color': timeColor,
        '--time-color-0': `${timeColor}00`,
        '--time-color-20': `${timeColor}1A`,
        '--time-color-40': `${timeColor}4D`,
      } as React.CSSProperties}
    >
      <div className="flex-grow flex items-center justify-center w-full max-w-md">
        <div className="space-y-8 w-full">
          <div className="relative h-[12rem] sm:h-[14rem] md:h-[16rem] lg:h-[18rem] flex items-center justify-center overflow-hidden">
            <div className={cn(
              "absolute w-full transition-all duration-500",
              showColor ? "translate-y-full opacity-0" : "translate-y-0 opacity-100",
              isAnimating && "scale-[0.95] rotate-3"
            )}>
              <div className="font-display text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] text-white text-center">
                {hours}
                <span className="animate-pulse">:</span>
                {minutes}
                <span className="animate-pulse">:</span>
                {seconds}
              </div>
            </div>
            <div className={cn(
              "absolute w-full transition-all duration-500",
              !showColor ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
              isAnimating && "scale-[1.05] -rotate-3"
            )}>
              <div className="font-display text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] text-white text-center break-all">
                {timeColor}
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleClick(false)}
              className={cn(
                "p-2 sm:p-3 rounded-full font-medium transition-all duration-300",
                !showColor ? "bg-white text-black scale-105" : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              <Clock size={24} />
            </button>
            <button
              onClick={() => handleClick(true)}
              className={cn(
                "p-2 sm:p-3 rounded-full font-medium transition-all duration-300",
                showColor ? "bg-white text-black scale-105" : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              <Palette size={24} />
            </button>
          </div>
        </div>
      </div>
      <footer className="w-full p-4 sm:p-6 text-center text-white text-sm sm:text-base">
        <p>Coloring time, one tick at a time 🎨⏰</p>
        <p className="mt-1 text-xs sm:text-sm">Crafted with passion by kiliczsh</p>
      </footer>
    </div>
  );
};

export default ColorClock;
