export interface IPaymentIntent {
  client_secret: string;
  payment_intent_id: string;
  amount: number;
  currency: string;
  status: string;
}

export interface ICreatePaymentIntentRequest {
  car_id: number;
  amount: number;
  currency?: string;
}

export interface IPayment {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  payment_intent_id: string;
  car_id: number;
  user_id: number;
  amount: number;
  currency: string;
  status: string;
  payment_method?: string;
  description?: string;
}

export interface IPaymentHistory {
  data: IPayment[];
  total: number;
}

export interface IConfirmPaymentRequest {
  payment_intent_id: string;
}

export interface IConfirmPaymentResponse {
  success: boolean;
  message: string;
  payment: IPayment;
}
