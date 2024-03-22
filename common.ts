/**
 * Type of key-value like.
 */
export type KeyValueLike<V extends string = string> = { [key: string]: V; } | Map<string, V> | Record<string, V>;
