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

### struct

| Field type    | Example            |
| ------------- | ------------------ |
| `string`      | `- name string`    |
| `boolean`     | `- active boolean` |
| `number`      | `- health number`  |
| nested struct | `- position vec2`  |

### group

| Field type      | Example                        |
| --------------- | ------------------------------ |
| `string`        | `- name string`                |
| `boolean`       | `- active boolean`             |
| `number`        | `- health number`              |
| `array string`  | `- ids array string 64`        |
| `array boolean` | `- flags array boolean 64`     |
| `array int8`    | `- ids array int8 64`          |
| `array int16`   | `- ids array int16 64`         |
| `array int32`   | `- ids array int32 64`         |
| `array uint8`   | `- ids array uint8 64`         |
| `array uint16`  | `- ids array uint16 64`        |
| `array uint32`  | `- ids array uint32 64`        |
| `array float32` | `- positions array float32 64` |
| `array float64` | `- positions array float64 64` |

### soa (Structure of Arrays)

| Field type | Example            |
| ---------- | ------------------ |
| `string`   | `- name string`    |
| `boolean`  | `- active boolean` |
| `int8`     | `- val int8`       |
| `int16`    | `- val int16`      |
| `int32`    | `- val int32`      |
| `uint8`    | `- val uint8`      |
| `uint16`   | `- val uint16`     |
| `uint32`   | `- val uint32`     |
| `float32`  | `- x float32`      |
| `float64`  | `- x float64`      |

### aos (Array of Structures)

No field definitions — only a header: `# entities aos 2048 entity`

## Example

Create a Markdown file somewhere in your source code.

For example `src/data.md`:

```md
# game group

- name string
- paused boolean
- playerId number
- entityIds array uint16 2048

# vec2 struct

- x number
- y number

# entity struct

- position vec2
- health number
- active boolean

# entities aos 2048 entity

# particle soa 10_000

- active boolean
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

export let name = ""
export let paused = false
export let playerId = 0
export const entityIds = new Uint16Array(2048)

/** Set the value of the name field within the game group. */
export function setName(v: string) {
  name = v
}

/** Set the value of the paused field within the game group. */
export function setPaused(v: boolean) {
  paused = v
}

/** Set the value of the playerId field within the game group. */
export function setPlayerId(v: number) {
  playerId = v
}

/** Zero the name field within the game group. */
export function zeroName() {
  name = ""
}

/** Zero the paused field within the game group. */
export function zeroPaused() {
  paused = false
}

/** Zero the playerId field within the game group. */
export function zeroPlayerId() {
  playerId = 0
}

/** Zero the entityIds field within the game group. */
export function zeroEntityIds() {
  entityIds.fill(0)
}

/** Zero all fields within the game group. */
export function zeroGame() {
  name = ""
  paused = false
  playerId = 0
  entityIds.fill(0)
}

/*
 * --------------------------------------------------
 * vec2 (Struct)
 * --------------------------------------------------
 */

export type Vec2 = {
  x: number
  y: number
}

/** Create a new Vec2 object. */
export function createVec2() {
  const obj: Vec2 = Object.create(null)
  obj.x = 0
  obj.y = 0
  return obj
}

/** Copy the values of Vec2 object b into Vec2 object a. */
export function copyVec2(a: Vec2, b: Vec2) {
  a.x = b.x
  a.y = b.y
}

/** Clone the given Vec2 object. */
export function cloneVec2(obj: Vec2) {
  const clone = createVec2()
  copyVec2(clone, obj)
  return clone
}

/** Zero the given Vec2 object. */
export function zeroVec2(obj: Vec2) {
  obj.x = 0
  obj.y = 0
}

/*
 * --------------------------------------------------
 * entity (Struct)
 * --------------------------------------------------
 */

export type Entity = {
  position: Vec2
  health: number
  active: boolean
}

/** Create a new Entity object. */
export function createEntity() {
  const obj: Entity = Object.create(null)
  obj.position = createVec2()
  obj.health = 0
  obj.active = false
  return obj
}

/** Copy the values of Entity object b into Entity object a. */
export function copyEntity(a: Entity, b: Entity) {
  a.position = b.position
  a.health = b.health
  a.active = b.active
}

/** Clone the given Entity object. */
export function cloneEntity(obj: Entity) {
  const clone = createEntity()
  copyEntity(clone, obj)
  return clone
}

/** Zero the given Entity object. */
export function zeroEntity(obj: Entity) {
  zeroVec2(obj.position)
  obj.health = 0
  obj.active = false
}

/*
 * --------------------------------------------------
 * entities (Array Of Structures)
 * --------------------------------------------------
 */

export const MAX_ENTITIES_COUNT = 2048

/** An array of Entity objects (structures). */
export const entities = Array.from({ length: 2048 }, createEntity)

/** Zero all objects within the entities array of structures. */
export function zeroEntities() {
  entities.forEach(zeroEntity)
}

/** Zero an object at a specific index within the entities array of structures. */
export function zeroEntitiesAt(i: number) {
  zeroEntity(entities[i])
}

/*
 * --------------------------------------------------
 * particle (Structure Of Arrays)
 * --------------------------------------------------
 */

export const MAX_PARTICLE_COUNT = 10_000

export const active = new Array<boolean>(10_000).fill(false)
export const x = new Float32Array(10_000)
export const y = new Float32Array(10_000)

/** Zero an index within the particle structure of arrays. */
export function zeroParticleAt(i: number) {
  active[i] = false
  x[i] = 0
  y[i] = 0
}

/** Zero the active field within the particle structure of arrays. */
export function zeroActive() {
  active.fill(false)
}

/** Zero the x field within the particle structure of arrays. */
export function zeroX() {
  x.fill(0)
}

/** Zero the y field within the particle structure of arrays. */
export function zeroY() {
  y.fill(0)
}

/** Zero all fields within the particle structure of arrays. */
export function zeroParticle() {
  active.fill(false)
  x.fill(0)
  y.fill(0)
}
```
