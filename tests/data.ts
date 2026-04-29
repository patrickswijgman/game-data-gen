/*
 * Generated with game-data-gen on 4/29/2026, 11:27:05 AM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * game (Group)
 * --------------------------------------------------
 */

export let activeEntities = new Array<Entity>()
export let activeEntityIds = new Array<number>()
export let playerId = 0

/** Set the value of the activeEntities field within the game group. */
export function setActiveEntities(v: Array<Entity>) {
  activeEntities = v
}

/** Set the value of the activeEntityIds field within the game group. */
export function setActiveEntityIds(v: Array<number>) {
  activeEntityIds = v
}

/** Set the value of the playerId field within the game group. */
export function setPlayerId(v: number) {
  playerId = v
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
export function zeroParticle(i: number) {
  type[i] = ""
  zeroVector(pos[i])
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