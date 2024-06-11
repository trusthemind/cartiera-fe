"use client";
import { FC } from "react";
import { Table, TableProps, Button, message } from "antd";
import { useGetByBrandEnignesQuery, useLazyDeleteEngineByIDQuery } from "@/src/api/engines";
import { IEngine } from "@/src/api/engines/engines.types";
import { DeleteOutlined } from "@ant-design/icons";

export const EngineTable: FC = () => {
  const columns: TableProps<IEngine>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Fuel",
      dataIndex: "fuel",
      key: "fuel",
    },
    {
      title: "Cilinders",
      dataIndex: "cilinders",
      key: "cilinders",
      render: (cilinders) => (cilinders !== undefined && cilinders !== null ? cilinders : "0"),
    },
    {
      title: "Consumption",
      dataIndex: "consumption",
      key: "consumption",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Button type="default" danger onClick={() => record.ID && handleDelete(record.ID)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  const { data: engineData, isLoading, isError } = useGetByBrandEnignesQuery();
  const [triggerDelete, { isLoading: isDeleting, isError: deleteError }] =
    useLazyDeleteEngineByIDQuery();

  const handleDelete = async (id: number) => {
    try {
      await triggerDelete(+id);
      message.success("Engine deleted successfully");
    } catch (error) {
      message.error("Failed to delete engine");
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={engineData?.data}
      loading={isLoading || isDeleting}
      rowKey={(record) => record.ID ?? 0}
      style={{ backgroundColor: "white", borderRadius: "1rem" }}
      pagination={{ position: ["bottomCenter"], className: "pagination-centered" }}
    ></Table>
  );
};
