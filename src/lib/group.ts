import { ArrayType, FieldType } from "../consts.js";
import { addHeader, capitalize } from "./utils.js";

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
    addFieldPushFunction(name, field, output);
  }

  for (const field of fields) {
    addFieldPopFunction(name, field, output);
  }

  for (const field of fields) {
    addFieldZeroFunction(name, field, output);
  }

  addZeroFunction(name, fields, output);
}

function addFieldDefinition(field: string, output: Array<string>) {
  const [fieldName, fieldType, fieldArrayType, fieldArrayLength] = field.split(" ");
  switch (fieldType) {
    case FieldType.NUMBER:
      output.push(`export let ${fieldName} = 0`);
      break;
    case FieldType.ARRAY:
      switch (fieldArrayType) {
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
      output.push(`export let ${fieldName}Count = 0`);
      break;
  }
}

function addFieldSetFunction(name: string, field: string, output: Array<string>) {
  const [fieldName, fieldType] = field.split(" ");
  if (fieldType === FieldType.NUMBER) {
    output.push("");
    output.push(`/** Set the value of the ${fieldName} field within the ${name} group. */`);
    output.push(`export function set${capitalize(fieldName)}(v: number) {`);
    output.push(`  ${fieldName} = v`);
    output.push("}");
  }
}

function addFieldPushFunction(name: string, field: string, output: Array<string>) {
  const [fieldName, fieldType] = field.split(" ");
  if (fieldType === FieldType.ARRAY) {
    output.push("");
    output.push(`/** Push a value onto the ${fieldName} field within the ${name} group. */`);
    output.push(`export function push${capitalize(fieldName)}(v: number) {`);
    output.push(`  ${fieldName}[${fieldName}Count++] = v`);
    output.push("}");
  }
}

function addFieldPopFunction(name: string, field: string, output: Array<string>) {
  const [fieldName, fieldType] = field.split(" ");
  if (fieldType === FieldType.ARRAY) {
    output.push("");
    output.push(`/** Pop a value from the ${fieldName} field within the ${name} group. */`);
    output.push(`export function pop${capitalize(fieldName)}() {`);
    output.push(`  return ${fieldName}[--${fieldName}Count]`);
    output.push("}");
  }
}

function addFieldZeroFunction(name: string, field: string, output: Array<string>) {
  const [fieldName, fieldType] = field.split(" ");
  output.push("");
  output.push(`/** Zero the ${fieldName} field within the ${name} group. */`);
  output.push(`export function zero${capitalize(fieldName)}() {`);
  zeroField(fieldName, fieldType, output);
  output.push("}");
}

function addZeroFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Zero all fields within the ${name} group. */`);
  output.push(`export function zero${capitalize(name)}() {`);
  for (const field of fields) {
    const [fieldName, fieldType] = field.split(" ");
    zeroField(fieldName, fieldType, output);
  }
  output.push("}");
}

function zeroField(name: string, type: string, output: Array<string>) {
  switch (type) {
    case FieldType.NUMBER:
      output.push(`  ${name} = 0`);
      break;
    case FieldType.ARRAY:
      output.push(`  ${name}Count = 0`);
      break;
  }
}
