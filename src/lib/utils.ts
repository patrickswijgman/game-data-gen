import { FieldType, Type } from "../consts.js";

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
    case FieldType.NUMBER:
      return "number";
    case FieldType.BOOLEAN:
      return "boolean";
    case FieldType.ARRAY:
      return `Array<${getTypeName(arrayType)}>`;
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
