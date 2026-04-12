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

- creates data structures based on a very easy syntax (I tried JSON, didn't feel it)
- each data structure gets associated functions to zero out its memory so it can be reused

## Installation

```shell
npm i -D game-data-gen
```

## Usage

```shell
npx game-data-gen <input-file-path> <optional-output-file-path>
```

## Format

```
name type? length? struct?
fieldName fieldType fieldArrayType? fieldArrayLength?
```

`name`

The name of the data structure.

`type`

Supported data structure types:

- group
- struct
- soa (Structure of Arrays)
- aos (Array of Structures)

`length` (optional)

The length of the arrays within the Structure of Arrays data structure.

If no length is given to the type and no length is given to a field it is considered a dynamic array and zeroing will set the array's length back to zero (emptying it).

`fieldName`

The name of one of the fields within the data structure.

`fieldType`

Supported field types:

- string
- number
- boolean
- array

`fieldArrayType` (optional, required if fieldType=array)

Supported array field types:

- string
- boolean
- number

`fieldArrayLength` (optional)

The length of the array field, leave empty to use a dynamically sized array instead of a fixed size array.

In case of a Structure of Arrays data structure (type=soa), setting the length on the type instead is recommended so that all arrays have the same length.

`struct` (optional, required if type=aos)

The defined struct to use for this Array of Structures.

## Example

Create a plain text file somewhere in your source code (without a file extension).

For example `src/data/game`:

```
game group
activeEntities array number

vector struct
x number
y number

entity struct
position vector
velocity vector
health number
isActive boolean

entities aos 2048 entity

particle soa 1024
posX array number
posY array number
```

Run the package with (consider making this a script in your package.json):

```shell
npx game-data-gen src/data/game
```

This will create or update the `src/data/game.ts` file which you can then import into your code:

```typescript
/*
 * --------------------------------------------------
 * game (group)
 * --------------------------------------------------
 */

export const activeEntities = new Array<number>()

/** Zero the activeEntities field within the game group. */
export function zeroActiveEntities() {
  activeEntities.length = 0
}

/** Zero all fields within the game group. */
export function zeroGameData() {
  activeEntities.length = 0
}

/*
 * --------------------------------------------------
 * vector (struct)
 * --------------------------------------------------
 */

export type Vector = {
  x: number
  y: number
}

/** Create a new Vector object. */
export function createVector(): Vector {
  const obj = Object.create(null)
  obj.x = 0
  obj.y = 0
  return obj
}

/** Zero the given Vector object. */
export function zeroVector(obj: Vector) {
  obj.x = 0
  obj.y = 0
}

/*
 * --------------------------------------------------
 * entity (struct)
 * --------------------------------------------------
 */

export type Entity = {
  position: Vector
  velocity: Vector
  health: number
  isActive: boolean
}

/** Create a new Entity object. */
export function createEntity(): Entity {
  const obj = Object.create(null)
  obj.position = createVector()
  obj.velocity = createVector()
  obj.health = 0
  obj.isActive = false
  return obj
}

/** Zero the given Entity object. */
export function zeroEntity(obj: Entity) {
  zeroVector(obj.position)
  zeroVector(obj.velocity)
  obj.health = 0
  obj.isActive = false
}

/*
 * --------------------------------------------------
 * entities (array of structures)
 * --------------------------------------------------
 */

export const MAX_ENTITIES_COUNT = 2048

/** An array of Entity objects (structures). */
export const entities = new Array<Entity>(2048)
for (let i=0; i<2048; i++) {
  entities[i] = createEntity()
}

/** Zero all objects within the entities array of structures. */
export function zeroEntities() {
  for (let i=0; i<2048; i++) {
    zeroEntity(entities[i])
  }
}

/*
 * --------------------------------------------------
 * particle (structure of arrays)
 * --------------------------------------------------
 */

export const MAX_PARTICLE_COUNT = 1024

export const posX = new Array<number>(1024).fill(0)
export const posY = new Array<number>(1024).fill(0)

/** Zero an index within the particle structure of arrays. */
export function zeroParticle(idx: number) {
  posX[idx] = 0
  posY[idx] = 0
}

/** Zero the posX field within the particle structure of arrays. */
export function zeroPosX() {
  posX.fill(0)
}

/** Zero the posY field within the particle structure of arrays. */
export function zeroPosY() {
  posY.fill(0)
}

/** Zero all fields within the particle structure of arrays. */
export function zeroParticleData() {
  posX.fill(0)
  posY.fill(0)
}
```
