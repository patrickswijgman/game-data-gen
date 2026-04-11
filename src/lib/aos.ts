import { addFieldMaxLengthConstant } from "./fields.ts";
import { capitalize } from "./utils.ts";

export function addArrayOfStructures(header: string, output: Array<string>) {
  const [name, , length, struct] = header.split(" ");
  addFieldMaxLengthConstant(name, length, output);
  addArrayOfStructuresDefinition(name, struct, length, output);
  addArrayOfStructuresZeroFunction(name, struct, length, output);
}

function addArrayOfStructuresDefinition(name: string, struct: string, length: string, output: Array<string>) {
  output.push(`/** An array of ${capitalize(struct)} objects (structures). */`);
  output.push(`export const ${name} = new Array<${capitalize(struct)}>(${length})`);
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
