export class MichelineSyntaxError extends Error {
  public readonly name = "MichelineSyntaxError";
  public readonly row: number;
  public readonly column: number;
  constructor(message: string, row: number, column: number) {
    super(message);
    this.row = row;
    this.column = column;
  }
}

export class HexadecimalSyntaxError extends Error {
  public readonly name = "HexadecimalSyntaxError";
  public readonly position: number;
  constructor(message: string, position: number) {
    super(message);
    this.position = position;
  }
}
