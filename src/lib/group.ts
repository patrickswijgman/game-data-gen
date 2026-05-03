import { FieldType } from "../consts.js";
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
  const [fieldName, fieldType, fieldLength] = field.split(" ");
  switch (fieldType) {
    case FieldType.INT_8:
      output.push(`export const ${fieldName} = new Int8Array(${fieldLength})`);
      output.push(`export let ${fieldName}Count = 0`);
      break;
    case FieldType.INT_16:
      output.push(`export const ${fieldName} = new Int16Array(${fieldLength})`);
      output.push(`export let ${fieldName}Count = 0`);
      break;
    case FieldType.INT_32:
      output.push(`export const ${fieldName} = new Int32Array(${fieldLength})`);
      output.push(`export let ${fieldName}Count = 0`);
      break;
    case FieldType.UINT_8:
      output.push(`export const ${fieldName} = new Uint8Array(${fieldLength})`);
      output.push(`export let ${fieldName}Count = 0`);
      break;
    case FieldType.UINT_16:
      output.push(`export const ${fieldName} = new Uint16Array(${fieldLength})`);
      output.push(`export let ${fieldName}Count = 0`);
      break;
    case FieldType.UINT_32:
      output.push(`export const ${fieldName} = new Uint32Array(${fieldLength})`);
      output.push(`export let ${fieldName}Count = 0`);
      break;
    case FieldType.FLOAT_32:
      output.push(`export const ${fieldName} = new Float32Array(${fieldLength})`);
      output.push(`export let ${fieldName}Count = 0`);
      break;
    case FieldType.FLOAT_64:
      output.push(`export const ${fieldName} = new Float64Array(${fieldLength})`);
      output.push(`export let ${fieldName}Count = 0`);
      break;
    default:
      output.push(`export let ${fieldName} = 0`);
  }
}

function addFieldSetFunction(name: string, field: string, output: Array<string>) {
  const [fieldName, , fieldLength] = field.split(" ");
  if (!fieldLength) {
    output.push("");
    output.push(`/** Set the value of the ${fieldName} field within the ${name} group. */`);
    output.push(`export function set${capitalize(fieldName)}(v: number) {`);
    output.push(`  ${fieldName} = v`);
    output.push("}");
  }
}

function addFieldPushFunction(name: string, field: string, output: Array<string>) {
  const [fieldName, , fieldLength] = field.split(" ");
  if (fieldLength) {
    output.push("");
    output.push(`/** Push a value onto the ${fieldName} field within the ${name} group. */`);
    output.push(`export function push${capitalize(fieldName)}(v: number) {`);
    output.push(`  ${fieldName}[${fieldName}Count++] = v`);
    output.push("}");
  }
}

function addFieldPopFunction(name: string, field: string, output: Array<string>) {
  const [fieldName, , fieldLength] = field.split(" ");
  if (fieldLength) {
    output.push("");
    output.push(`/** Pop a value from the ${fieldName} field within the ${name} group. */`);
    output.push(`export function pop${capitalize(fieldName)}() {`);
    output.push(`  return ${fieldName}[--${fieldName}Count]`);
    output.push("}");
  }
}

function addFieldZeroFunction(name: string, field: string, output: Array<string>) {
  const [fieldName, , fieldLength] = field.split(" ");
  output.push("");
  output.push(`/** Zero the ${fieldName} field within the ${name} group. */`);
  output.push(`export function zero${capitalize(fieldName)}() {`);
  zeroField(fieldName, !!fieldLength, output);
  output.push("}");
}

function addZeroFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Zero all fields within the ${name} group. */`);
  output.push(`export function zero${capitalize(name)}() {`);
  for (const field of fields) {
    const [fieldName, , fieldLength] = field.split(" ");
    zeroField(fieldName, !!fieldLength, output);
  }
  output.push("}");
}

function zeroField(name: string, isArray: boolean, output: Array<string>) {
  if (isArray) {
    output.push(`  ${name}Count = 0`);
  } else {
    output.push(`  ${name} = 0`);
  }
}
