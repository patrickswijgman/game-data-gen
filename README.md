# Game Data Generation

A CLI code generator that creates Javascript (Typescript) data structures with zeroing functions.

## The problems

If you're making a game in Javascript then you might:

- hit the garbage collector (GC) a bunch causing frame drops because you're creating/destroying objects every frame (particles, for example)
- read a book about [Data Oriented Design](https://www.amazon.com/dp/1916478700)
- notice the performance implications of OOP (especially classes and calling their methods) versus using something like Structure of Arrays
- want to implement Structure of Arrays instead of Array of Structures (which is a list of class instances, see previous point)
- notice that Javascript can not simply zero out data structures (resetting all data back to initial values) like languages such as C and Rust

## The solution

This tool:

- creates data structures based on Markdown file (see example below)
- each data structure gets associated functions to zero out its memory so it can be reused

## Installation

```shell
npm i -D game-data-gen
```

## Usage

```shell
npx game-data-gen <input-file-path> <optional-output-file-path>
```

## Supported fields

### group

| Field type         | Example                  |
| ------------------ | ------------------------ |
| (none)             | `- health`               |
| `int8 <length>`    | `- ids int8 64`          |
| `int16 <length>`   | `- ids int16 64`         |
| `int32 <length>`   | `- ids int32 64`         |
| `uint8 <length>`   | `- ids uint8 64`         |
| `uint16 <length>`  | `- ids uint16 64`        |
| `uint32 <length>`  | `- ids uint32 64`        |
| `float32 <length>` | `- positions float32 64` |
| `float64 <length>` | `- positions float64 64` |

Whether a field is a scalar or an array is derived from whether a length is provided. A scalar field generates a plain `number`. An array field generates a typed array with a `count` variable and `push`/`pop` functions to simulate a dynamic array within the fixed capacity.

### soa (Structure of Arrays)

| Field type | Example        |
| ---------- | -------------- |
| `int8`     | `- val int8`   |
| `int16`    | `- val int16`  |
| `int32`    | `- val int32`  |
| `uint8`    | `- val uint8`  |
| `uint16`   | `- val uint16` |
| `uint32`   | `- val uint32` |
| `float32`  | `- x float32`  |
| `float64`  | `- x float64`  |

## Example

Create a Markdown file somewhere in your source code.

For example `src/data.md`:

```md
# game

- playerId
- enemies uint16 64

# entity 1000

- type uint8
- posX float32
- posY float32
- health uint16
```

Run the package with (consider making this a script in your package.json):

```shell
npx game-data-gen src/data.md
```

This will create or update the `src/data.ts` file (see below). The data and functions can then be imported from this file into your code.

```typescript
/*
 * --------------------------------------------------
 * game (Group)
 * --------------------------------------------------
 */

export let playerId = 0;
export const enemies = new Uint16Array(64);
export let enemiesCount = 0;

/** Set the value of the playerId field within the game group. */
export function setPlayerId(v: number) {
  playerId = v;
}

/** Push a value onto the enemies field within the game group. */
export function pushEnemies(v: number) {
  enemies[enemiesCount++] = v;
}

/** Pop a value from the enemies field within the game group. */
export function popEnemies() {
  return enemies[--enemiesCount];
}

/** Zero the playerId field within the game group. */
export function zeroPlayerId() {
  playerId = 0;
}

/** Zero the enemies field within the game group. */
export function zeroEnemies() {
  enemiesCount = 0;
}

/** Zero all fields within the game group. */
export function zeroGame() {
  playerId = 0;
  enemiesCount = 0;
}

/*
 * --------------------------------------------------
 * entity (Structure Of Arrays)
 * --------------------------------------------------
 */

export const MAX_ENTITY_COUNT = 1000;

export const type = new Uint8Array(1000);
export const posX = new Float32Array(1000);
export const posY = new Float32Array(1000);
export const health = new Uint16Array(1000);

/** Zero an index within the entity structure of arrays. */
export function zeroEntityAt(i: number) {
  type[i] = 0;
  posX[i] = 0;
  posY[i] = 0;
  health[i] = 0;
}

/** Zero all fields within the entity structure of arrays. */
export function zeroEntity() {
  type.fill(0);
  posX.fill(0);
  posY.fill(0);
  health.fill(0);
}
```

The `enemies` array in the group acts as a dynamic list within its fixed capacity. Iterate only the active entries using the generated `count`:

```typescript
import { enemies, enemiesCount } from "./data.ts";

for (let i = 0; i < enemiesCount; i++) {
  const id = enemies[i];
  // ...
}
```
