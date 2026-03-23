import clsx from "clsx";
import type { ComponentProps } from "react";

export interface TextInputBareProps extends ComponentProps<"input"> {}

export const TextInputBare = ({ className, ...rest }: TextInputBareProps) => (
  <input
    className={clsx(
      "border border-slate-400 rounded px-2 py-1 text-sm w-full",
      className
    )}
    {...rest}
  />
);

export interface TextInputProps extends TextInputBareProps {
  label: string;
  noLabel?: boolean;
}

export const TextInput = ({ label, noLabel, ...rest }: TextInputProps) => (
  <div className="flex flex-row items-center mb-2">
    {!noLabel && (
      <div className="font-medium mr-2 whitespace-nowrap text-sm w-48 shrink-0">
        {label}
      </div>
    )}
    <TextInputBare {...rest} />
  </div>
);
