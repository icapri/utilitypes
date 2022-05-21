/**
 * Represents an abstract class type.
 */
export type AbstractClass<T = any> = Function & { prototype: T };

/**
 * Represents the type of the array items.
 */
export type ArrayItem<TArray extends readonly unknown[]> =
  TArray extends readonly (infer TItem)[] ? TItem : never;

/**
 * Represents the type of a class.
 */
export type Class<T = any> = AbstractClass<T> | InstantiableClass<T>;

/**
 * Represents the type of the constructor of an object.
 */
export type ConstructorType<T = any> = new (...args: any[]) => T;

/**
 * Represents the falsy values.
 */
export type Falsy = "" | 0 | false | null | undefined;

/**
 * Represents the keys of a given object which are of type function.
 *
 * **Example:**
 * ```typescript
 * class Cube {
 *   a: number = 5;
 *   getVolume = () => 125;
 * }
 *
 * const funcKey: FuncKey<Cube> = "getVolume"; // correct!
 * const funcKey: FuncKey<Cube> = "a"; // error!
 * ```
 */
export type FuncKey<TObject extends object> = {
  [TKey in keyof TObject]-?: NonIndefinable<TObject[TKey]> extends Function
    ? TKey
    : never;
}[keyof TObject];

/**
 * Represents a type which checks for type equality.
 */
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

/**
 * @see ConstructorType
 * Represents the type of the constructor of an object.
 */
export type InstantiableClass<T = any> = ConstructorType<T>;

/**
 * Represents an integer.
 *
 * **Example:**
 * ```typescript
 * function f<N extends number>(x: Integer<N>) {
 *   // ...
 * }
 *
 * f(2.1) // error!
 * ```
 */
export type Integer<TNumber extends number> = number extends TNumber
  ? never
  : `${TNumber}` extends `${string}.${string}`
  ? never
  : TNumber;

/**
 * Represents the keys of the properties of a given object which are of a given
 * value type.
 *
 * **Example**
 * ```typescript
 * class User {
 *   name: string = 'John';
 *   age: number = 24;
 * }
 *
 * const x: KeysOfType<User, string> = 'name'; // correct!
 * const y: KeysOfType<User, number> = 'name'; // error!
 * ```
 */
export type KeysWithValueType<TObject, TValueType> = {
  [TKey in keyof TObject]-?: TObject[TKey] extends TValueType ? TKey : never;
}[keyof TObject];

/**
 * Represents a type whose properties are mutable.
 */
export type Mutable<T> = {
  -readonly [TKey in keyof T]: T[TKey];
};

/**
 * Represents a negative integer.
 *
 * **Example:**
 * ```typescript
 * function f<N extends number>(x: NegativeInteger<N>) {
 *   // ...
 * }
 *
 * f(2) // error!
 * ```
 */
export type NegativeInteger<TNumber extends number> = number extends TNumber
  ? never
  : `${TNumber}` extends `${string}.${string}`
  ? never
  : `${TNumber}` extends `-${string}`
  ? TNumber
  : never;

/**
 * Represents the keys of the properties of the given object.
 *
 * **Example:**
 * ```typescript
 * class Cube {
 *   a: number = 5;
 *   getVolume = () => 125;
 * }
 *
 * const nonFuncKey: NonFuncKey<Cube> = "a"; // correct!
 * const nonFuncKey: NonFuncKey<Cube> = "getVolume"; // error!
 * ```
 */
export type NonFuncKey<TObject extends object> = {
  [TKey in keyof TObject]-?: NonIndefinable<TObject[TKey]> extends Function
    ? never
    : TKey;
}[keyof TObject];

/**
 * Represents a type which can never be undefined.
 */
export type NonIndefinable<T> = T extends undefined ? never : T;

/**
 * Represents a type composed of the writable properties of an object.
 */
export type NonReadonly<T> = {
  [TKey in keyof T]-?: IfEquals<
    { [Q in TKey]: T[TKey] },
    { -readonly [Q in TKey]: T[TKey] },
    TKey
  >;
}[keyof T];

/**
 * Represents a type which could possibly be null.
 */
export type Nullable<T> = T | null;

/**
 * Represents a type which could possibly be null or undefined.
 */
export type Nullish<T> = T | null | undefined;

/**
 * Represents the type of the keys of an object.
 */
export type ObjectKey<TObject extends object> = keyof TObject;

/**
 * Represents a type which makes the given properties optional from the given object.
 */
export type Optional<TObject extends object, TKey extends keyof TObject> = Omit<
  TObject,
  TKey
> &
  Partial<Pick<TObject, TKey>>;

/**
 * Represents a type which consists of the optional properties of a given object.
 */
export type OptionalKey<TObject extends object> = {
  [TKey in keyof TObject]-?: {} extends { [P in TKey]: TObject[TKey] }
    ? TKey
    : never;
}[keyof TObject];

/**
 * Represents a type composed of the required object properties.
 */
export type PickRequired<T> = Pick<T, RequiredKey<T>>;

/**
 * Represents the type of a plain object.
 */
export type PlainObject<T> = { [id: string]: T };

/**
 * Represents a positive integer.
 *
 * **Example:**
 * ```typescript
 * function f<N extends number>(x: PositiveInteger<N>) {
 *   // ...
 * }
 *
 * f(-1.69) // error!
 * ```
 */
export type PositiveInteger<TNumber extends number> = number extends TNumber
  ? never
  : `${TNumber}` extends `-${string}` | `${string}.${string}`
  ? never
  : TNumber;

/**
 * Represents the primitive types in TypeScript (JavaScript).
 */
export type Primitive =
  | bigint
  | boolean
  | null
  | number
  | string
  | symbol
  | undefined;

/**
 * Represents the type of the given object property.
 */
export type PropertyType<
  TObject extends object,
  TKey extends keyof TObject
> = TObject[TKey];

/**
 * Represents a type composed of the readonly keys of an object.
 */
export type ReadonlyKeys<T> = {
  [TKey in keyof T]-?: IfEquals<
    { [Q in TKey]: T[TKey] },
    { -readonly [Q in TKey]: T[TKey] },
    never,
    TKey
  >;
}[keyof T];

/**
 * Represents a type which consists of the required properties of an object.
 */
export type RequiredKey<T> = {
  [TKey in keyof T]-?: {} extends { [P in TKey]: T[TKey] } ? never : TKey;
}[keyof T];
