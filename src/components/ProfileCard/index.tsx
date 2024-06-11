"use client";
import { FC, useEffect, useState } from "react";
import { Button, Card, Avatar, Upload, message } from "antd";
import { Logout } from "@/src/helpers/logout";
import { useGetUserInfoQuery } from "@/src/api/users";
import s from "./style.module.scss";
import { UserOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { useLazyUploadAvatarQuery } from "@/src/api/users";
import { ParseStringToPhoto } from "@/src/helpers/parseStringToPhoto";
import Image from "next/image";

export const ProfileCard: FC = () => {
  const { data, isLoading, isError } = useGetUserInfoQuery();
  const [trigger, { data: avatarData, isLoading: avatarLoading }] = useLazyUploadAvatarQuery();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(data?.avatar);

  const handleUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { file } = info;
    if (file.status === "uploading") {
      return;
    }
    if (file.status === "done") {
      const formData = new FormData();
      formData.append("avatar", file.originFileObj as File);

      trigger(formData);
      const newAvatarUrl = ParseStringToPhoto(data?.avatar.replace("uploads/", "") ?? "");
      setAvatarUrl(newAvatarUrl);
    }
  };

  useEffect(() => {
    const newAvatarUrl = ParseStringToPhoto(data?.avatar.replace("uploads/", "") ?? "");
    setAvatarUrl(newAvatarUrl);
  }, [data, avatarData]);

  console.log(avatarUrl, data?.avatar);

  if (isLoading) return "Is loading...";

  return (
    <div className={s.userHolder}>
      <Avatar
      shape="square"
        src={avatarUrl}
        className={s.avatar}
        icon={
          <UserOutlined
            style={{ background: "var(--purple)", color: "var(--black)", scale: "2.5" }}
          />
        }
      />
      <Upload className={s.uploadHolder} onChange={handleUploadChange} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload New</Button>
      </Upload>
      <h1>{data?.name}</h1>
      <b>ID: {data?.customer_id.replace("cus_", "")}</b>
      <b style={{ color: "var(--purple)" }}>{data?.is_admin && "admin"}</b>
    </div>
  );
};
