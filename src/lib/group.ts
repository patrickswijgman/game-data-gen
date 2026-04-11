import { addFieldDefinition, addFieldSetFunction, addFieldZeroFunction, addZeroFunction } from "./fields.ts";

export function addGroup(header: string, fields: Array<string>, output: Array<string>) {
  const [name, type, baseLength] = header.split(" ");

  for (const field of fields) {
    addFieldDefinition(field, baseLength, output);
  }

  for (const field of fields) {
    addFieldSetFunction(name, type, field, output);
  }

  for (const field of fields) {
    addFieldZeroFunction(name, type, field, baseLength, output);
  }

  addZeroFunction(name, type, fields, baseLength, output);
}
