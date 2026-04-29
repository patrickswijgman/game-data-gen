import { FieldType } from "../consts.js";
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
  const [fieldName, fieldType, fieldArrayType] = field.split(" ");

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
      output.push(`export let ${fieldName} = new Array<${getTypeName(fieldArrayType)}>()`);
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
  output.push(`export function zero${capitalize(name)}Data() {`);
  for (const field of fields) {
    const [fieldName, fieldType] = field.split(" ");
    zeroField(fieldName, fieldType, output);
  }
  output.push("}");
}

function zeroField(name: string, type: string, output: Array<string>) {
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
      output.push(`  ${name}.length = 0`);
      break;
    default:
      output.push(`  zero${capitalize(type)}(${name})`);
  }
}
