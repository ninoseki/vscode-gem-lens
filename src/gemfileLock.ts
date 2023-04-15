import { Dependency } from "@/types";

const dependencyRegexp = /\b.+\(.+\)/;

function isDependency(line: string): boolean {
  return dependencyRegexp.test(line);
}

export function extractDependency(line: string): Dependency | undefined {
  if (!isDependency(line.trim())) {
    return undefined;
  }

  const parts = line.trim().split(" ");

  if (parts.length >= 1) {
    const name = parts.shift() || "";
    const requirements = parts.join(" ").trim().slice(1, -1);
    return { name: name, requirements: requirements };
  }

  return undefined;
}
