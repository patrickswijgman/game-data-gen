/*
 * Generated with game-data-gen on 5/17/2025, 12:40:47 PM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * Game (group)
 * --------------------------------------------------
 */

export const activeEntities = new Array<number>()

/** Zero the activeEntities field within the Game group. */
export function zeroActiveEntities() {
  activeEntities.length = 0
}

/** Zero all fields within the Game group. */
export function zeroGameData() {
  activeEntities.length = 0
}

/*
 * --------------------------------------------------
 * Entity (Structure of Arrays)
 * --------------------------------------------------
 */

export const posX = new Float32Array(2048)
export const posY = new Float32Array(2048)
export const isActive = new Uint8Array(2048)

/** Zero an index within the Entity Structure of Arrays. */
export function zeroEntity(idx: number) {
  posX[idx] = 0
  posY[idx] = 0
  isActive[idx] = 0
}

/** Zero the posX field within the Entity Structure of Arrays. */
export function zeroPosX() {
  posX.fill(0)
}

/** Zero the posY field within the Entity Structure of Arrays. */
export function zeroPosY() {
  posY.fill(0)
}

/** Zero the isActive field within the Entity Structure of Arrays. */
export function zeroIsActive() {
  isActive.fill(0)
}

/** Zero all fields within the Entity Structure of Arrays. */
export function zeroEntityData() {
  posX.fill(0)
  posY.fill(0)
  isActive.fill(0)
}