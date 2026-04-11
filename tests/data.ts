/*
 * Generated with game-data-gen on 4/11/2026, 3:41:54 PM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * game (group)
 * --------------------------------------------------
 */
/** Zero all fields within the game group. */
export function zeroGameData() {
}

/*
 * --------------------------------------------------
 * particle (structure of arrays)
 * --------------------------------------------------
 */
export const MAX_PARTICLE_COUNT = 2048
export const posX = new Array<number>(2048).fill(0)
export const posY = new Array<number>(2048).fill(0)
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

/*
 * --------------------------------------------------
 * vector (struct)
 * --------------------------------------------------
 */
export type Vector = {
    x: number
    y: number
}
export function createVector(): Vector {
  return {
    x: 0,
    y: 0,
  }
}
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
  pos: Vector
  vel: Vector
  items: Array<number>
  flags: Array<boolean>
    health: number
    isActive: boolean
}
export function createEntity(): Entity {
  return {
    pos: createVector(),
    vel: createVector(),
    items: new Array<number>(),
    flags: new Array<boolean>(8).fill(false),
    health: 0,
    isActive: false,
  }
}
export function zeroEntity(obj: Entity) {
  zeroVector(obj.pos)
  zeroVector(obj.vel)
  obj.items.length = 0
  obj.flags.fill(false)
  obj.health = 0
  obj.isActive = false
}

/*
 * --------------------------------------------------
 * entities (array of structures)
 * --------------------------------------------------
 */
export const entities = new Array<Entity>(length)
for (let i=0; i<2048; i++) {
  entities[i] = createEntity()
}
export function zeroEntities() {
  for (let i=0; i<2048; i++) {
    zeroEntity(entities[i])
  }
}