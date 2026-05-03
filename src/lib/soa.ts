import { FieldType } from "../consts.js";
import { addHeader, capitalize } from "./utils.js";

export function addStructureOfArrays(header: string, fields: Array<string>, output: Array<string>) {
  const [name, length] = header.split(" ");

  addHeader(`${name} (Structure Of Arrays)`, output);

  addFieldMaxLengthConstant(name, length, output);

  for (const field of fields) {
    addFieldDefinition(field, length, output);
  }

  addZeroAtIndexFunction(name, fields, output);

  addZeroFunction(name, fields, output);

  addPrintAtIndexFunction(name, fields, output);
}

function addFieldMaxLengthConstant(name: string, length: string, output: Array<string>) {
  output.push(`export const MAX_${name.toUpperCase()}_COUNT = ${length}`);
  output.push("");
}

function addFieldDefinition(field: string, length: string, output: Array<string>) {
  const [fieldName, fieldType] = field.split(" ");
  switch (fieldType) {
    case FieldType.INT_8:
      output.push(`export const ${fieldName} = new Int8Array(${length})`);
      break;
    case FieldType.INT_16:
      output.push(`export const ${fieldName} = new Int16Array(${length})`);
      break;
    case FieldType.INT_32:
      output.push(`export const ${fieldName} = new Int32Array(${length})`);
      break;
    case FieldType.UINT_8:
      output.push(`export const ${fieldName} = new Uint8Array(${length})`);
      break;
    case FieldType.UINT_16:
      output.push(`export const ${fieldName} = new Uint16Array(${length})`);
      break;
    case FieldType.UINT_32:
      output.push(`export const ${fieldName} = new Uint32Array(${length})`);
      break;
    case FieldType.FLOAT_32:
      output.push(`export const ${fieldName} = new Float32Array(${length})`);
      break;
    case FieldType.FLOAT_64:
      output.push(`export const ${fieldName} = new Float64Array(${length})`);
      break;
  }
}

function addZeroFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Zero all fields within the ${name} structure of arrays. */`);
  output.push(`export function zero${capitalize(name)}() {`);
  for (const field of fields) {
    const [fieldName] = field.split(" ");
    output.push(`  ${fieldName}.fill(0)`);
  }
  output.push("}");
}

function addZeroAtIndexFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Zero an index within the ${name} structure of arrays. */`);
  output.push(`export function zero${capitalize(name)}At(i: number) {`);
  for (const field of fields) {
    const [fieldName] = field.split(" ");
    output.push(`  ${fieldName}[i] = 0`);
  }
  output.push("}");
}

function addPrintAtIndexFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Print an index within the ${name} structure of arrays to the console. */`);
  output.push(`export function print${capitalize(name)}At(i: number) {`);
  output.push("  console.table({");
  for (const field of fields) {
    const [fieldName] = field.split(" ");
    output.push(`    ${fieldName}: ${fieldName}[i],`);
  }
  output.push("  })");
  output.push("}");
}
