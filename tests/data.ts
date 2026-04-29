/*
 * Generated with game-data-gen on 4/29/2026, 8:34:48 PM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * vec (Struct)
 * --------------------------------------------------
 */

export type Vec = {
  x: number
  y: number
}

/** Create a new Vec object. */
export function createVec() {
  const obj: Vec = Object.create(null)
  obj.x = 0
  obj.y = 0
  return obj
}

/** Copy the values of Vec object b into Vec object a. */
export function copyVec(a: Vec, b: Vec) {
  a.x = b.x
  a.y = b.y
}

/** Clone the given Vec object. */
export function cloneVec(obj: Vec) {
  const clone = createVec()
  copyVec(clone, obj)
  return clone
}

/** Zero the given Vec object. */
export function zeroVec(obj: Vec) {
  obj.x = 0
  obj.y = 0
}

/*
 * --------------------------------------------------
 * obj (Struct)
 * --------------------------------------------------
 */

export type Obj = {
  str: string
  num: number
  bool: boolean
  vec: Vec
}

/** Create a new Obj object. */
export function createObj() {
  const obj: Obj = Object.create(null)
  obj.str = ""
  obj.num = 0
  obj.bool = false
  obj.vec = createVec()
  return obj
}

/** Copy the values of Obj object b into Obj object a. */
export function copyObj(a: Obj, b: Obj) {
  a.str = b.str
  a.num = b.num
  a.bool = b.bool
  a.vec = b.vec
}

/** Clone the given Obj object. */
export function cloneObj(obj: Obj) {
  const clone = createObj()
  copyObj(clone, obj)
  return clone
}

/** Zero the given Obj object. */
export function zeroObj(obj: Obj) {
  obj.str = ""
  obj.num = 0
  obj.bool = false
  zeroVec(obj.vec)
}

/*
 * --------------------------------------------------
 * data (Group)
 * --------------------------------------------------
 */

export let gStr = ""
export let gNum = 0
export let gBool = false
export const gArrStr = new Array<string>(4).fill("")
export const gArrInt8 = new Int8Array(4)
export const gArrInt16 = new Int16Array(4)
export const gArrInt32 = new Int32Array(4)
export const gArrUint8 = new Uint8Array(4)
export const gArrUint16 = new Uint16Array(4)
export const gArrUint32 = new Uint32Array(4)
export const gArrFloat32 = new Float32Array(4)
export const gArrFloat64 = new Float64Array(4)
export const gArrBool = new Array<boolean>(4).fill(false)
export const gArrStrEmpty = new Array<string>().fill("")

/** Set the value of the gStr field within the data group. */
export function setGStr(v: string) {
  gStr = v
}

/** Set the value of the gNum field within the data group. */
export function setGNum(v: number) {
  gNum = v
}

/** Set the value of the gBool field within the data group. */
export function setGBool(v: boolean) {
  gBool = v
}

/** Zero the gStr field within the data group. */
export function zeroGStr() {
  gStr = ""
}

/** Zero the gNum field within the data group. */
export function zeroGNum() {
  gNum = 0
}

/** Zero the gBool field within the data group. */
export function zeroGBool() {
  gBool = false
}

/** Zero the gArrStr field within the data group. */
export function zeroGArrStr() {
  gArrStr.fill("")
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

/** Zero the gArrBool field within the data group. */
export function zeroGArrBool() {
  gArrBool.fill(false)
}

/** Zero the gArrStrEmpty field within the data group. */
export function zeroGArrStrEmpty() {
  gArrStrEmpty.fill("")
}

/** Zero all fields within the data group. */
export function zeroData() {
  gStr = ""
  gNum = 0
  gBool = false
  gArrStr.fill("")
  gArrInt8.fill(0)
  gArrInt16.fill(0)
  gArrInt32.fill(0)
  gArrUint8.fill(0)
  gArrUint16.fill(0)
  gArrUint32.fill(0)
  gArrFloat32.fill(0)
  gArrFloat64.fill(0)
  gArrBool.fill(false)
  gArrStrEmpty.fill("")
}

/*
 * --------------------------------------------------
 * objs (Array Of Structures)
 * --------------------------------------------------
 */

export const MAX_OBJS_COUNT = 8

/** An array of Obj objects (structures). */
export const objs = Array.from({ length: 8 }, createObj)

/** Zero all objects within the objs array of structures. */
export function zeroObjs() {
  objs.forEach(zeroObj)
}

/** Zero an object at a specific index within the objs array of structures. */
export function zeroObjsAt(i: number) {
  zeroObj(objs[i])
}

/*
 * --------------------------------------------------
 * pool (Structure Of Arrays)
 * --------------------------------------------------
 */

export const MAX_POOL_COUNT = 8

export const sStr = new Array<string>(8).fill("")
export const sBool = new Array<boolean>(8).fill(false)
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
  sStr[i] = ""
  sBool[i] = false
  sInt8[i] = 0
  sInt16[i] = 0
  sInt32[i] = 0
  sUint8[i] = 0
  sUint16[i] = 0
  sUint32[i] = 0
  sFloat32[i] = 0
  sFloat64[i] = 0
}

/** Zero the sStr field within the pool structure of arrays. */
export function zeroSStr() {
  sStr.fill("")
}

/** Zero the sBool field within the pool structure of arrays. */
export function zeroSBool() {
  sBool.fill(false)
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
  sStr.fill("")
  sBool.fill(false)
  sInt8.fill(0)
  sInt16.fill(0)
  sInt32.fill(0)
  sUint8.fill(0)
  sUint16.fill(0)
  sUint32.fill(0)
  sFloat32.fill(0)
  sFloat64.fill(0)
}