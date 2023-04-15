import { Dependency } from "@/types";

export const gemfileLockRegexp = /\b.+\(.+\)/;

export function gemfileLockMapper(line: string): Dependency | undefined {
  const parts = line.trim().split(" ");
  const name = parts.shift() || "";
  const requirements = parts.join(" ").trim().slice(1, -1);

  return { name, requirements };
}
