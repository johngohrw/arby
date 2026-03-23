import clsx from "clsx";
import type { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<"button"> {}

export const Button = ({ children, className, ...rest }: ButtonProps) => (
  <button
    className={clsx(
      "bg-indigo-500 text-white px-3 py-1.5 font-semibold rounded-lg min-w-16 text-sm cursor-pointer disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed",
      className
    )}
    {...rest}
  >
    {children}
  </button>
);
