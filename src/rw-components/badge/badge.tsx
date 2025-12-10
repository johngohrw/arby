import type { ComponentProps } from "react";
import { cssOf, varOf } from "../style-helpers";
import { s } from "../utility-styles";

export const badgeStyles = cssOf({
  background: varOf("color-primary"),
  ...s.inlineFlex,
  ...s.flexCenter,
  borderRadius: "48px",
  padding: "0.2rem 0.7rem",
  lineHeight: 1,
  fontWeight: 600,
  fontSize: `calc(${varOf("root-font-scale")} * 0.88)`,
});

export const Badge = ({
  children,
  className,
  ...rest
}: ComponentProps<"span">) => {
  return (
    <span className={`${badgeStyles} ${className}`} {...rest}>
      {children}
    </span>
  );
};

// ("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground");
