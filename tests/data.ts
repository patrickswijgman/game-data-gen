/*
 * Generated with game-data-gen on 4/12/2026, 1:58:26 PM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * game (group)
 * --------------------------------------------------
 */

export let activeEntities = new Set<number>()
export let destroyedEntities = new Set<number>()
export let player = createEntity()

/** Set the value of the activeEntities field within the game group. */
export function setActiveEntities(value: Set<number>) {
  activeEntities = value
}

/** Set the value of the destroyedEntities field within the game group. */
export function setDestroyedEntities(value: Set<number>) {
  destroyedEntities = value
}

/** Set the value of the player field within the game group. */
export function setPlayer(value: Entity) {
  player = value
}

/** Zero the activeEntities field within the game group. */
export function zeroActiveEntities() {
  activeEntities.clear()
}

/** Zero the destroyedEntities field within the game group. */
export function zeroDestroyedEntities() {
  destroyedEntities.clear()
}

/** Zero the player field within the game group. */
export function zeroPlayer() {
  zeroEntity(player)
}

/** Zero all fields within the game group. */
export function zeroGameData() {
  activeEntities.clear()
  destroyedEntities.clear()
  zeroEntity(player)
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
  items: Set<number>
  isActive: boolean
}

/** Create a new Entity object. */
export function createEntity(): Entity {
  const obj = Object.create(null)
  obj.position = createVector()
  obj.velocity = createVector()
  obj.health = 0
  obj.items = new Set<number>()
  obj.isActive = false
  return obj
}

/** Zero the given Entity object. */
export function zeroEntity(obj: Entity) {
  zeroVector(obj.position)
  zeroVector(obj.velocity)
  obj.health = 0
  obj.items.clear()
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

/** Zero an object at a specific index within the entities array of structures. */
export function zeroEntityAt(index: number) {
  zeroEntity(entities[index])
}

/*
 * --------------------------------------------------
 * particle (structure of arrays)
 * --------------------------------------------------
 */

export const MAX_PARTICLE_COUNT = 1024

export let posX = new Array<number>(1024).fill(0)
export let posY = new Array<number>(1024).fill(0)

/** Set the value of the posX field within the particle structure of arrays. */
export function setPosX(value: Array<number>) {
  posX = value
}

/** Set the value of the posY field within the particle structure of arrays. */
export function setPosY(value: Array<number>) {
  posY = value
}

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
