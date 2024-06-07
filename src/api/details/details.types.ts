export interface IDetails {
  name: string;
  condition: "good" | "optimal" | "bad" | string;
  price: number;
}
