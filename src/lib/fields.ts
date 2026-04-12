import { ArrayType, FieldType } from "../consts.js";
import { capitalize, getName } from "./utils.js";

export function addFieldDefinition(field: string, baseLength: string, output: Array<string>) {
  const [fieldName, fieldType, fieldArrayType, fieldLength] = field.split(" ");
  const fieldArrayLength = baseLength || fieldLength || "";

  switch (fieldType) {
    case FieldType.STRING:
      output.push(`export let ${fieldName} = ""`);
      break;
    case FieldType.NUMBER:
      output.push(`export let ${fieldName} = 0`);
      break;
    case FieldType.BOOLEAN:
      output.push(`export let ${fieldName} = false`);
      break;
    case FieldType.ARRAY:
      {
        switch (fieldArrayType) {
          case ArrayType.STRING:
            output.push(`export let ${fieldName} = new Array<string>(${fieldArrayLength})${fieldArrayLength ? '.fill("")' : ""}`);
            break;
          case ArrayType.NUMBER:
            output.push(`export let ${fieldName} = new Array<number>(${fieldArrayLength})${fieldArrayLength ? ".fill(0)" : ""}`);
            break;
          case ArrayType.BOOLEAN:
            output.push(`export let ${fieldName} = new Array<boolean>(${fieldArrayLength})${fieldArrayLength ? ".fill(false)" : ""}`);
            break;
        }
      }
      break;
    case FieldType.SET:
      output.push(`export let ${fieldName} = new Set<${getName(fieldArrayType)}>()`);
      break;
    default:
      output.push(`export let ${fieldName} = create${capitalize(fieldType)}()`);
  }
}

export function addFieldSetFunction(name: string, type: string, field: string, output: Array<string>) {
  const [fieldName, fieldType, fieldArrayType] = field.split(" ");
  output.push("");
  output.push(`/** Set the value of the ${fieldName} field within the ${name} ${getName(type)}. */`);
  output.push(`export function set${capitalize(fieldName)}(value: ${getName(fieldType, fieldArrayType)}) {`);
  output.push(`  ${fieldName} = value`);
  output.push("}");
}

export function addFieldZeroFunction(name: string, type: string, field: string, baseLength: string, output: Array<string>) {
  const [fieldName, fieldType, fieldArrayType, fieldLength] = field.split(" ");
  const length = baseLength || fieldLength || "";
  output.push("");
  output.push(`/** Zero the ${fieldName} field within the ${name} ${getName(type)}. */`);
  output.push(`export function zero${capitalize(fieldName)}() {`);
  zeroField(fieldName, fieldType, fieldArrayType, length, output);
  output.push("}");
}

export function addZeroFunction(name: string, type: string, fields: Array<string>, baseLength: string, output: Array<string>) {
  output.push("");
  output.push(`/** Zero all fields within the ${name} ${getName(type)}. */`);
  output.push(`export function zero${capitalize(name)}Data() {`);
  for (const field of fields) {
    const [fieldName, fieldType, fieldArrayType, fieldLength] = field.split(" ");
    const length = baseLength || fieldLength || "";
    zeroField(fieldName, fieldType, fieldArrayType, length, output);
  }
  output.push("}");
}

function zeroField(name: string, type: string, arrayType: string, length: string, output: Array<string>) {
  switch (type) {
    case FieldType.STRING:
      output.push(`  ${name} = ""`);
      break;
    case FieldType.NUMBER:
      output.push(`  ${name} = 0`);
      break;
    case FieldType.BOOLEAN:
      output.push(`  ${name} = false`);
      break;
    case FieldType.ARRAY:
      {
        switch (arrayType) {
          case ArrayType.STRING:
            output.push(`  ${name}.${length ? 'fill("")' : "length = 0"}`);
            break;
          case ArrayType.NUMBER:
            output.push(`  ${name}.${length ? "fill(0)" : "length = 0"}`);
            break;
          case ArrayType.BOOLEAN:
            output.push(`  ${name}.${length ? "fill(false)" : "length = 0"}`);
            break;
        }
      }
      break;
    case FieldType.SET:
      output.push(`  ${name}.clear()`);
      break;
    default:
      output.push(`  zero${capitalize(type)}(${name})`);
  }
}

export function addFieldMaxLengthConstant(name: string, length: string, output: Array<string>) {
  output.push(`export const MAX_${name.toUpperCase()}_COUNT = ${length}`);
  output.push("");
}
