export interface IDocument {
  name: string;
  url: string;
  tags: { [key: string]: string }[];
}
