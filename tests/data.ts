/*
 * Generated with game-data-gen on 5/1/2026, 5:55:31 PM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * data (Group)
 * --------------------------------------------------
 */

export let gNum = 0
export const gArrInt8 = new Int8Array(4)
export let gArrInt8Count = 0
export const gArrInt16 = new Int16Array(4)
export let gArrInt16Count = 0
export const gArrInt32 = new Int32Array(4)
export let gArrInt32Count = 0
export const gArrUint8 = new Uint8Array(4)
export let gArrUint8Count = 0
export const gArrUint16 = new Uint16Array(4)
export let gArrUint16Count = 0
export const gArrUint32 = new Uint32Array(4)
export let gArrUint32Count = 0
export const gArrFloat32 = new Float32Array(4)
export let gArrFloat32Count = 0
export const gArrFloat64 = new Float64Array(4)
export let gArrFloat64Count = 0

/** Set the value of the gNum field within the data group. */
export function setGNum(v: number) {
  gNum = v
}

/** Push a value onto the gArrInt8 field within the data group. */
export function pushGArrInt8(v: number) {
  gArrInt8[gArrInt8Count++] = v
}

/** Push a value onto the gArrInt16 field within the data group. */
export function pushGArrInt16(v: number) {
  gArrInt16[gArrInt16Count++] = v
}

/** Push a value onto the gArrInt32 field within the data group. */
export function pushGArrInt32(v: number) {
  gArrInt32[gArrInt32Count++] = v
}

/** Push a value onto the gArrUint8 field within the data group. */
export function pushGArrUint8(v: number) {
  gArrUint8[gArrUint8Count++] = v
}

/** Push a value onto the gArrUint16 field within the data group. */
export function pushGArrUint16(v: number) {
  gArrUint16[gArrUint16Count++] = v
}

/** Push a value onto the gArrUint32 field within the data group. */
export function pushGArrUint32(v: number) {
  gArrUint32[gArrUint32Count++] = v
}

/** Push a value onto the gArrFloat32 field within the data group. */
export function pushGArrFloat32(v: number) {
  gArrFloat32[gArrFloat32Count++] = v
}

/** Push a value onto the gArrFloat64 field within the data group. */
export function pushGArrFloat64(v: number) {
  gArrFloat64[gArrFloat64Count++] = v
}

/** Pop a value from the gArrInt8 field within the data group. */
export function popGArrInt8() {
  return gArrInt8[--gArrInt8Count]
}

/** Pop a value from the gArrInt16 field within the data group. */
export function popGArrInt16() {
  return gArrInt16[--gArrInt16Count]
}

/** Pop a value from the gArrInt32 field within the data group. */
export function popGArrInt32() {
  return gArrInt32[--gArrInt32Count]
}

/** Pop a value from the gArrUint8 field within the data group. */
export function popGArrUint8() {
  return gArrUint8[--gArrUint8Count]
}

/** Pop a value from the gArrUint16 field within the data group. */
export function popGArrUint16() {
  return gArrUint16[--gArrUint16Count]
}

/** Pop a value from the gArrUint32 field within the data group. */
export function popGArrUint32() {
  return gArrUint32[--gArrUint32Count]
}

/** Pop a value from the gArrFloat32 field within the data group. */
export function popGArrFloat32() {
  return gArrFloat32[--gArrFloat32Count]
}

/** Pop a value from the gArrFloat64 field within the data group. */
export function popGArrFloat64() {
  return gArrFloat64[--gArrFloat64Count]
}

/** Zero the gNum field within the data group. */
export function zeroGNum() {
  gNum = 0
}

/** Zero the gArrInt8 field within the data group. */
export function zeroGArrInt8() {
  gArrInt8Count = 0
}

/** Zero the gArrInt16 field within the data group. */
export function zeroGArrInt16() {
  gArrInt16Count = 0
}

/** Zero the gArrInt32 field within the data group. */
export function zeroGArrInt32() {
  gArrInt32Count = 0
}

/** Zero the gArrUint8 field within the data group. */
export function zeroGArrUint8() {
  gArrUint8Count = 0
}

/** Zero the gArrUint16 field within the data group. */
export function zeroGArrUint16() {
  gArrUint16Count = 0
}

/** Zero the gArrUint32 field within the data group. */
export function zeroGArrUint32() {
  gArrUint32Count = 0
}

/** Zero the gArrFloat32 field within the data group. */
export function zeroGArrFloat32() {
  gArrFloat32Count = 0
}

/** Zero the gArrFloat64 field within the data group. */
export function zeroGArrFloat64() {
  gArrFloat64Count = 0
}

/** Zero all fields within the data group. */
export function zeroData() {
  gNum = 0
  gArrInt8Count = 0
  gArrInt16Count = 0
  gArrInt32Count = 0
  gArrUint8Count = 0
  gArrUint16Count = 0
  gArrUint32Count = 0
  gArrFloat32Count = 0
  gArrFloat64Count = 0
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