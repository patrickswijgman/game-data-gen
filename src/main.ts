import fs from "fs-extra";

const enum Type {
  SOA = "soa",
}

const enum FieldType {
  STRING = "string",
  BOOLEAN = "boolean",
  NUMBER = "number",
  ARRAY = "array",
}

const enum ArrayType {
  STRING = "string",
  BOOLEAN = "boolean",
  NUMBER = "number",
  INT8 = "int8",
  INT16 = "int16",
  INT32 = "int32",
  UINT8 = "uint8",
  UINT16 = "uint16",
  UINT32 = "uint32",
  FLOAT32 = "float32",
  FLOAT64 = "float64",
}

const inputFile = process.argv[2];
const outputFile = process.argv[3] || `${inputFile}.ts`;
const input = fs.readFileSync(inputFile, "utf-8");
const output: Array<string> = [];

output.push("/*");
output.push(` * Generated with game-data-gen on ${new Date().toLocaleString()}. DO NOT MODIFY THIS FILE!`);
output.push(" */");

const blocks = input.trim().split("\n\n");

for (const block of blocks) {
  const fields = block.split("\n");
  const header = fields.shift();

  if (!header) continue;

  const [name, type, baseLength] = header.split(" ");

  output.push("");
  output.push("/*");
  output.push(` * ${"-".repeat(50)}`);
  output.push(` * ${name}`);
  output.push(` * ${"-".repeat(50)}`);
  output.push(" */");
  output.push("");

  for (const field of fields) {
    const [fieldName, fieldType, fieldArrayType, fieldLength] = field.split(" ");
    const length = baseLength || fieldLength || "";

    switch (fieldType) {
      case FieldType.ARRAY:
        {
          switch (fieldArrayType) {
            case ArrayType.INT8:
              output.push(`export const ${fieldName} = new Int8Array(${length})`);
              break;
            case ArrayType.INT16:
              output.push(`export const ${fieldName} = new Int16Array(${length})`);
              break;
            case ArrayType.INT32:
              output.push(`export const ${fieldName} = new Int32Array(${length})`);
              break;
            case ArrayType.UINT8:
              output.push(`export const ${fieldName} = new Uint8Array(${length})`);
              break;
            case ArrayType.UINT16:
              output.push(`export const ${fieldName} = new Uint16Array(${length})`);
              break;
            case ArrayType.UINT32:
              output.push(`export const ${fieldName} = new Uint32Array(${length})`);
              break;
            case ArrayType.FLOAT32:
              output.push(`export const ${fieldName} = new Float32Array(${length})`);
              break;
            case ArrayType.FLOAT64:
              output.push(`export const ${fieldName} = new Float64Array(${length})`);
              break;
            case ArrayType.STRING:
              output.push(`export const ${fieldName} = new Array<string>(${length})${length ? '.fill("")' : ""}`);
              break;
            case ArrayType.BOOLEAN:
              output.push(`export const ${fieldName} = new Array<boolean>(${length})${length ? ".fill(false)" : ""}`);
              break;
            case ArrayType.NUMBER:
              output.push(`export const ${fieldName} = new Array<number>(${length})${length ? ".fill(0)" : ""}`);
              break;
            default:
              output.push(`export const ${fieldName} = new Array<${fieldArrayType}>(${length})`);
          }
        }
        break;
    }
  }

  // Zero data on index.
  if (type === Type.SOA) {
    output.push("");
    output.push(`/** Zero an index within the ${name} ${getTypeName(type)}. */`);
    output.push(`export function zero${capitalize(name)}(idx: number) {`);
    for (const field of fields) {
      const [fieldName, fieldType, fieldArrayType] = field.split(" ");
      zeroIndex(fieldName, fieldType, fieldArrayType, "idx");
    }
    output.push("}");
  }

  // Zero field data.
  for (const field of fields) {
    const [fieldName, fieldType, fieldArrayType, fieldLength] = field.split(" ");
    const length = baseLength || fieldLength || "";
    output.push("");
    output.push(`/** Zero the ${fieldName} field within the ${name} ${getTypeName(type)}. */`);
    output.push(`export function zero${capitalize(fieldName)}() {`);
    zeroField(fieldName, fieldType, fieldArrayType, length);
    output.push("}");
  }

  // Zero group data.
  output.push("");
  output.push(`/** Zero all fields within the ${name} ${getTypeName(type)}. */`);
  output.push(`export function zero${capitalize(name)}Data() {`);
  for (const field of fields) {
    const [fieldName, fieldType, fieldArrayType, fieldLength] = field.split(" ");
    const length = baseLength || fieldLength || "";
    zeroField(fieldName, fieldType, fieldArrayType, length);
  }
  output.push("}");
}

/**
 * Zero an index within a structure of arrays.
 */
function zeroIndex(name: string, type: string, arrayType: string, variableName: string) {
  switch (type) {
    case FieldType.ARRAY:
      {
        switch (arrayType) {
          case ArrayType.STRING:
            output.push(`  ${name}[${variableName}] = ""`);
            break;
          case ArrayType.BOOLEAN:
            output.push(`  ${name}[${variableName}] = false`);
            break;
          default:
            output.push(`  ${name}[${variableName}] = 0`);
        }
      }
      break;
  }
}

/**
 * Zero a field within a group.
 * If the field is an array and has a dynamic length it will be set to 0, otherwise it's filled with a zero-value.
 */
function zeroField(name: string, type: string, arrayType: string, length: string) {
  switch (type) {
    case FieldType.ARRAY:
      {
        switch (arrayType) {
          case ArrayType.STRING:
            output.push(`  ${name}.${length ? 'fill("")' : "length = 0"}`);
            break;
          case ArrayType.BOOLEAN:
            output.push(`  ${name}.${length ? "fill(false)" : "length = 0"}`);
            break;
          default:
            output.push(`  ${name}.${length ? "fill(0)" : "length = 0"}`);
        }
      }
      break;
  }
}

/**
 * Get the name based on the type of the data structure.
 */
function getTypeName(type: string) {
  switch (type) {
    case Type.SOA:
      return "Structure of Arrays";
    default:
      return "group";
  }
}

/**
 * Capitalize the first letter of a string.
 */
function capitalize(str: string) {
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
}

fs.writeFileSync(outputFile, output.join("\n"));
