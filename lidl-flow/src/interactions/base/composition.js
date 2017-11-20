import {
  type Activation,
  type Boolean,
  type Number,
  type Text,
  type Value
} from "../../types";
import {
  type Input,
  type Output,
  type Composite,
  type Interface
} from "../../interfaces";

/**
 * Compose
 * @param elements The interface to compose
 */
export function composition(elements): Composite {
  return {
    type: "composite",
    elements
  };
}
