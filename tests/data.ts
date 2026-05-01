/*
 * Generated with game-data-gen on 5/1/2026, 5:31:32 PM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * data (Group)
 * --------------------------------------------------
 */

export let gNum = 0
export const gArrInt8 = new Int8Array(4)
export const gArrInt16 = new Int16Array(4)
export const gArrInt32 = new Int32Array(4)
export const gArrUint8 = new Uint8Array(4)
export const gArrUint16 = new Uint16Array(4)
export const gArrUint32 = new Uint32Array(4)
export const gArrFloat32 = new Float32Array(4)
export const gArrFloat64 = new Float64Array(4)
export const gArrInt16Dynamic = new Int16Array()
export let gArrInt16DynamicCount = 0

/** Set the value of the gNum field within the data group. */
export function setGNum(v: number) {
  gNum = v
}

/** Push a value onto the gArrInt16Dynamic field within the data group. */
export function pushGArrInt16Dynamic(v: number) {
  gArrInt16Dynamic[gArrInt16DynamicCount++] = v
}

/** Pop a value from the gArrInt16Dynamic field within the data group. */
export function popGArrInt16Dynamic() {
  return gArrInt16Dynamic[--gArrInt16DynamicCount]
}

/** Zero the gNum field within the data group. */
export function zeroGNum() {
  gNum = 0
}

/** Zero the gArrInt8 field within the data group. */
export function zeroGArrInt8() {
  gArrInt8.fill(0)
}

/** Zero the gArrInt16 field within the data group. */
export function zeroGArrInt16() {
  gArrInt16.fill(0)
}

/** Zero the gArrInt32 field within the data group. */
export function zeroGArrInt32() {
  gArrInt32.fill(0)
}

/** Zero the gArrUint8 field within the data group. */
export function zeroGArrUint8() {
  gArrUint8.fill(0)
}

/** Zero the gArrUint16 field within the data group. */
export function zeroGArrUint16() {
  gArrUint16.fill(0)
}

/** Zero the gArrUint32 field within the data group. */
export function zeroGArrUint32() {
  gArrUint32.fill(0)
}

/** Zero the gArrFloat32 field within the data group. */
export function zeroGArrFloat32() {
  gArrFloat32.fill(0)
}

/** Zero the gArrFloat64 field within the data group. */
export function zeroGArrFloat64() {
  gArrFloat64.fill(0)
}

/** Zero the gArrInt16Dynamic field within the data group. */
export function zeroGArrInt16Dynamic() {
  gArrInt16DynamicCount = 0
}

/** Zero all fields within the data group. */
export function zeroData() {
  gNum = 0
  gArrInt8.fill(0)
  gArrInt16.fill(0)
  gArrInt32.fill(0)
  gArrUint8.fill(0)
  gArrUint16.fill(0)
  gArrUint32.fill(0)
  gArrFloat32.fill(0)
  gArrFloat64.fill(0)
  gArrInt16DynamicCount = 0
}

/*
 * --------------------------------------------------
 * pool (Structure Of Arrays)
 * --------------------------------------------------
 */

export const MAX_POOL_COUNT = 8

export const sInt8 = new Int8Array(8)
export const sInt16 = new Int16Array(8)
export const sInt32 = new Int32Array(8)
export const sUint8 = new Uint8Array(8)
export const sUint16 = new Uint16Array(8)
export const sUint32 = new Uint32Array(8)
export const sFloat32 = new Float32Array(8)
export const sFloat64 = new Float64Array(8)

/** Zero an index within the pool structure of arrays. */
export function zeroPoolAt(i: number) {
  sInt8[i] = 0
  sInt16[i] = 0
  sInt32[i] = 0
  sUint8[i] = 0
  sUint16[i] = 0
  sUint32[i] = 0
  sFloat32[i] = 0
  sFloat64[i] = 0
}

/** Zero the sInt8 field within the pool structure of arrays. */
export function zeroSInt8() {
  sInt8.fill(0)
}

/** Zero the sInt16 field within the pool structure of arrays. */
export function zeroSInt16() {
  sInt16.fill(0)
}

/** Zero the sInt32 field within the pool structure of arrays. */
export function zeroSInt32() {
  sInt32.fill(0)
}

/** Zero the sUint8 field within the pool structure of arrays. */
export function zeroSUint8() {
  sUint8.fill(0)
}

/** Zero the sUint16 field within the pool structure of arrays. */
export function zeroSUint16() {
  sUint16.fill(0)
}

/** Zero the sUint32 field within the pool structure of arrays. */
export function zeroSUint32() {
  sUint32.fill(0)
}

/** Zero the sFloat32 field within the pool structure of arrays. */
export function zeroSFloat32() {
  sFloat32.fill(0)
}

/** Zero the sFloat64 field within the pool structure of arrays. */
export function zeroSFloat64() {
  sFloat64.fill(0)
}

/** Zero all fields within the pool structure of arrays. */
export function zeroPool() {
  sInt8.fill(0)
  sInt16.fill(0)
  sInt32.fill(0)
  sUint8.fill(0)
  sUint16.fill(0)
  sUint32.fill(0)
  sFloat32.fill(0)
  sFloat64.fill(0)
}