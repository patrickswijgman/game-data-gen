# Game Data Generation

A Javascript (Typescript) library to generate data structures with zeroing functions.

## The problems

If you're making a game in Javascript then you might (this was actually me):

- hit the garbage collector (GC) a bunch causing frame drops because you're creating/destroying objects every frame (particles, for example)
- read a book about [Data Oriented Design](https://www.amazon.com/dp/1916478700)
- notice the performance implications of OOP (especially classes and calling their methods) versus using something like Structure of Arrays
- wanting to implement Structure of Arrays instead of Array of Structures (which is a list of class instances, see previous point)
- notice that Javascript can not simply zero out data structures (resetting all data back to initial values) like languages such as C and Rust

## The solution

This library:

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

| Field type      | Example                        |
| --------------- | ------------------------------ |
| `number`        | `- health number`              |
| `array int8`    | `- ids array int8 64`          |
| `array int16`   | `- ids array int16 64`         |
| `array int32`   | `- ids array int32 64`         |
| `array uint8`   | `- ids array uint8 64`         |
| `array uint16`  | `- ids array uint16 64`        |
| `array uint32`  | `- ids array uint32 64`        |
| `array float32` | `- positions array float32 64` |
| `array float64` | `- positions array float64 64` |

Array fields without a length generate a `count` variable and `push`/`pop` functions.

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
# game group

- playerId number
- entityIds array uint16

# particle soa 10_000

- active uint8
- x float32
- y float32
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
export const entityIds = new Uint16Array();
export let entityIdsCount = 0;

/** Set the value of the playerId field within the game group. */
export function setPlayerId(v: number) {
  playerId = v;
}

/** Push a value onto the entityIds field within the game group. */
export function pushEntityIds(v: number) {
  entityIds[entityIdsCount++] = v;
}

/** Pop a value from the entityIds field within the game group. */
export function popEntityIds() {
  return entityIds[--entityIdsCount];
}

/** Zero the playerId field within the game group. */
export function zeroPlayerId() {
  playerId = 0;
}

/** Zero the entityIds field within the game group. */
export function zeroEntityIds() {
  entityIdsCount = 0;
}

/** Zero all fields within the game group. */
export function zeroGame() {
  playerId = 0;
  entityIdsCount = 0;
}

/*
 * --------------------------------------------------
 * particle (Structure Of Arrays)
 * --------------------------------------------------
 */

export const MAX_PARTICLE_COUNT = 10_000;

export const active = new Uint8Array(10_000);
export const x = new Float32Array(10_000);
export const y = new Float32Array(10_000);

/** Zero an index within the particle structure of arrays. */
export function zeroParticleAt(i: number) {
  active[i] = 0;
  x[i] = 0;
  y[i] = 0;
}

/** Zero the active field within the particle structure of arrays. */
export function zeroActive() {
  active.fill(0);
}

/** Zero the x field within the particle structure of arrays. */
export function zeroX() {
  x.fill(0);
}

/** Zero the y field within the particle structure of arrays. */
export function zeroY() {
  y.fill(0);
}

/** Zero all fields within the particle structure of arrays. */
export function zeroParticle() {
  active.fill(0);
  x.fill(0);
  y.fill(0);
}
```
