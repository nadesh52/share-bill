import { People } from "./People";

export type Order = {
  id?: number | null;
  name?: string | null;
  price?: number | null;
  quantity?: number | null;
  people?: People[] | null;
  total?: number | null
  price_per_people?: number | null
};

export const initOrder: Order = {
  name: null,
  price: null,
  quantity: null
};

// const newOrder: Order = {
//   id: 4,
//   name: "tigo",
//   price: 500,
//   quantity: 10,
//   people: [
//     { id: 1, name: "hooo", total: 210 },
//     { id: 2, name: "hogaoo", total: 220 },
//     { id: 3, name: "hoaasoo", total: 230 },
//   ],
// };
