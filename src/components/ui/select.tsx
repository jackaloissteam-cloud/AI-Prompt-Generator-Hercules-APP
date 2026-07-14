import type { ReactNode, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children?: ReactNode;
};

export function Select({ children, ...props }: SelectProps) {
  return <select {...props}>{children}</select>;
}

export function SelectTrigger({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <div className={`rounded-md border px-3 py-2 ${className}`}>{children}</div>;
}

export function SelectValue({
  placeholder,
}: {
  placeholder?: string;
}) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children?: ReactNode;
}) {
  return <option value={value}>{children}</option>;
}
