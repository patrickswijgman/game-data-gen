/*
 * Generated with game-data-gen on 4/11/2026, 4:10:14 PM. DO NOT MODIFY THIS FILE!
 */

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
  return {
    x: 0,
    y: 0,
  }
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
  return {
    position: createVector(),
    velocity: createVector(),
    health: 0,
    isActive: false,
  }
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
export const entities = new Array<Entity>(length)
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