import { assertEquals } from "./dev_deps.ts";
import { parse, stringify } from "./_hex.ts";

Deno.test({
  name: "Byte array to hexadecimal",
  fn() {
    const array = Array.from(
      { length: 100_000 },
      (_, i) => i % 256,
    );
    const buffer = Uint8Array.from(array);
    assertEquals(
      stringify(buffer),
      array.map((n) => n.toString(16).padStart(2, "0")).join(""),
    );
  },
});

Deno.test({
  name: "Hexadecimal to byte array",
  fn() {
    const array = Array.from(
      { length: 100_000 },
      (_, i) => i % 256,
    );
    const buffer = Uint8Array.from(array);
    assertEquals(
      stringify(buffer),
      array.map((n) => n.toString(16).padStart(2, "0")).join(""),
    );
  },
});
