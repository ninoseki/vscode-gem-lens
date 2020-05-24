import { Dependency } from "./types";

function quoteMapper(line: string): string {
  const quoteIndex = line.indexOf("'");
  const start = quoteIndex >= 0 ? quoteIndex : line.indexOf('"') || 0;
  return line.slice(start);
}

const dependencyRegexp = /\bgem( |"|')|\w+\.(add_development_dependency|add_runtime_dependency|add_dependency)/;

function isDependecy(line: string): boolean {
  return dependencyRegexp.test(line);
}

export function extractDependency(line: string): Dependency | undefined {
  if (!isDependecy(line.trim())) {
    return undefined;
  }

  const mapped = quoteMapper(line);
  const parts = mapped
    .trim()
    .split(",")
    .map((s) => s.trim().replace(/'|"/g, ""));

  if (parts.length >= 1) {
    const name = parts[0];
    const requirements = parts[1];
    return { name: name, requirements: requirements };
  }

  return undefined;
}
