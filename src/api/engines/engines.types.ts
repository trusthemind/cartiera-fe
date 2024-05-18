import { DeletedAt } from "@/src/constants/types";

export interface IEngine {
  brand: string;
  cilinders: number;
  consumption: number;
  fuel: string;
  name: string;
}

export interface ExIEngine extends IEngine {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: DeletedAt;
}
