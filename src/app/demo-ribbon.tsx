"use client";

import { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoRibbonProps {
  isDemo: boolean;
  startDemo: () => void;
  exitDemo: () => void;
}

export function DemoRibbon({ isDemo, startDemo, exitDemo }: DemoRibbonProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Add client-side only rendering control
  const [isMounted, setIsMounted] = useState(false);

  // Only run once on client after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything during SSR or before hydration is complete
  if (!isMounted) return null;

  // Now we only render on the client side after hydration
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="flex w-full max-w-screen-xl items-center justify-between rounded-t-lg bg-zinc-800 px-4 py-3 text-white shadow-lg animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-white" />
          {isDemo ? (
            <span className="text-sm">
              You are in demo mode, changes you make will not persist. You can
              quit anytime here
            </span>
          ) : (
            <span className="text-sm">Want to see a quick app demo?</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isDemo ? (
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-zinc-700"
              onClick={exitDemo}
            >
              Exit Demo
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-zinc-700 text-white"
              onClick={startDemo}
            >
              Enter Demo Mode
            </Button>
          )}

          {!isDemo && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
