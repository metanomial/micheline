import { Lexer } from "./lexer.ts";
import { MichelineString } from "./micheline.ts";

const lexer = new Lexer();

lexer.update(`
  "I said,
  \\"hello!\\""
`);
const node = lexer.end();
console.log((node.nodes[0] as MichelineString).value);
