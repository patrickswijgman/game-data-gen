import { ArrayType, FieldType } from "../consts.js";
import { addHeader, capitalize, getTypeName } from "./utils.js";

export function addGroup(header: string, fields: Array<string>, output: Array<string>) {
  const [name] = header.split(" ");

  addHeader(`${name} (Group)`, output);

  for (const field of fields) {
    addFieldDefinition(field, output);
  }

  for (const field of fields) {
    addFieldSetFunction(name, field, output);
  }

  for (const field of fields) {
    addFieldZeroFunction(name, field, output);
  }

  addZeroFunction(name, fields, output);
}

function addFieldDefinition(field: string, output: Array<string>) {
  const [fieldName, fieldType, fieldArrayType, fieldArrayLength = ""] = field.split(" ");
  switch (fieldType) {
    case FieldType.STRING:
      output.push(`export let ${fieldName} = ""`);
      break;
    case FieldType.BOOLEAN:
      output.push(`export let ${fieldName} = false`);
      break;
    case FieldType.NUMBER:
      output.push(`export let ${fieldName} = 0`);
      break;
    case FieldType.ARRAY:
      switch (fieldArrayType) {
        case ArrayType.STRING:
          output.push(`export const ${fieldName} = new Array<string>(${fieldArrayLength}).fill("")`);
          break;
        case ArrayType.BOOLEAN:
          output.push(`export const ${fieldName} = new Array<boolean>(${fieldArrayLength}).fill(false)`);
          break;
        case ArrayType.INT_8:
          output.push(`export const ${fieldName} = new Int8Array(${fieldArrayLength})`);
          break;
        case ArrayType.INT_16:
          output.push(`export const ${fieldName} = new Int16Array(${fieldArrayLength})`);
          break;
        case ArrayType.INT_32:
          output.push(`export const ${fieldName} = new Int32Array(${fieldArrayLength})`);
          break;
        case ArrayType.UINT_8:
          output.push(`export const ${fieldName} = new Uint8Array(${fieldArrayLength})`);
          break;
        case ArrayType.UINT_16:
          output.push(`export const ${fieldName} = new Uint16Array(${fieldArrayLength})`);
          break;
        case ArrayType.UINT_32:
          output.push(`export const ${fieldName} = new Uint32Array(${fieldArrayLength})`);
          break;
        case ArrayType.FLOAT_32:
          output.push(`export const ${fieldName} = new Float32Array(${fieldArrayLength})`);
          break;
        case ArrayType.FLOAT_64:
          output.push(`export const ${fieldName} = new Float64Array(${fieldArrayLength})`);
          break;
      }
      break;
  }
}

function addFieldSetFunction(name: string, field: string, output: Array<string>) {
  const [fieldName, fieldType, fieldArrayType] = field.split(" ");
  switch (fieldType) {
    case FieldType.STRING:
    case FieldType.BOOLEAN:
    case FieldType.NUMBER:
      output.push("");
      output.push(`/** Set the value of the ${fieldName} field within the ${name} group. */`);
      output.push(`export function set${capitalize(fieldName)}(v: ${getTypeName(fieldType, fieldArrayType)}) {`);
      output.push(`  ${fieldName} = v`);
      output.push("}");
  }
}

function addFieldZeroFunction(name: string, field: string, output: Array<string>) {
  const [fieldName, fieldType, fieldArrayType] = field.split(" ");
  output.push("");
  output.push(`/** Zero the ${fieldName} field within the ${name} group. */`);
  output.push(`export function zero${capitalize(fieldName)}() {`);
  zeroField(fieldName, fieldType, fieldArrayType, output);
  output.push("}");
}

function addZeroFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Zero all fields within the ${name} group. */`);
  output.push(`export function zero${capitalize(name)}() {`);
  for (const field of fields) {
    const [fieldName, fieldType, fieldArrayType] = field.split(" ");
    zeroField(fieldName, fieldType, fieldArrayType, output);
  }
  output.push("}");
}

function zeroField(name: string, type: string, arrayType: string, output: Array<string>) {
  switch (type) {
    case FieldType.STRING:
      output.push(`  ${name} = ""`);
      break;
    case FieldType.BOOLEAN:
      output.push(`  ${name} = false`);
      break;
    case FieldType.NUMBER:
      output.push(`  ${name} = 0`);
      break;
    case FieldType.ARRAY:
      switch (arrayType) {
        case ArrayType.STRING:
          output.push(`  ${name}.fill("")`);
          break;
        case ArrayType.BOOLEAN:
          output.push(`  ${name}.fill(false)`);
          break;
        case ArrayType.INT_8:
        case ArrayType.INT_16:
        case ArrayType.INT_32:
        case ArrayType.UINT_8:
        case ArrayType.UINT_16:
        case ArrayType.UINT_32:
        case ArrayType.FLOAT_32:
        case ArrayType.FLOAT_64:
          output.push(`  ${name}.fill(0)`);
          break;
      }
      break;
  }
}
