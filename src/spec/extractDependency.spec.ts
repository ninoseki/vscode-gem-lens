import { extractDependency } from "../extractDependency";

test("extractDependency", () => {
  const gemspecLine = '  spec.add_development_dependency "bundler", "~> 2.0"';
  const gemspecDependecy = extractDependency(gemspecLine);

  expect(gemspecDependecy).toBeDefined();
  if (gemspecDependecy) {
    expect(gemspecDependecy.name).toBe("bundler");
    expect(gemspecDependecy.requirements).toBe("~> 2.0");
  }

  const gemLine = `  gem "pry", "~> 0.12"`;
  const gemDependecy = extractDependency(gemLine);
  expect(gemDependecy).toBeDefined();
  if (gemDependecy) {
    expect(gemDependecy.name).toBe("pry");
    expect(gemDependecy.requirements).toBe("~> 0.12");
  }
});
