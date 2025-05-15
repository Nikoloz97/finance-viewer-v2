"use client";

import { useDemo } from "@/demo-context";
import { DemoService } from "../services/demo-service";

export function UseDemoService() {
  const { isDemo, demoData, updateDemoData } = useDemo();

  return new DemoService(isDemo, demoData, updateDemoData);
}
