import * as moxios from "moxios";
import { Gem } from "../gem";

describe("Gem", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("initialize", () => {
    const gem = new Gem("rails", "~> 1.0");
    expect(gem.name).toBe("rails");
    expect(gem.requirements).toBe("~> 1.0");
  });

  test("info", async () => {
    moxios.stubRequest("https://rubygems.org/api/v1/gems/rails.json", {
      response: {
        name: "rails",
        downloads: 7528417,
        version: "3.2.1",
        authors: "David Heinemeier Hansson",
        info: "Ruby on Rails is a full-stack web framework",
      },
      status: 200,
    });

    const gem = new Gem("rails", "~> 1.0");
    const details = await gem.details();
    expect(details).toBeDefined();
    if (details) {
      expect(details.version).toBe("3.2.1");
      expect(details.info).toBe("Ruby on Rails is a full-stack web framework");
    }
  });
});
