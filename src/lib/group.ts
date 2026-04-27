import { ArrayType, FieldType } from "../consts.js";
import { addHeader, capitalize, getTypeName } from "./utils.js";

export function addGroup(header: string, fields: Array<string>, output: Array<string>) {
  const [name, _, baseLength] = header.split(" ");

  addHeader(`${name} (Group)`, output);

  for (const field of fields) {
    addFieldDefinition(field, baseLength, output);
  }

  for (const field of fields) {
    addFieldSetFunction(name, field, output);
  }

  for (const field of fields) {
    addFieldZeroFunction(name, field, baseLength, output);
  }

  addZeroFunction(name, fields, baseLength, output);
}

function addFieldDefinition(field: string, baseLength: string, output: Array<string>) {
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
          default:
            output.push(`export let ${fieldName} = new Array<${getTypeName(fieldArrayType)}>()`);
        }
      }
      break;
    default:
      output.push(`export let ${fieldName} = create${capitalize(fieldType)}()`);
  }
}

function addFieldSetFunction(name: string, field: string, output: Array<string>) {
  const [fieldName, fieldType, fieldArrayType] = field.split(" ");
  output.push("");
  output.push(`/** Set the value of the ${fieldName} field within the ${name} group. */`);
  output.push(`export function set${capitalize(fieldName)}(value: ${getTypeName(fieldType, fieldArrayType)}) {`);
  output.push(`  ${fieldName} = value`);
  output.push("}");
}

function addFieldZeroFunction(name: string, field: string, baseLength: string, output: Array<string>) {
  const [fieldName, fieldType, fieldArrayType, fieldLength] = field.split(" ");
  const length = baseLength || fieldLength || "";
  output.push("");
  output.push(`/** Zero the ${fieldName} field within the ${name} group. */`);
  output.push(`export function zero${capitalize(fieldName)}() {`);
  zeroField(fieldName, fieldType, fieldArrayType, length, output);
  output.push("}");
}

function addZeroFunction(name: string, fields: Array<string>, baseLength: string, output: Array<string>) {
  output.push("");
  output.push(`/** Zero all fields within the ${name} group. */`);
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
          default:
            output.push(`  ${name}.length = 0`);
        }
      }
      break;
    default:
      output.push(`  zero${capitalize(type)}(${name})`);
  }
}
