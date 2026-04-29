import { addHeader, capitalize } from "./utils.js";

export function addArrayOfStructures(header: string, output: Array<string>) {
  const [name, , length, type] = header.split(" ");
  addHeader(`${name} (Array Of Structures)`, output);
  addFieldMaxLengthConstant(name, length, output);
  addArrayOfStructuresDefinition(name, type, length, output);
  addArrayOfStructuresZeroFunction(name, type, length, output);
  addArrayOfStructuresZeroAtIndexFunction(name, type, output);
}

function addFieldMaxLengthConstant(name: string, length: string, output: Array<string>) {
  output.push(`export const MAX_${name.toUpperCase()}_COUNT = ${length}`);
  output.push("");
}

function addArrayOfStructuresDefinition(name: string, type: string, length: string, output: Array<string>) {
  output.push(`/** An array of ${capitalize(type)} objects (structures). */`);
  output.push(`export const ${name} = Array.from({ length: ${length} }, create${capitalize(type)})`);
}

function addArrayOfStructuresZeroFunction(name: string, type: string, length: string, output: Array<string>) {
  output.push("");
  output.push(`/** Zero all objects within the ${name} array of structures. */`);
  output.push(`export function zero${capitalize(name)}() {`);
  output.push(`  for (let i=0; i<${length}; i++) {`);
  output.push(`    zero${capitalize(type)}(${name}[i])`);
  output.push("  }");
  output.push("}");
}

function addArrayOfStructuresZeroAtIndexFunction(name: string, type: string, output: Array<string>) {
  output.push("");
  output.push(`/** Zero an object at a specific index within the ${name} array of structures. */`);
  output.push(`export function zero${capitalize(name)}At(i: number) {`);
  output.push(`  zero${capitalize(type)}(${name}[i])`);
  output.push("}");
}
