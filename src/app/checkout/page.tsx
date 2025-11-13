"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, Spin, Typography, Result, Button } from "antd";
import { useCreatePaymentIntentMutation } from "@/src/api/payment";
import StripeProvider from "@/src/components/StripeProvider";
import CheckoutForm from "@/src/components/CheckoutForm";
import { AppRoutes } from "@/src/constants/constants";
import styles from "./page.module.scss";

const { Title } = Typography;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const carId = searchParams.get("car_id");
  const amount = searchParams.get("amount");
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const year = searchParams.get("year");

  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!carId || !amount) {
      setError("Missing required payment information");
      return;
    }

    const initializePayment = async () => {
      try {
        const result = await createPaymentIntent({
          car_id: parseInt(carId),
          amount: parseInt(amount),
          currency: "usd",
        }).unwrap();

        setClientSecret(result.client_secret);
      } catch (err: any) {
        console.error("Payment initialization error:", err);
        setError(err?.data?.message || "Failed to initialize payment");
      }
    };

    initializePayment();
  }, [carId, amount, createPaymentIntent]);

  if (error) {
    return (
      <main className={styles.checkoutPage}>
        <Card>
          <Result
            status="error"
            title="Payment Error"
            subTitle={error}
            extra={
              <Button type="primary" onClick={() => router.push(AppRoutes.Cars)}>
                Back to Cars
              </Button>
            }
          />
        </Card>
      </main>
    );
  }

  if (isLoading || !clientSecret) {
    return (
      <main className={styles.checkoutPage}>
        <Card>
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <Spin size="large" />
            <Title level={4} style={{ marginTop: "1rem" }}>
              Initializing payment...
            </Title>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className={styles.checkoutPage}>
      <Card>
        <Title level={2} style={{ textAlign: "center", marginBottom: "2rem" }}>
          Checkout
        </Title>
        <StripeProvider clientSecret={clientSecret}>
          <CheckoutForm
            amount={parseInt(amount || "0")}
            carDetails={
              brand && model && year
                ? {
                    brand,
                    model,
                    year: parseInt(year),
                  }
                : undefined
            }
          />
        </StripeProvider>
      </Card>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<Spin size="large" style={{ display: "block", margin: "3rem auto" }} />}>
      <CheckoutContent />
    </Suspense>
  );
}
