"use client";
import { FC, useState } from "react";
import { Table, TableProps, Button, message, Modal, Form, Input } from "antd";
import {
  useGetByBrandEnignesQuery,
  useLazyDeleteEngineByIDQuery,
  useLazyUpdateEngineQuery,
} from "@/src/api/engines";
import { EditEngine, IEngine } from "@/src/api/engines/engines.types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import s from "../style.module.scss";

export const EngineTable: FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentEngine, setCurrentEngine] = useState<IEngine | null>(null);

  const columns: TableProps<IEngine>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b style={{ color: "var(--purple)" }}>{text}</b>,
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
        <div className={s.action}>
          <Button type="default" onClick={() => record.ID && handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Button type="default" danger onClick={() => record.ID && handleDelete(record.ID)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const { data: engineData, isLoading, isError, refetch:refetchEngine } = useGetByBrandEnignesQuery();
  const [triggerDelete, { isLoading: isDeleting }] = useLazyDeleteEngineByIDQuery();
  const [triggerUpdate, { isLoading: isUpdating }] = useLazyUpdateEngineQuery();

  const handleDelete = async (id: number) => {
    try {
      await triggerDelete(+id);
      message.success("Engine deleted successfully");
    } catch (error) {
      message.error("Failed to delete engine");
    }
    refetchEngine();
  };

  const handleEdit = (record: IEngine) => {
    setCurrentEngine(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await triggerUpdate({ ...values, ID: currentEngine?.ID });
      message.success("Engine updated successfully");
      setIsModalOpen(false);
      setCurrentEngine(null);
    } catch (error) {
      message.error("Failed to update engine");
    }
    refetchEngine();
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={engineData?.data}
        loading={isLoading || isDeleting || isUpdating}
        rowKey={(record) => record.ID ?? 0}
        style={{ backgroundColor: "white", borderRadius: "1rem" }}
        pagination={{ position: ["bottomCenter"], className: "pagination-centered" }}
      />
      <Modal
        title="Edit Engine"
        visible={isModalOpen}
        onOk={handleUpdate}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the engine name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: "Please input the brand!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fuel"
            label="Fuel"
            rules={[{ required: true, message: "Please input the fuel type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="cilinders" label="Cilinders">
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="consumption"
            label="Consumption"
            rules={[{ required: true, message: "Please input the consumption!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
