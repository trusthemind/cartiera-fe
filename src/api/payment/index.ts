import { ResponceMessage } from "@/src/constants/types";
import { api } from "..";
import {
  IPaymentIntent,
  ICreatePaymentIntentRequest,
  IPayment,
  IPaymentHistory,
  IConfirmPaymentRequest,
  IConfirmPaymentResponse,
} from "./payment.types";

const paymentApi = api.injectEndpoints({
  endpoints: (build) => ({
    createPaymentIntent: build.mutation<IPaymentIntent, ICreatePaymentIntentRequest>({
      query: (body) => ({
        url: "payments/create-intent",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payments"],
    }),
    confirmPayment: build.mutation<IConfirmPaymentResponse, IConfirmPaymentRequest>({
      query: (body) => ({
        url: "payments/confirm",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payments", "Cars"],
    }),
    getPaymentHistory: build.query<IPaymentHistory, void>({
      query: () => ({
        url: "payments/history",
        method: "GET",
      }),
      providesTags: ["Payments"],
    }),
    getPaymentById: build.query<{ data: IPayment }, string>({
      query: (id) => ({
        url: `payments/${id}`,
        method: "GET",
      }),
      providesTags: ["Payments"],
    }),
    cancelPayment: build.mutation<ResponceMessage, string>({
      query: (payment_intent_id) => ({
        url: `payments/cancel/${payment_intent_id}`,
        method: "POST",
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
  useGetPaymentHistoryQuery,
  useLazyGetPaymentHistoryQuery,
  useGetPaymentByIdQuery,
  useLazyGetPaymentByIdQuery,
  useCancelPaymentMutation,
} = paymentApi;
