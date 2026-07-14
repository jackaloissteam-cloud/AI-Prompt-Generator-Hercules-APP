import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string;
  size?: string;
};

export function Button({
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-md border px-4 py-2 font-medium transition hover:opacity-90 disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
