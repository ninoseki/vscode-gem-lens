import { Gem } from "../gem";

describe("Gem", () => {
  test("initialize", () => {
    const gem = new Gem("rails", "~> 1.0");
    expect(gem.name).toBe("rails");
    expect(gem.requirements).toBe("~> 1.0");
  });

  test("info", async () => {
    const gem = new Gem("rails", "~> 1.0");
    const details = await gem.details();
    expect(details).toBeDefined();
    if (details) {
      const expectedInfo =
        "Ruby on Rails is a full-stack web framework optimized for programmer happiness and sustainable productivity. It encourages beautiful code by favoring convention over configuration.";
      expect(details.info).toBe(expectedInfo);
    }
  });
});
