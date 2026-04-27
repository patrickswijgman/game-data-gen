import { ArrayType } from "../consts.js";
import { addHeader, capitalize, getTypeName } from "./utils.js";

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
    case ArrayType.NUMBER:
      output.push(`export const ${fieldName} = new Array<number>(${length}).fill(0)`);
      break;
    case ArrayType.BOOLEAN:
      output.push(`export const ${fieldName} = new Array<boolean>(${length}).fill(false)`);
      break;
    default:
      output.push(`export const ${fieldName} = new Array<${getTypeName(fieldType)}>(${length}).fill(null).map(() => create${capitalize(fieldType)})()`);
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
  output.push(`export function zero${capitalize(name)}Data() {`);
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
    case ArrayType.NUMBER:
      output.push(`  ${name}.fill(0)`);
      break;
    case ArrayType.BOOLEAN:
      output.push(`  ${name}.fill(false)`);
      break;
    default:
      output.push(`  ${name}.forEach(zero${capitalize(type)})`);
  }
}

function addFieldZeroAtIndexFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Zero an index within the ${name} structure of arrays. */`);
  output.push(`export function zero${capitalize(name)}(idx: number) {`);
  for (const field of fields) {
    const [fieldName, fieldType] = field.split(" ");
    switch (fieldType) {
      case ArrayType.STRING:
        output.push(`  ${fieldName}[idx] = ""`);
        break;
      case ArrayType.NUMBER:
        output.push(`  ${fieldName}[idx] = 0`);
        break;
      case ArrayType.BOOLEAN:
        output.push(`  ${fieldName}[idx] = false`);
        break;
      default:
        output.push(`  zero${capitalize(fieldType)}(${fieldName}[idx])`);
    }
  }
  output.push("}");
}
