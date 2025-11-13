"use client";
import React from "react";
import { Card, Table, Typography, Tag, Space, Button, Empty } from "antd";
import { HistoryOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useGetPaymentHistoryQuery } from "@/src/api/payment";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/src/constants/constants";
import type { ColumnsType } from "antd/es/table";
import { IPayment } from "@/src/api/payment/payment.types";
import styles from "./page.module.scss";

const { Title, Text } = Typography;

const PaymentHistoryPage = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetPaymentHistoryQuery();

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      succeeded: "success",
      processing: "processing",
      pending: "warning",
      failed: "error",
      canceled: "default",
    };
    return statusColors[status] || "default";
  };

  const columns: ColumnsType<IPayment> = [
    {
      title: "Payment ID",
      dataIndex: "payment_intent_id",
      key: "payment_intent_id",
      render: (text: string) => (
        <Text code style={{ fontSize: "0.85rem" }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Date",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime(),
      defaultSortOrder: "descend",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number, record: IPayment) => (
        <Text strong style={{ color: "var(--purple)" }}>
          ${(amount / 100).toFixed(2)} {record.currency.toUpperCase()}
        </Text>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
      filters: [
        { text: "Succeeded", value: "succeeded" },
        { text: "Processing", value: "processing" },
        { text: "Pending", value: "pending" },
        { text: "Failed", value: "failed" },
        { text: "Canceled", value: "canceled" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Car ID",
      dataIndex: "car_id",
      key: "car_id",
      render: (carId: number) => <Text>#{carId}</Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => text || <Text type="secondary">-</Text>,
    },
  ];

  return (
    <main className={styles.historyPage}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div className={styles.header}>
            <Space>
              <HistoryOutlined style={{ fontSize: "2rem", color: "var(--purple)" }} />
              <Title level={2} style={{ margin: 0 }}>
                Payment History
              </Title>
            </Space>
            <Button
              type="primary"
              icon={<ShoppingOutlined />}
              onClick={() => router.push(AppRoutes.Cars)}
            >
              Browse Cars
            </Button>
          </div>

          {error && (
            <Empty
              description="Failed to load payment history"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            >
              <Button type="primary" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </Empty>
          )}

          {!error && (
            <Table
              columns={columns}
              dataSource={data?.data || []}
              loading={isLoading}
              rowKey="ID"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} payments`,
              }}
              locale={{
                emptyText: (
                  <Empty
                    description="No payment history yet"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  >
                    <Button
                      type="primary"
                      icon={<ShoppingOutlined />}
                      onClick={() => router.push(AppRoutes.Cars)}
                    >
                      Start Shopping
                    </Button>
                  </Empty>
                ),
              }}
            />
          )}
        </Space>
      </Card>
    </main>
  );
};

export default PaymentHistoryPage;
