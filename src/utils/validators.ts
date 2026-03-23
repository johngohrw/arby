import type { ValueFormatterParams } from "ag-grid-community";
import { VALIDATION_MESSAGES } from "../constants/index.ts";

export function validateTranslationKey(
  params: ValueFormatterParams<any, string>
): string[] | null {
  const { value } = params;
  
  if (!value) {
    return [VALIDATION_MESSAGES.noValue];
  }

  if (/[^A-Za-z0-9_@]/.test(value)) {
    return [VALIDATION_MESSAGES.invalidCharacters];
  }

  if (/^[A-Z]/.test(value)) {
    return [VALIDATION_MESSAGES.uppercaseFirst];
  }

  return null;
}

export function formatTranslationKey(
  params: ValueFormatterParams<any, string>
): string {
  if (!params.value) {
    return "";
  }
  const re = /[^A-Za-z0-9_@]+/g;
  return params.value.replace(re, "");
}
