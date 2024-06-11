import { Order } from "./Order";

export type People = {
  id: number;
  name: string;
  order?: Order[];
  total?: number;
};
