"use client";

import { ButtonProps } from "./ui/button";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ChangeThemeButtonProps extends ButtonProps {
  className?: string;
  iconSize?: number;
}
export default function ChangeThemeButton({
  className,
  iconSize = 20,
  ...props
}: ChangeThemeButtonProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNextTheme = (currentTheme: string) => {
    switch (currentTheme) {
      case "light":
        return "dark";
      case "dark":
        return "light";
      default:
        return "dark";
    }
  };
  if (!mounted) return null;

  return (
    <button
      dir="ltr"
      aria-label="Change theme"
      variant={"ghost"}
      title={"Change theme"}
      onClick={() => setTheme(getNextTheme(theme as string))}
      className={cn(
        "relative flex h-10 items-center justify-between gap-x-4 rounded-full border px-[9px] transition-all duration-200 ease-in-out",
        className
      )}
      {...props}
      suppressHydrationWarning
    >
      <div
        className={cn(
          "absolute aspect-square h-full rounded-full p-0.5 transition-all duration-500",
          theme === "dark" ? "right-0" : "left-0"
        )}
      >
        <div className="aspect-square h-full rounded-full bg-foreground transition-all duration-500" />
      </div>
      <Sun size={iconSize} className="z-10 rounded-full text-white" />
      <Moon size={iconSize} className="z-10 rounded-full text-black" />
    </button>
  );
}
