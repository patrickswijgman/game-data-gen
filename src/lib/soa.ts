import { ArrayType } from "../consts.js";
import { addHeader, capitalize } from "./utils.js";

export function addStructureOfArrays(header: string, fields: Array<string>, output: Array<string>) {
  const [name, _, length] = header.split(" ");

  addHeader(`${name} (Structure Of Arrays)`, output);

  addFieldMaxLengthConstant(name, length, output);

  for (const field of fields) {
    addFieldDefinition(field, length, output);
  }

  addFieldZeroAtIndexFunction(name, fields, output);

  for (const field of fields) {
    addFieldZeroFunction(name, field, output);
  }

  addZeroFunction(name, fields, output);
}

function addFieldMaxLengthConstant(name: string, length: string, output: Array<string>) {
  output.push(`export const MAX_${name.toUpperCase()}_COUNT = ${length}`);
  output.push("");
}

function addFieldDefinition(field: string, length: string, output: Array<string>) {
  const [fieldName, fieldType] = field.split(" ");
  switch (fieldType) {
    case ArrayType.STRING:
      output.push(`export const ${fieldName} = new Array<string>(${length}).fill("")`);
      break;
    case ArrayType.BOOLEAN:
      output.push(`export const ${fieldName} = new Array<boolean>(${length}).fill(false)`);
      break;
    case ArrayType.INT_8:
      output.push(`export const ${fieldName} = new Int8Array(${length})`);
      break;
    case ArrayType.INT_16:
      output.push(`export const ${fieldName} = new Int16Array(${length})`);
      break;
    case ArrayType.INT_32:
      output.push(`export const ${fieldName} = new Int32Array(${length})`);
      break;
    case ArrayType.UINT_8:
      output.push(`export const ${fieldName} = new Uint8Array(${length})`);
      break;
    case ArrayType.UINT_16:
      output.push(`export const ${fieldName} = new Uint16Array(${length})`);
      break;
    case ArrayType.UINT_32:
      output.push(`export const ${fieldName} = new Uint32Array(${length})`);
      break;
    case ArrayType.FLOAT_32:
      output.push(`export const ${fieldName} = new Float32Array(${length})`);
      break;
    case ArrayType.FLOAT_64:
      output.push(`export const ${fieldName} = new Float64Array(${length})`);
      break;
  }
}

function addFieldZeroFunction(name: string, field: string, output: Array<string>) {
  const [fieldName, fieldType] = field.split(" ");
  output.push("");
  output.push(`/** Zero the ${fieldName} field within the ${name} structure of arrays. */`);
  output.push(`export function zero${capitalize(fieldName)}() {`);
  zeroField(fieldName, fieldType, output);
  output.push("}");
}

function addZeroFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Zero all fields within the ${name} structure of arrays. */`);
  output.push(`export function zero${capitalize(name)}() {`);
  for (const field of fields) {
    const [fieldName, fieldType] = field.split(" ");
    zeroField(fieldName, fieldType, output);
  }
  output.push("}");
}

function zeroField(name: string, type: string, output: Array<string>) {
  switch (type) {
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
}

function addFieldZeroAtIndexFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Zero an index within the ${name} structure of arrays. */`);
  output.push(`export function zero${capitalize(name)}At(i: number) {`);
  for (const field of fields) {
    const [fieldName, fieldType] = field.split(" ");
    switch (fieldType) {
      case ArrayType.STRING:
        output.push(`  ${fieldName}[i] = ""`);
        break;
      case ArrayType.BOOLEAN:
        output.push(`  ${fieldName}[i] = false`);
        break;
      case ArrayType.INT_8:
      case ArrayType.INT_16:
      case ArrayType.INT_32:
      case ArrayType.UINT_8:
      case ArrayType.UINT_16:
      case ArrayType.UINT_32:
      case ArrayType.FLOAT_32:
      case ArrayType.FLOAT_64:
        output.push(`  ${fieldName}[i] = 0`);
        break;
    }
  }
  output.push("}");
}
