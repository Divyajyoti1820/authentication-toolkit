import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { LoginButton } from "@/components/auth/login-button";

export const font = Poppins({ subsets: ["latin"], weight: ["600"] });

const HomePage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500 to-emerald-800">
      <div className="w-full space-y-6">
        <h1
          className={cn(
            "text-6xl w-full text-center font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐Authentication Toolkit
        </h1>
        <p
          className={cn(
            "w-full text-lg text-center text-white",
            font.className
          )}
        >
          Auth V5 authentication practical implementation
        </p>
        <div className="w-full flex items-center gap-2 justify-center">
          <LoginButton>
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center justify-center"
            >
              <LogIn className="h-4 w-4 mr-2" />
              <p>Sign In</p>
            </Button>
          </LoginButton>

          <Button
            variant="link"
            asChild
            size="sm"
            className="flex items-center justify-center text-white"
          >
            <Link
              href="https://authjs.dev/getting-started/installation?framework=next.js"
              target="_blank"
            >
              Auth V5 Docs
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
