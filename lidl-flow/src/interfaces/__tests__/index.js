import { isCompatible } from "../";

test("simple ", () => {
  expect(isCompatible({ type: "input" }, { type: "output" })).toBe(true);
  expect(isCompatible({ type: "output" }, { type: "output" })).toBe(false);
  expect(isCompatible({ type: "input" }, { type: "input" })).toBe(false);
  expect(isCompatible(null, { type: "input" })).toBe(true);
  expect(isCompatible(null, { type: "output" })).toBe(true);
  expect(isCompatible({ type: "input" }, null)).toBe(true);
  expect(isCompatible({ type: "output" }, null)).toBe(true);
});

test("composite ", () => {
  expect(
    isCompatible(
      { type: "composite", elements: { a: { type: "input" } } },
      { type: "composite", elements: { a: { type: "output" } } }
    )
  ).toBe(true);
  expect(
    isCompatible(
      { type: "composite", elements: { a: { type: "input" } } },
      { type: "composite", elements: { a: { type: "input" } } }
    )
  ).toBe(false);
  expect(
    isCompatible(
      { type: "composite", elements: { a: { type: "input" } } },
      { type: "composite", elements: { b: { type: "input" } } }
    )
  ).toBe(true);
  expect(
    isCompatible(
      {
        type: "composite",
        elements: { a: { type: "input" }, b: { type: "input" } }
      },
      { type: "composite", elements: { b: { type: "input" } } }
    )
  ).toBe(false);
  expect(
    isCompatible(
      {
        type: "composite",
        elements: { a: { type: "input" }, b: { type: "input" } }
      },
      { type: "composite", elements: { b: { type: "output" } } }
    )
  ).toBe(true);
  expect(
    isCompatible(
      {
        type: "composite",
        elements: { a: { type: "input" }, b: { type: "input" } }
      },
      {
        type: "composite",
        elements: { a: { type: "input" }, b: { type: "output" } }
      }
    )
  ).toBe(false);
  expect(
    isCompatible(
      {
        type: "composite",
        elements: { a: { type: "output" }, b: { type: "input" } }
      },
      {
        type: "composite",
        elements: { a: { type: "input" }, b: { type: "output" } }
      }
    )
  ).toBe(true);
});
