import { extractDependency } from "../extractDependency";

test("extractDependency", () => {
  const line = '  spec.add_development_dependency "bundler", "~> 2.0"';
  const dependecy = extractDependency(line);

  expect(dependecy).toBeDefined();
  if (dependecy) {
    expect(dependecy.name).toBe("bundler");
    expect(dependecy.requirements).toBe("~> 2.0");
  }
});
