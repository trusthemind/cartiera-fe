import { AppRoutes } from "@/src/constants/constants";
import { SendOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Button, Typography } from "antd";
import Link from "next/link";
import { FC } from "react";
import s from "./style.module.scss";

type FormTitleProps = {
  text: string;
  backStep?: string;
};

export const FormTitle: FC<FormTitleProps> = ({ text, backStep }) => {
  return (
    <div className={s.titleContainer}>
      <Button
        type="link"
        style={{ position: "absolute", left: "2.5rem" }}
        href={backStep ?? AppRoutes.Home}
        icon={<SendOutlined style={{ transform: "rotate(180deg)", color: "var(--purple)" }} />}
      ></Button>
      <Link href={AppRoutes.Home}></Link>
      <Typography style={{ fontSize: 24 }}>{text}</Typography>
    </div>
  );
};
