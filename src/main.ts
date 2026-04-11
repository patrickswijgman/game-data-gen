import fs from "fs";
import { Type } from "./consts.ts";
import { getTypeName } from "./lib/utils.ts";
import { addStructureOfArrays } from "./lib/soa.ts";
import { addGroup } from "./lib/group.ts";
import { addStruct } from "./lib/struct.ts";
import { addArrayOfStructures } from "./lib/aos.ts";

const inputFile = process.argv[2];
const outputFile = process.argv[3] || `${inputFile}.ts`;
const input = fs.readFileSync(inputFile, "utf-8");
const output: Array<string> = [];

output.push("/*");
output.push(` * Generated with game-data-gen on ${new Date().toLocaleString()}. DO NOT MODIFY THIS FILE!`);
output.push(" */");

const blocks = input.trim().split("\n\n");

for (const block of blocks) {
  const fields = block.split("\n");
  const header = fields.shift();

  if (!header) continue;

  const [name, type] = header.split(" ");

  output.push("");
  output.push("/*");
  output.push(` * ${"-".repeat(50)}`);
  output.push(` * ${name} (${getTypeName(type)})`);
  output.push(` * ${"-".repeat(50)}`);
  output.push(" */");

  switch (type) {
    case Type.STRUCT:
      addStruct(header, fields, output);
      break;
    case Type.GROUP:
      addGroup(header, fields, output);
      break;
    case Type.SOA:
      addStructureOfArrays(header, fields, output);
      break;
    case Type.AOS:
      addArrayOfStructures(header, output);
      break;
  }
}

fs.writeFileSync(outputFile, output.join("\n"));
