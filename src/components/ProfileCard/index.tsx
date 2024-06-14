"use client";
import { FC, useEffect, useState } from "react";
import { Button, Card, Avatar, Upload, message, Spin } from "antd";
import { Logout } from "@/src/helpers/logout";
import { useGetUserInfoQuery, useLazyGetUserInfoQuery } from "@/src/api/users";
import s from "./style.module.scss";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { useLazyUploadAvatarQuery } from "@/src/api/users";
import { ParseStringToPhoto } from "@/src/helpers/parseStringToPhoto";
import Image from "next/image";
import Link from "next/link";
import { AppRoutes } from "@/src/constants/constants";

export const ProfileCard: FC = () => {
  const [triggerUser, { data, isLoading, isError }] = useLazyGetUserInfoQuery();
  const [triggerUpload, { data: avatarData, isLoading: avatarLoading }] =
    useLazyUploadAvatarQuery();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(data?.avatar);

  useEffect(() => {
    triggerUser();
    return () => {};
  }, []);

  const handleUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { file } = info;
    if (file.status === "uploading") {
      return;
    }
    if (file.status === "done") {
      const formData = new FormData();
      formData.append("avatar", file.originFileObj as File);

      triggerUpload(formData);
      const newAvatarUrl = ParseStringToPhoto(data?.avatar.replace("uploads/", "") ?? "");
      setAvatarUrl(newAvatarUrl);
    }
  };

  useEffect(() => {
    const newAvatarUrl = ParseStringToPhoto(data?.avatar.replace("uploads/", "") ?? "");
    setAvatarUrl(newAvatarUrl);
    triggerUser();
  }, [data, avatarData]);

  console.log(avatarUrl, data?.avatar);

  if (isLoading && avatarLoading) return <Spin />;

  return (
    <div className={s.userHolder}>
      <Avatar
        shape="square"
        src={avatarUrl}
        className={s.avatar}
        icon={
          <UserOutlined
            style={{
              color: "var(--black)",
              scale: "2.75",
            }}
          />
        }
      />
      <Upload className={s.uploadHolder} onChange={handleUploadChange} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload New</Button>
      </Upload>
      <h1>{data?.name}</h1>
      <b>ID: {data?.customer_id.replace("cus_", "")}</b>
      {data?.is_admin && (
        <p>
          Status:
          <Link style={{ color: "var(--purple)" }} href={AppRoutes.Admin + "/p1vpcOzAQbQ"}>
            Admin
          </Link>
        </p>
      )}
      <Button onClick={Logout} icon={<LogoutOutlined />}>
        Logout
      </Button>
    </div>
  );
};
