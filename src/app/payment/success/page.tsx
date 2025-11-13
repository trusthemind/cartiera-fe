"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, Result, Button, Space, Typography, Spin } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { AppRoutes } from "@/src/constants/constants";
import { useConfirmPaymentMutation } from "@/src/api/payment";
import styles from "./page.module.scss";

const { Text, Paragraph } = Typography;

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentIntentId = searchParams.get("payment_intent");
  const [confirmPayment, { isLoading }] = useConfirmPaymentMutation();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentIntentId) {
      setError("No payment information found");
      return;
    }

    const confirmPaymentIntent = async () => {
      try {
        const result = await confirmPayment({
          payment_intent_id: paymentIntentId,
        }).unwrap();

        setPaymentDetails(result.payment);
      } catch (err: any) {
        console.error("Payment confirmation error:", err);
        setError(err?.data?.message || "Failed to confirm payment");
      }
    };

    confirmPaymentIntent();
  }, [paymentIntentId, confirmPayment]);

  if (isLoading) {
    return (
      <main className={styles.successPage}>
        <Card>
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <Spin size="large" />
            <Paragraph style={{ marginTop: "1rem" }}>
              Confirming your payment...
            </Paragraph>
          </div>
        </Card>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.successPage}>
        <Card>
          <Result
            status="warning"
            title="Payment Verification Issue"
            subTitle={error}
            extra={[
              <Button type="primary" key="home" onClick={() => router.push(AppRoutes.Home)}>
                Go Home
              </Button>,
              <Button key="history" onClick={() => router.push(AppRoutes.PaymentHistory)}>
                View Payment History
              </Button>,
            ]}
          />
        </Card>
      </main>
    );
  }

  return (
    <main className={styles.successPage}>
      <Card>
        <Result
          status="success"
          icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
          title="Payment Successful!"
          subTitle="Thank you for your purchase. Your payment has been processed successfully."
          extra={[
            <Space key="details" direction="vertical" size="middle" style={{ width: "100%" }}>
              {paymentDetails && (
                <div className={styles.paymentDetails}>
                  <Space direction="vertical" size="small">
                    <div className={styles.detailRow}>
                      <Text type="secondary">Payment ID:</Text>
                      <Text code>{paymentDetails.payment_intent_id}</Text>
                    </div>
                    <div className={styles.detailRow}>
                      <Text type="secondary">Amount:</Text>
                      <Text strong style={{ color: "var(--purple)" }}>
                        ${(paymentDetails.amount / 100).toFixed(2)} {paymentDetails.currency.toUpperCase()}
                      </Text>
                    </div>
                    <div className={styles.detailRow}>
                      <Text type="secondary">Status:</Text>
                      <Text type="success" strong>
                        {paymentDetails.status.toUpperCase()}
                      </Text>
                    </div>
                    {paymentDetails.CreatedAt && (
                      <div className={styles.detailRow}>
                        <Text type="secondary">Date:</Text>
                        <Text>{new Date(paymentDetails.CreatedAt).toLocaleString()}</Text>
                      </div>
                    )}
                  </Space>
                </div>
              )}
              <Space style={{ width: "100%", justifyContent: "center" }}>
                <Button type="primary" onClick={() => router.push(AppRoutes.Home)}>
                  Go Home
                </Button>
                <Button onClick={() => router.push(AppRoutes.PaymentHistory)}>
                  View Payment History
                </Button>
                <Button onClick={() => router.push(AppRoutes.Cars)}>
                  Browse More Cars
                </Button>
              </Space>
            </Space>,
          ]}
        />
      </Card>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<Spin size="large" style={{ display: "block", margin: "3rem auto" }} />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
