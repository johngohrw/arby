import type { ComponentProps } from "react";
import { cssOf, varOf } from "../style-helpers";
import { s } from "../utility-styles";
import type { CSSObject } from "@emotion/react";

// expose certain values as theme variables
export const badgeThemeVars = {
  ["color-badge-fg"]: "#f9f9f9",
} as const;

const defaultStyle = {
  ...s.inlineFlex,
  ...s.flexCenter,
  background: varOf("color-primary"),
  color: varOf("color-badge-fg"),
  borderRadius: "1rem", // full roundedness
  padding: "0.3rem 0.6rem",
  fontSize: `calc(${varOf("root-font-scale")} * 0.82)`,
  fontWeight: 600,
  lineHeight: 1,
  textWrap: "nowrap",
} satisfies CSSObject;

const squaredStyle = {
  borderRadius: "0.2rem",
};

export const Badge = ({
  children,
  className,
  squared,
  ...rest
}: ComponentProps<"span"> & { squared?: boolean }) => {
  const style = cssOf(defaultStyle, squared && squaredStyle);

  return (
    <span className={`${style} ${className}`} {...rest}>
      {children}
    </span>
  );
};

// ("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground");
