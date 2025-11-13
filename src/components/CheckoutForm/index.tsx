"use client";
import React, { FormEvent, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, message, Space, Typography } from "antd";
import { AppRoutes } from "@/src/constants/constants";
import styles from "./CheckoutForm.module.scss";

const { Text, Title } = Typography;

interface CheckoutFormProps {
  amount: number;
  carDetails?: {
    brand: string;
    model: string;
    year: number;
  };
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, carDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}${AppRoutes.PaymentSuccess}`,
        },
        redirect: "if_required",
      });

      if (error) {
        message.error(error.message || "Payment failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        message.success("Payment successful!");
        window.location.href = `${AppRoutes.PaymentSuccess}?payment_intent=${paymentIntent.id}`;
      }
    } catch (err) {
      message.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {carDetails && (
          <div className={styles.orderSummary}>
            <Title level={4}>Order Summary</Title>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <div className={styles.summaryRow}>
                <Text>Vehicle:</Text>
                <Text strong>
                  {carDetails.year} {carDetails.brand} {carDetails.model}
                </Text>
              </div>
              <div className={styles.summaryRow}>
                <Text>Total Amount:</Text>
                <Text strong style={{ fontSize: "1.25rem", color: "var(--purple)" }}>
                  ${(amount / 100).toFixed(2)}
                </Text>
              </div>
            </Space>
          </div>
        )}

        <PaymentElement />

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isProcessing}
          disabled={!stripe || !elements || isProcessing}
          block
        >
          {isProcessing ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
        </Button>
      </Space>
    </form>
  );
};

export default CheckoutForm;
