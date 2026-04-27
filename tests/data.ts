/*
 * Generated with game-data-gen on 4/27/2026, 11:09:13 AM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * game (Group)
 * --------------------------------------------------
 */

export let activeEntities = new Array<number>()
export let destroyedEntities = new Array<Entity>()
export let player = createEntity()

/** Set the value of the activeEntities field within the game group. */
export function setActiveEntities(value: Array<number>) {
  activeEntities = value
}

/** Set the value of the destroyedEntities field within the game group. */
export function setDestroyedEntities(value: Array<Entity>) {
  destroyedEntities = value
}

/** Set the value of the player field within the game group. */
export function setPlayer(value: Entity) {
  player = value
}

/** Zero the activeEntities field within the game group. */
export function zeroActiveEntities() {
  activeEntities.length = 0
}

/** Zero the destroyedEntities field within the game group. */
export function zeroDestroyedEntities() {
  destroyedEntities.length = 0
}

/** Zero the player field within the game group. */
export function zeroPlayer() {
  zeroEntity(player)
}

/** Zero all fields within the game group. */
export function zeroGameData() {
  activeEntities.length = 0
  destroyedEntities.length = 0
  zeroEntity(player)
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
  for (let i = 0; i < b.items.length; i++) {
    a.items[i] = b.items[i]
  }
  a.isActive = b.isActive
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

export const MAX_ENTITIES = 2048

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
export function zeroEntitiesAt(index: number) {
  zeroEntity(entities[index])
}

/*
 * --------------------------------------------------
 * particle (Structure Of Arrays)
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