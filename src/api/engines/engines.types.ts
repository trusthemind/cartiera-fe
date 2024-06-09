import { DeletedAt } from "@/src/constants/types";

export interface IEngine {
  ID?: number;
  CreatedAt?: string;
  updatedAt?:string;
  brand: string;
  cilinders: number;
  consumption: number;
  fuel: string;
  name: string;
}

export interface ExIEngine extends IEngine {
  ID: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: DeletedAt;
}
