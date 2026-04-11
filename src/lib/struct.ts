import { ArrayType, FieldType } from "../consts.ts";
import { capitalize } from "./utils.ts";

export function addStruct(header: string, fields: Array<string>, output: Array<string>) {
  const [name] = header.split(" ");
  addStructTypeDefinition(name, fields, output);
  addStructCreateFunction(name, fields, output);
  addStructZeroFunction(name, fields, output);
}

function addStructTypeDefinition(name: string, fields: Array<string>, output: Array<string>) {
  output.push(`export type ${capitalize(name)} = {`);
  for (const field of fields) {
    const [fieldName, fieldType, fieldArrayType] = field.split(" ");
    switch (fieldType) {
      case FieldType.STRING:
        output.push(`  ${fieldName}: string`);
        break;
      case FieldType.NUMBER:
        output.push(`  ${fieldName}: number`);
        break;
      case FieldType.BOOLEAN:
        output.push(`  ${fieldName}: boolean`);
        break;
      case FieldType.ARRAY:
        output.push(`  ${fieldName}: Array<${fieldArrayType}>`);
        break;
      default:
        output.push(`  ${fieldName}: ${capitalize(fieldType)}`);
    }
  }
  output.push("}");
}

function addStructCreateFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Create a new ${capitalize(name)} object. */`);
  output.push(`export function create${capitalize(name)}(): ${capitalize(name)} {`);
  output.push(`  return {`);
  for (const field of fields) {
    const [fieldName, fieldType, fieldArrayType, fieldArrayLength = ""] = field.split(" ");
    switch (fieldType) {
      case FieldType.STRING:
        output.push(`    ${fieldName}: "",`);
        break;
      case FieldType.NUMBER:
        output.push(`    ${fieldName}: 0,`);
        break;
      case FieldType.BOOLEAN:
        output.push(`    ${fieldName}: false,`);
        break;
      case FieldType.ARRAY:
        {
          switch (fieldArrayType) {
            case ArrayType.STRING:
              output.push(`    ${fieldName}: new Array<string>(${fieldArrayLength})${fieldArrayLength ? '.fill("")' : ""},`);
              break;
            case ArrayType.NUMBER:
              output.push(`    ${fieldName}: new Array<number>(${fieldArrayLength})${fieldArrayLength ? ".fill(0)" : ""},`);
              break;
            case ArrayType.BOOLEAN:
              output.push(`    ${fieldName}: new Array<boolean>(${fieldArrayLength})${fieldArrayLength ? ".fill(false)" : ""},`);
              break;
          }
        }
        break;
      default: {
        output.push(`    ${fieldName}: create${capitalize(fieldType)}(),`);
      }
    }
  }
  output.push("  }");
  output.push("}");
}

function addStructZeroFunction(name: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Zero the given ${capitalize(name)} object. */`);
  output.push(`export function zero${capitalize(name)}(obj: ${capitalize(name)}) {`);
  for (const field of fields) {
    const [fieldName, fieldType, fieldArrayType, fieldArrayLength] = field.split(" ");
    switch (fieldType) {
      case FieldType.STRING:
        output.push(`  obj.${fieldName} = ""`);
        break;
      case FieldType.NUMBER:
        output.push(`  obj.${fieldName} = 0`);
        break;
      case FieldType.BOOLEAN:
        output.push(`  obj.${fieldName} = false`);
        break;
      case FieldType.ARRAY:
        {
          switch (fieldArrayType) {
            case ArrayType.STRING:
              output.push(`  obj.${fieldName}.${fieldArrayLength ? 'fill("")' : "length = 0"}`);
              break;
            case ArrayType.NUMBER:
              output.push(`  obj.${fieldName}.${fieldArrayLength ? "fill(0)" : "length = 0"}`);
              break;
            case ArrayType.BOOLEAN:
              output.push(`  obj.${fieldName}.${fieldArrayLength ? "fill(false)" : "length = 0"}`);
              break;
          }
        }
        break;
      default:
        output.push(`  zero${capitalize(fieldType)}(obj.${fieldName})`);
    }
  }
  output.push("}");
}
