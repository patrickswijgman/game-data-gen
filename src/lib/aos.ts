import { capitalize } from "./utils.ts";

export function addArrayOfStructures(header: string, output: Array<string>) {
  const [name, , struct, length] = header.split(" ");
  addArrayOfStructuresDefinition(name, struct, length, output);
  addArrayOfStructuresZeroFunction(name, struct, length, output);
}

function addArrayOfStructuresDefinition(name: string, struct: string, length: string, output: Array<string>) {
  output.push(`export const ${name} = new Array<${capitalize(struct)}>(length)`);
  output.push(`for (let i=0; i<${length}; i++) {`);
  output.push(`  ${name}[i] = create${capitalize(struct)}()`);
  output.push("}");
}

function addArrayOfStructuresZeroFunction(name: string, struct: string, length: string, output: Array<string>) {
  output.push(`export function zero${capitalize(name)}() {`);
  output.push(`  for (let i=0; i<${length}; i++) {`);
  output.push(`    zero${capitalize(struct)}(${name}[i])`);
  output.push("  }");
  output.push("}");
}
