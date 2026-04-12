import { addFieldMaxLengthConstant } from "./fields.js";
import { capitalize, getName } from "./utils.js";

export function addArrayOfStructures(header: string, output: Array<string>) {
  const [name, , length, struct] = header.split(" ");
  addFieldMaxLengthConstant(name, length, output);
  addArrayOfStructuresDefinition(name, struct, length, output);
  addArrayOfStructuresZeroFunction(name, struct, length, output);
  addArrayOfStructuresZeroAtIndexFunction(name, struct, output);
}

function addArrayOfStructuresDefinition(name: string, struct: string, length: string, output: Array<string>) {
  output.push(`/** An array of ${capitalize(struct)} objects (structures). */`);
  output.push(`export const ${name} = new Array<${getName(struct)}>(${length})`);
  output.push(`for (let i=0; i<${length}; i++) {`);
  output.push(`  ${name}[i] = create${capitalize(struct)}()`);
  output.push("}");
}

function addArrayOfStructuresZeroFunction(name: string, struct: string, length: string, output: Array<string>) {
  output.push("");
  output.push(`/** Zero all objects within the ${name} array of structures. */`);
  output.push(`export function zero${capitalize(name)}() {`);
  output.push(`  for (let i=0; i<${length}; i++) {`);
  output.push(`    zero${capitalize(struct)}(${name}[i])`);
  output.push("  }");
  output.push("}");
}

function addArrayOfStructuresZeroAtIndexFunction(name: string, struct: string, output: Array<string>) {
  output.push("");
  output.push(`/** Zero an object at a specific index within the ${name} array of structures. */`);
  output.push(`export function zero${capitalize(struct)}At(index: number) {`);
  output.push(`  zero${capitalize(struct)}(${name}[index])`);
  output.push("}");
}
