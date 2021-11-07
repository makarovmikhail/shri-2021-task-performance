import { test } from "uvu";
import * as assert from "uvu/assert";

import { getFibonacciSum } from "../src/fibonacci.mjs";

test("Calculates right Fibonacci sum", () => {
    assert.equal(getFibonacciSum(5), 7);
    assert.equal(getFibonacciSum(6), 12);
    assert.equal(getFibonacciSum(7), 20);
});

test.run();
