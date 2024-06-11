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

export const AppHeader = () => {
  const { isEqual: IsHome } = useCurrentPathEqual(AppRoutes.Home);
  const key = Cookies.get("key");
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
        {/* {!IsHome && <ThemeSwitcher />} */}
        <Button
          href={AppRoutes.Login}
          type="primary"
          style={{
            minWidth: "6rem",
            // color: "var(--primary-dark)",
          }}
        >
          {"Login"}
        </Button>
        <Link href={AppRoutes.Profile}>
          <Avatar
            style={{ backgroundColor: "var(--purple)" }}
            icon={<UserOutlined />}
          />
        </Link>
      </div>
    </header> 
  );
};
