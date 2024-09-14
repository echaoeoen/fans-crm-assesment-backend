// eslint-disable-next-line @typescript-eslint/ban-types
export type PropertyOnly<T> = Partial<{
  [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: T[K];
}>;
