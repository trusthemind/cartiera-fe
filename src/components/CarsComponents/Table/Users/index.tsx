"use client";
import { FC, useState } from "react";
import { Table, Avatar, Typography, Modal, Button, Form, Input, message, Switch } from "antd";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
} from "@/src/api/admin";
import { IUser, RequestUser } from "@/src/api/auth/auth.types";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import s from "../style.module.scss";
import { ParseStringToPhoto } from "@/src/helpers/parseStringToPhoto";

export const UsersTable: FC = () => {
  const { data, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [createUser] = useCreateUserMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);
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

  const showUpdateModal = (user: IUser) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const showRegistrationModal = () => {
    setIsRegistrationModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsRegistrationModalVisible(false);
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

  const handleRegistration = async (values: Partial<RequestUser>) => {
    if (values) {
      const newUser: RequestUser = {
        name: values.name ?? "",
        email: values.email ?? "",
        password: values.password ?? "",
        is_customer: values.is_customer ?? false,
      };
      try {
        await createUser(newUser).unwrap();
        message.success("User registered successfully");
        refetch();
        setIsRegistrationModalVisible(false);
      } catch (error) {
        message.error("Failed to register user");
      }
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
      render: (url: string) => <Avatar src={ParseStringToPhoto(url.replace("uploads/", ""))} />,
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
      render: (_: any, record: IUser) => (
        <div className={s.action}>
          <Button type="default" onClick={() => showUpdateModal(record)}>
            <EditOutlined />
          </Button>
          <Button type="default" danger onClick={() => handleDelete(record.ID ?? 0)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showRegistrationModal}
        style={{ marginBottom: 16 }}
      >
        Add User
      </Button>

      <Table
        dataSource={userData}
        loading={isLoading}
        columns={columns}
        pagination={{ position: ["bottomCenter"], className: "pagination-centered" }}
        rowKey="ID"
      />

      <Modal title="Update User" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form initialValues={currentUser || {}} onFinish={handleUpdate}>
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
          <Form.Item name="customer_id" label="Customer ID">
            <Input />
          </Form.Item>
          <Form.Item name="is_admin" label="Admin" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Register User"
        visible={isRegistrationModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleRegistration}>
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
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="is_customer" label="Customer" valuePropName="checked">
            <Switch defaultChecked={true} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
