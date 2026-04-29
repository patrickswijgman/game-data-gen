import { ArrayType, FieldType, Type } from "../consts.js";

export function addHeader(name: string, output: Array<string>) {
  output.push("");
  output.push("/*");
  output.push(` * ${"-".repeat(50)}`);
  output.push(` * ${name}`);
  output.push(` * ${"-".repeat(50)}`);
  output.push(" */");
  output.push("");
}

/**
 * Get the name based on the type of the data structure.
 */
export function getTypeName(type: string, arrayType: string = ""): string {
  switch (type) {
    case Type.SOA:
      return "structure of arrays";
    case Type.AOS:
      return "array of structures";
    case Type.STRUCT:
      return "struct";
    case Type.GROUP:
      return "group";
    case FieldType.STRING:
      return "string";
    case FieldType.BOOLEAN:
      return "boolean";
    case FieldType.NUMBER:
      return "number";
    case FieldType.ARRAY: {
      switch (arrayType) {
        case ArrayType.STRING:
          return "Array<string>";
        case ArrayType.BOOLEAN:
          return "Array<boolean>";
        case ArrayType.INT_8:
          return "Int8Array";
        case ArrayType.INT_16:
          return "Int16Array";
        case ArrayType.INT_32:
          return "Int32Array";
        case ArrayType.UINT_8:
          return "Uint8Array";
        case ArrayType.UINT_16:
          return "Uint16Array";
        case ArrayType.UINT_32:
          return "Uint32Array";
        case ArrayType.FLOAT_32:
          return "Float32Array";
        case ArrayType.FLOAT_64:
          return "Float64Array";
        default:
          return `Array<${capitalize(arrayType)}>`;
      }
    }
    default:
      return capitalize(type);
  }
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string) {
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
}
