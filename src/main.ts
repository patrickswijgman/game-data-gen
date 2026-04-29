#!/usr/bin/env node

import fs from "node:fs";
import { marked } from "marked";
import { Type } from "./consts.js";
import { addArrayOfStructures } from "./lib/aos.js";
import { addGroup } from "./lib/group.js";
import { addStructureOfArrays } from "./lib/soa.js";
import { addStruct } from "./lib/struct.js";

type Block = {
  header: string;
  fields: Array<string>;
};

const inputFile = process.argv[2];
const outputFile = process.argv[3] || inputFile.replace(".md", ".ts");

const input = fs.readFileSync(inputFile, "utf-8");
const output: Array<string> = [];

output.push("/*");
output.push(` * Generated with game-data-gen on ${new Date().toLocaleString()}. DO NOT MODIFY THIS FILE!`);
output.push(" */");

const tokens = marked.lexer(input);
const blocks: Array<Block> = [];

let block: Block = {
  header: "",
  fields: [],
};

for (const token of tokens) {
  switch (token.type) {
    case "heading":
      {
        block = {
          header: token.text,
          fields: [],
        };
        blocks.push(block);
      }
      break;

    case "list":
      {
        for (const item of token.items) {
          block.fields.push(item.text);
        }
      }
      break;
  }
}

for (const { header, fields } of blocks) {
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
