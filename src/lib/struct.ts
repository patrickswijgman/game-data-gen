import { FieldType } from "../consts.js";
import { addHeader, capitalize, getTypeName } from "./utils.js";

export function addStruct(header: string, fields: Array<string>, output: Array<string>) {
  const [name] = header.split(" ");
  addHeader(`${name} (Struct)`, output);
  addStructTypeDefinition(name, fields, output);
  addStructCreateFunction(name, fields, output);
  addStructCopyFunction(name, fields, output);
  addStructCloneFunction(name, output);
  addStructZeroFunction(name, fields, output);
}

function addStructTypeDefinition(name: string, fields: Array<string>, output: Array<string>) {
  output.push(`export type ${capitalize(name)} = {`);
  for (const field of fields) {
    const [fieldName, fieldType] = field.split(" ");
    output.push(`  ${fieldName}: ${getTypeName(fieldType)}`);
  }
  output.push("}");
}

function addStructCreateFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Create a new ${capitalize(name)} object. */`);
  output.push(`export function create${capitalize(name)}() {`);
  output.push(`  const obj: ${getTypeName(name)} = Object.create(null)`);
  for (const field of fields) {
    const [fieldName, fieldType] = field.split(" ");
    switch (fieldType) {
      case FieldType.STRING:
        output.push(`  obj.${fieldName} = ""`);
        break;
      case FieldType.BOOLEAN:
        output.push(`  obj.${fieldName} = false`);
        break;
      case FieldType.NUMBER:
        output.push(`  obj.${fieldName} = 0`);
        break;
      default:
        output.push(`  obj.${fieldName} = create${capitalize(fieldType)}()`);
    }
  }
  output.push("  return obj");
  output.push("}");
}

function addStructCopyFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Copy the values of ${capitalize(name)} object b into ${capitalize(name)} object a. */`);
  output.push(`export function copy${capitalize(name)}(a: ${getTypeName(name)}, b: ${getTypeName(name)}) {`);
  for (const field of fields) {
    const [fieldName] = field.split(" ");
    output.push(`  a.${fieldName} = b.${fieldName}`);
  }
  output.push("}");
}

function addStructCloneFunction(name: string, output: Array<string>) {
  output.push("");
  output.push(`/** Clone the given ${capitalize(name)} object. */`);
  output.push(`export function clone${capitalize(name)}(obj: ${getTypeName(name)}) {`);
  output.push(`  const clone = create${capitalize(name)}()`);
  output.push(`  copy${capitalize(name)}(clone, obj)`);
  output.push("  return clone");
  output.push("}");
}

function addStructZeroFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Zero the given ${capitalize(name)} object. */`);
  output.push(`export function zero${capitalize(name)}(obj: ${getTypeName(name)}) {`);
  for (const field of fields) {
    const [fieldName, fieldType] = field.split(" ");
    switch (fieldType) {
      case FieldType.STRING:
        output.push(`  obj.${fieldName} = ""`);
        break;
      case FieldType.BOOLEAN:
        output.push(`  obj.${fieldName} = false`);
        break;
      case FieldType.NUMBER:
        output.push(`  obj.${fieldName} = 0`);
        break;
      default:
        output.push(`  zero${capitalize(fieldType)}(obj.${fieldName})`);
    }
  }
  output.push("}");
}
