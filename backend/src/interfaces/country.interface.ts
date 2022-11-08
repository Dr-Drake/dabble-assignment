import { ObjectID } from "typeorm";

export interface Country {
  _id: ObjectID | string | number;
  country: string;
  year: string;
  area: number;
  total_population: number;
}
