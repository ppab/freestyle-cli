export type Argument<T = string> = Extract<keyof T, string>; // if you don't provide T when using Argument, it defaults to any.TODO: remove defalt values
export type Schema = {
  [key: string]: any;
  arguments: [];
};
