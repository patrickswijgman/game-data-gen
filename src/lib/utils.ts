import { Type } from "../consts.ts";

/**
 * Get the name based on the type of the data structure.
 */
export function getTypeName(type: string) {
  switch (type) {
    case Type.SOA:
      return "structure of arrays";
    case Type.AOS:
      return "array of structures";
    case Type.STRUCT:
      return "struct";
    case Type.GROUP:
      return "group";
    default:
      return "???";
  }
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string) {
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
}
