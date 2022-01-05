type ParseResult<T extends Record<string, any>> = {
  [P in keyof T]: string;
};
export default ParseResult;

type formWithValue<T extends string[]> = {
  [key in keyof T]: { value: string };
} & HTMLFormElement;
