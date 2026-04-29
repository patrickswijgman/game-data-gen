#!/usr/bin/env node

import fs from "node:fs";
import { Type } from "./consts.js";
import { addArrayOfStructures } from "./lib/aos.js";
import { addGroup } from "./lib/group.js";
import { addStructureOfArrays } from "./lib/soa.js";
import { addStruct } from "./lib/struct.js";

const inputFile = process.argv[2];
const outputFile = process.argv[3] || `${inputFile.replace(/\.md$/, "")}.ts`;
const input = fs.readFileSync(inputFile, "utf-8");
const output: Array<string> = [];

output.push("/*");
output.push(` * Generated with game-data-gen on ${new Date().toLocaleString()}. DO NOT MODIFY THIS FILE!`);
output.push(" */");

const blocks = input
  .split("\n")
  .filter((line) => !line.startsWith("<!--"))
  .join("\n")
  .trim()
  .split("\n\n");

for (const block of blocks) {
  const lines = block.split("\n");
  const header = lines.shift()?.replace(/^#\s*/, "");

  if (!header) continue;

  const fields = lines.map((line) => line.replace(/^-\s*/, ""));
  const [_, type] = header.split(" ");

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
