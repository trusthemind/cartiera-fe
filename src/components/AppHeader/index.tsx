"use client";
import s from "./style.module.scss";
import { AppRoutes, NavigationList } from "@/src/constants/constants";
import Link from "next/link";
import Avatar from "antd/es/avatar";
import cn from "classnames";
import { useCurrentPathEqual } from "@/src/helpers/pathEqual";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Cookies from "js-cookie";
import { Logout } from "@/src/helpers/logout";
import { useAppSelector } from "@/src/redux/hooks";
import { useEffect, useState } from "react";

export const AppHeader = () => {
  const { isEqual: IsHome } = useCurrentPathEqual(AppRoutes.Home);
  const [avatarURL, setAvatarURL] = useState(null);

  useEffect(() => {
    if (document && localStorage) {
      return () => {
        const persitAuth = localStorage && localStorage.getItem("persist:auth");
        // const { avatar } = JSON.parse(persitAuth ?? "");
        // setAvatarURL(avatar?.replace(/["']/g, ""));
      };
    }
  }, []);

  return (
    <header className={s.headerContainer}>
      <h1 className={cn(s.textLogo, { [s.textDarkLogo]: false })}>Cartiera Sales</h1>
      <ul className={s.navigationList}>
        {NavigationList.map((item, index) => (
          <li key={index}>
            <Link href={item.ref}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className={s.authControlContainer}>
        <Link href={AppRoutes.Profile}>
          <Avatar src={avatarURL} icon={!avatarURL ? <UserOutlined /> : <></>} />
        </Link>
      </div>
    </header>
  );
};
