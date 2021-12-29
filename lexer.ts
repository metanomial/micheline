import { MichelineSyntaxError } from "./errors.ts";
import { MichelineNode, MichelineString } from "./micheline.ts";

interface Location {
  row: number;
  line: number;
}

interface EmptyToken extends Location {
  type:
    | "semi"
    | "open_paren"
    | "close_paren"
    | "open_brace"
    | "close_brace";
}

interface StringToken extends Location {
  type:
    | "string"
    | "bytes"
    | "int"
    | "ident"
    | "annot"
    | "comment"
    | "eol_comment";
  value: string;
}

type Token = EmptyToken | StringToken;

// Lex states
enum State {
  Node = "_lexNode",
  String = "_lexString",
  CharacterEscape = "_lexCharEscape",
}

/**
 * Micheline parser
 */
export class Parser {
  private _line = 1;
  private _column = 0;
  private _state = State.Node;
  private _nodeStack: MichelineNode[] = [];

  private get _context() {
    return this._nodeStack.at(-1);
  }

  public update(source: string) {
    for (const char of source) {
      switch (char) {
        case "\n":
          this._column = 0;
          ++this._line;
          break;
        default:
          ++this._column;
      }
      this[this._state](char);
    }
  }

  public end() {
    this[this._state](null);
    return this._nodeStack.at(0);
  }

  private _throw(message: string): never {
    throw new MichelineSyntaxError(message, this._line, this._column);
  }

  private [State.Node](char: string | null) {
    switch (char) {
      case '"':
        this._state = State.String;
        this._nodeStack.push(new MichelineString());
        break;
      case " ":
      case "\n":
        break;
      case null:
        if (this._contextStack.length > 1) {
          this._throw("Unexpected end of input");
        }
        break;
      default:
        this._throw("Unexpected symbol");
        // falls through
    }
  }

  private [State.String](char: Char) {
    switch (char) {
      case '"':
        this._contextStack.push(new MichelineString(this._nodeValue));
        this._state = State.Node;
        break;
      case "\\":
        this._state = State.CharacterEscape;
        break;
      default:
        this._nodeValue += char;
        // falls through
      case null:
        this._throw("Unexpected end of input in string");
        // falls through
      case "\r":
      case "\n":
        this._throw("Unescaped newline in string");
    }
  }

  private [State.CharacterEscape](char: Char) {
    switch (char) {
      case '"':
      case "\\":
        this._nodeValue += char;
        break;
      case "n":
        this._nodeValue += "\n";
        break;
      case "r":
        this._nodeValue += "\r";
        break;
      case "t":
        this._nodeValue += "\t";
        break;
      case "b":
        this._nodeValue += "\b";
        break;
      case null:
        this._throw("Unexpected end of input in character escape");
        // falls through
      case "\r":
      case "\n":
        this._throw("Unexpected newline in character escape");
        // falls through
      default:
        this._throw("Undefined escape character");
    }
    this._state = State.String;
  }
}
