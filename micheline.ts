import { stringify } from "./_hex.ts";

export abstract class MichelineNode {
  readonly line = line;
  constructor(line, column) {
    this.line;
  }
  public abstract toJSON(): unknown;
}

/**
 * A Micheline integer node.
 */
export class MichelineInteger extends MichelineNode {
  private _value: bigint;

  /**
   * Integer value
   */
  public get value(): bigint {
    return this._value;
  }
  public set value(integer: number | bigint) {
    this._value = BigInt(integer);
  }

  /**
   * @param integer Integer value
   */
  constructor(integer: number | bigint) {
    super();
    this._value = BigInt(integer);
  }

  public toJSON() {
    return {
      int: String(this.value),
    };
  }
}

/**
 * A Micheline string node.
 */
export class MichelineString extends MichelineNode {
  /**
   * String value
   */
  public value: string;

  /**
   * @param value String value
   */
  constructor(value: string = "") {
    super();
    this.value = value;
  }

  public toJSON() {
    return {
      string: String(this.value),
    };
  }
}

/**
 * A Micheline bytes node.
 */
export class MichelineBytes extends MichelineNode {
  /**
   * Byte array
   */
  public array: Uint8Array;

  /**
   * @param bytes Byte array
   */
  constructor(bytes: Uint8Array) {
    super();
    this.array = bytes;
  }

  public toJSON() {
    return {
      bytes: stringify(this.array),
    };
  }
}

/**
 * A sequence of Micheline nodes.
 */
export class MichelineSequence extends MichelineNode {
  /**
   * Child nodes
   */
  public nodes: MichelineNode[];

  /**
   * @param nodes Child nodes
   */
  constructor(...nodes: MichelineNode[]) {
    super();
    this.nodes = nodes;
  }

  public toJSON(): MichelineNode[] {
    return this.nodes;
  }
}

/**
 * Annotation prefix marks
 */
// export type AnnotationPrefix = "@" | ":" | "$" | "&" | "%" | "!" | "?";

/**
 * Annotation of a Micheline primitive application.
 */
// export class MichelineAnnotation {
//   readonly prefix: string;
//   readonly name: string;

//   /**
//    * @param prefix Prefix mark
//    * @param name Annotation name
//    */
//   constructor(prefix: string, name: string) {
//     this.prefix = prefix;
//     this.name = name;
//   }
// }

/**
 * A Micheline primitive application node.
 */
// export class MichelinePrimitiveApplication extends MichelineNode {
//   readonly primitive: string;
//   readonly arguments: MichelineNode[];

//   /**
//    * @param primitive Primitive symbol
//    * @param args Arguments
//    */
//   constructor(primitive: string, args: MichelineNode[]) {
//     super();
//     this.primitive = primitive;
//     this.arguments = args;
//   }
// }
