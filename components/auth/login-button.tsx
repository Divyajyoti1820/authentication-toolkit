"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push(`/auth/login`);
  };

  if (mode === "modal") {
    return (
      <span>
        <h1 className="w-full text-sm  text-center">
          TODO : Modal Implementation
        </h1>
      </span>
    );
  }

  return (
    <span className="cursor-pointer" onClick={onClickHandler}>
      {children}
    </span>
  );
};
