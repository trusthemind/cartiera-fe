export interface ICar {
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
