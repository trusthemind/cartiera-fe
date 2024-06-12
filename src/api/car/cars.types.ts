export interface ICar {
  ID?: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  owner_comment: string;
  year: number;
  owners_number: number;
  price: number;
  kilometers: number;
  brand: string;
  status: string;
  engine_id: number;
  car_model: string;
  vin_code: string;
  placement: string;
}

export interface ExICar extends ICar {
  Photos: string;
  owner_id: number;
  engine_id: number;
}

export interface Vin {
  vin: string;
  country: string;
  manufacturer: string;
  region: string;
  wmi: string;
  vds: string;
  vis: string;
  years: string[];
}
