"use client";

import { cn } from "@/lib/utils";
import { font } from "@/app/page";

interface HeaderProps {
  label?: string;
}

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
