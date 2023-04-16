import { getGem } from "@/gem";

test("getGem", async () => {
  const gem = await getGem("rails");
  expect(gem).toBeDefined();
  expect(gem?.info).toBe(
    "Ruby on Rails is a full-stack web framework optimized for programmer happiness and sustainable productivity. It encourages beautiful code by favoring convention over configuration."
  );
});
