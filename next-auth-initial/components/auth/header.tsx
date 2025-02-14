"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

interface HeaderProps {
  label?: string;
}

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1
        className={cn("text-3xl font-semibold drop-shadow-lg", font.className)}
      >
        🔐 Authentication Toolkit
      </h1>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};
