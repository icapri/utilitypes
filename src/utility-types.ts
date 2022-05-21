/**
 * Represents the type of the array items.
 */
export type ArrayItem<TArray extends readonly unknown[]> =
  TArray extends readonly (infer TItem)[] ? TItem : never;

/**
 * Represents the type of the constructor of an object.
 */
export type ConstructorType<T extends object = {}> = new (...args: any[]) => T;

/**
 * Represents a type which checks for type equality.
 */
type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

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
