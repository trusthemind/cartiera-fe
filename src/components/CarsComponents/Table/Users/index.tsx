"use client";
import { FC, useState } from "react";
import { Table, Avatar, Typography, Modal, Button, Form, Input, message, Switch } from "antd";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/src/api/admin";
import { IUser } from "@/src/api/auth/auth.types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import s from "../style.module.scss";
export const UsersTable: FC = () => {
  const { data, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<IUser> | null>(null);

  const { data: userData } = data ?? { data: [] };

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId).unwrap();
      message.success("User deleted successfully");
      refetch();
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const showModal = (user: IUser) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
  };

  const handleUpdate = async (values: Partial<IUser>) => {
    try {
      if (currentUser && currentUser.ID) {
        await updateUser({ ...currentUser, ...values } as any).unwrap();
        message.success("User updated successfully");
        refetch();
        setIsModalVisible(false);
        setCurrentUser(null);
      }
    } catch (error) {
      message.error("Failed to update user");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string) => <Avatar src={text} />,
    },
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      key: "customer_id",
    },
    {
      title: "Admin",
      dataIndex: "is_admin",
      key: "is_admin",
      render: (isAdmin: boolean) => (isAdmin ? "Yes" : "No"),
    },
    {
      title: "Created At",
      dataIndex: "CreatedAt",
      key: "CreatedAt",
      render: (text: string) => (
        <Typography.Text>{new Date(text).toLocaleString()}</Typography.Text>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "UpdatedAt",
      key: "UpdatedAt",
      render: (text: string) => (
        <Typography.Text>{new Date(text).toLocaleString()}</Typography.Text>
      ),
    },
    {
      title: "",
      key: "actions",
      render: (text: any, record: IUser) => (
        <div className={s.action}>
          <Button type="link" onClick={() => showModal(record)}>
          <EditOutlined />
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.ID??0)}>
          <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={userData}
        loading={isLoading}
        columns={columns}
        pagination={{ position: ["bottomCenter"], className: "pagination-centered" }}
        rowKey="ID"
      />

      <Modal
        title="Update User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={currentUser || {}}
          onFinish={handleUpdate}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the user's name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the user's email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="customer_id"
            label="Customer ID"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="is_admin"
            label="Admin"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
