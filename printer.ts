import { stringify } from "./_hex.ts";
import { Node } from "./nodes.ts";

export class Printer {
  print(node: Node): string {
    switch (typeof node) {
      case "string":
        return `"${node}"`;
      case "bigint":
        return node.toString();
      case "object":
        if (node instanceof Uint8Array) {
          return "0x" + stringify(node);
        } else if (Array.isArray(node)) {
          return `{ ${node.map((child) => this.print(child)).join(" ; ")} }`;
        }
        /* falls through */
      default:
        throw new TypeError();
    }
  }
}
