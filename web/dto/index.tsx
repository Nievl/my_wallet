export type Iform<T> = { [key in keyof T]: { value: string } } & HTMLFormElement;
