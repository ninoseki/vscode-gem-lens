import { Dependency } from "@/types";

export function quoteMapper(line: string): string {
  const quoteIndex = line.indexOf("'");
  const start = quoteIndex >= 0 ? quoteIndex : line.indexOf('"') || 0;
  return line.slice(start);
}

export function extractDependency(
  line: string,
  fn: (s: string) => Dependency | undefined,
  minLength = 2
): Dependency | undefined {
  const dep = fn(line);
  if (!dep) {
    return undefined;
  }

  if (dep.name.length < minLength) {
    return undefined;
  }

  return dep;
}
