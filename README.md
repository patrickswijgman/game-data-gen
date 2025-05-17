# Game Data Generation

A Typescript library to generate data structures with zeroing functions.

## The problems

If you're making a game in Javascript then you might (this was actually me):

- hit the Garbage Collector a bunch causing frame drops because you're creating/destroying objects every frame (particles, for example)
- read a book about [Data Oriented Design](https://www.amazon.com/dp/1916478700)
- notice the performance implications of OOP (especially classes and calling their methods)
- wanting to implement Structure of Arrays instead of Array of Structures (which is a list of class instances)
- notice that Javascript can not zero out memory like languages such as C and Rust

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
name type? length?
fieldName fieldType fieldArrayType? fieldArrayLength?
```

### name

The name of the data structure.

### type (optional)

Supported data structure types:

- soa (Structure of Arrays)

If no type is given, it will act as a group which gets a zero function for the whole group.

### length (optional)

The length of the arrays within the Structure of Arrays data structure.

If no length is given to the type and no length is given to a field it is considered a dynamic array and zeroing will set the array's length back to zero (emptying it).

### fieldName

The name of one of the fields within the data structure.

### fieldType

Supported field types:

- array

### fieldArrayType (optional, required if fieldType=array)

Supported array field types:

- number
- int8
- int16
- int32
- uint8
- uint16
- uint32
- float32
- float64

### fieldArrayLength (optional)

The length of the array field.

In case of a Structure of Arrays data structure (type=soa), setting the length on the type is recommended so that all arrays have the same length.

## Example

Create a plain text file somewhere in your source code (it does not need a file extension). For example `src/data/game`:

```
Game
activeEntities array number

Entity soa 2048
posX array float32
posy array float32
isActive array uint8
```

Run the package with (consider making this a script in your package.json):

```shell
npx game-data-gen src/data/game
```

This will create or update the `src/data/game.ts` file:

```typescript
/*
 * --------------------------------------------------
 * Game
 * --------------------------------------------------
 */

export const activeEntities = new Array<number>();

/** Zero the activeEntities field within the Game group. */
export function zeroActiveEntities() {
  activeEntities.length = 0;
}

/** Zero all fields within the Game group. */
export function zeroGameData() {
  activeEntities.length = 0;
}

/*
 * --------------------------------------------------
 * Entity
 * --------------------------------------------------
 */

export const posX = new Float32Array(2048);
export const posY = new Float32Array(2048);
export const isActive = new Uint8Array(2048);

/** Zero an index within the Entity Structure of Arrays. */
export function zeroEntity(idx: number) {
  posX[idx] = 0;
  posY[idx] = 0;
  isActive[idx] = 0;
}

/** Zero the posX field within the Entity Structure of Arrays. */
export function zeroPosX() {
  posX.fill(0);
}

/** Zero the posY field within the Entity Structure of Arrays. */
export function zeroPosY() {
  posY.fill(0);
}

/** Zero the isActive field within the Entity Structure of Arrays. */
export function zeroIsActive() {
  isActive.fill(0);
}

/** Zero all fields within the Entity Structure of Arrays. */
export function zeroEntityData() {
  posX.fill(0);
  posY.fill(0);
  isActive.fill(0);
}
```

Then import the data and its functions from `src/data/game.ts` into your code.
