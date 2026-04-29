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

## Example

Create a Markdown file somewhere in your source code (without a file extension).

For example `src/data.md`:

```md
# game group

- activeEntities array entity
- activeEntityIds array number
- playerId number

# vector struct

- x number
- y number

# entity struct

- position vector
- velocity vector
<!-- stats -->
- health number
<!-- inventory -->
- items array number
<!-- flags -->
- isActive boolean

# entities aos 2048 entity

# particle soa 10_000

- type string
- pos Vector
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

export let activeEntities = new Array<Entity>()
export let activeEntityIds = new Array<number>()
export let playerId = 0

/** Set the value of the activeEntities field within the game group. */
export function setActiveEntities(value: Array<Entity>) {
  activeEntities = value
}

/** Set the value of the activeEntityIds field within the game group. */
export function setActiveEntityIds(value: Array<number>) {
  activeEntityIds = value
}

/** Set the value of the playerId field within the game group. */
export function setPlayerId(value: number) {
  playerId = value
}

/** Zero the activeEntities field within the game group. */
export function zeroActiveEntities() {
  activeEntities.length = 0
}

/** Zero the activeEntityIds field within the game group. */
export function zeroActiveEntityIds() {
  activeEntityIds.length = 0
}

/** Zero the playerId field within the game group. */
export function zeroPlayerId() {
  playerId = 0
}

/** Zero all fields within the game group. */
export function zeroGameData() {
  activeEntities.length = 0
  activeEntityIds.length = 0
  playerId = 0
}

/*
 * --------------------------------------------------
 * vector (Struct)
 * --------------------------------------------------
 */

export type Vector = {
  x: number
  y: number
}

/** Create a new Vector object. */
export function createVector() {
  const obj: Vector = Object.create(null)
  obj.x = 0
  obj.y = 0
  return obj
}

/** Copy the values of Vector object b into Vector object a. */
export function copyVector(a: Vector, b: Vector) {
  a.x = b.x
  a.y = b.y
}

/** Clone the given Vector object. */
export function cloneVector(obj: Vector) {
  const clone = createVector()
  copyVector(clone, obj)
  return clone
}

/** Zero the given Vector object. */
export function zeroVector(obj: Vector) {
  obj.x = 0
  obj.y = 0
}

/*
 * --------------------------------------------------
 * entity (Struct)
 * --------------------------------------------------
 */

export type Entity = {
  position: Vector
  velocity: Vector
  health: number
  items: Array<number>
  isActive: boolean
}

/** Create a new Entity object. */
export function createEntity() {
  const obj: Entity = Object.create(null)
  obj.position = createVector()
  obj.velocity = createVector()
  obj.health = 0
  obj.items = new Array<number>()
  obj.isActive = false
  return obj
}

/** Copy the values of Entity object b into Entity object a. */
export function copyEntity(a: Entity, b: Entity) {
  a.position = b.position
  a.velocity = b.velocity
  a.health = b.health
  a.items = b.items
  a.isActive = b.isActive
}

/** Clone the given Entity object. */
export function cloneEntity(obj: Entity) {
  const clone = createEntity()
  copyEntity(clone, obj)
  return clone
}

/** Zero the given Entity object. */
export function zeroEntity(obj: Entity) {
  zeroVector(obj.position)
  zeroVector(obj.velocity)
  obj.health = 0
  obj.items.length = 0
  obj.isActive = false
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
  for (let i=0; i<2048; i++) {
    zeroEntity(entities[i])
  }
}

/** Zero an object at a specific index within the entities array of structures. */
export function zeroEntitiesAt(index: number) {
  zeroEntity(entities[index])
}

/*
 * --------------------------------------------------
 * particle (Structure Of Arrays)
 * --------------------------------------------------
 */

export const MAX_PARTICLE_COUNT = 10_000

export const type = new Array(10_000).fill("")
export const pos = Array.from({ length: 10_000 }, createVector)

/** Zero an index within the particle structure of arrays. */
export function zeroParticle(idx: number) {
  type[idx] = ""
  zeroVector(pos[idx])
}

/** Zero the type field within the particle structure of arrays. */
export function zeroType() {
  type.fill("")
}

/** Zero the pos field within the particle structure of arrays. */
export function zeroPos() {
  pos.forEach(zeroVector)
}

/** Zero all fields within the particle structure of arrays. */
export function zeroParticleData() {
  type.fill("")
  pos.forEach(zeroVector)
}
```
