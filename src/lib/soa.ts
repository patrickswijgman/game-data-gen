import { ArrayType } from "../consts.js";
import { addFieldDefinition, addFieldMaxLengthConstant, addFieldSetFunction, addFieldZeroFunction, addZeroFunction } from "./fields.js";
import { capitalize, getName } from "./utils.js";

export function addStructureOfArrays(header: string, fields: Array<string>, output: Array<string>) {
  const [name, type, baseLength] = header.split(" ");

  addFieldMaxLengthConstant(name, baseLength, output);

  for (const field of fields) {
    addFieldDefinition(field, baseLength, output);
  }

  for (const field of fields) {
    addFieldSetFunction(name, type, field, output);
  }

  addFieldZeroAtIndexFunction(name, type, fields, output);

  for (const field of fields) {
    addFieldZeroFunction(name, type, field, baseLength, output);
  }

  addZeroFunction(name, type, fields, baseLength, output);
}

function addFieldZeroAtIndexFunction(name: string, type: string, fields: Array<string>, output: Array<string>) {
  output.push("");
  output.push(`/** Zero an index within the ${name} ${getName(type)}. */`);
  output.push(`export function zero${capitalize(name)}(idx: number) {`);
  for (const field of fields) {
    const [fieldName, _, fieldArrayType] = field.split(" ");
    switch (fieldArrayType) {
      case ArrayType.STRING:
        output.push(`  ${fieldName}[idx] = ""`);
        break;
      case ArrayType.NUMBER:
        output.push(`  ${fieldName}[idx] = 0`);
        break;
      case ArrayType.BOOLEAN:
        output.push(`  ${fieldName}[idx] = false`);
        break;
    }
  }
  output.push("}");
}
