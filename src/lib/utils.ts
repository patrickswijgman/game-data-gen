export function addHeader(name: string, output: Array<string>) {
  output.push("");
  output.push("/*");
  output.push(` * ${"-".repeat(50)}`);
  output.push(` * ${name}`);
  output.push(` * ${"-".repeat(50)}`);
  output.push(" */");
  output.push("");
}

export function capitalize(str: string) {
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
}
