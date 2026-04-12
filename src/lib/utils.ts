import { FieldType, Type } from "../consts.js";

/**
 * Get the name based on the type of the data structure.
 */
export function getName(type: string, arrayType: string = ""): string {
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
      return `Array<${getName(arrayType)}>`;
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
