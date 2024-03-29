import { Dependency } from "@/types";
import { quoteMapper } from "@/utils";

export const gemfileRegexp = /\bgem( |"|')/;

export function gemfileMapper(line: string): Dependency | undefined {
  const mapped = quoteMapper(line);
  const parts = mapped
    .trim()
    .split(",")
    .map((s) => s.trim().replace(/'|"/g, ""));

  if (parts.length >= 1) {
    const name = parts[0];
    const requirements = parts[1];
    return { name, requirements };
  }
  return undefined;
}
