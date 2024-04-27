"use client";
import { Theme } from "@/src/constants/constants";
import Switch from "antd/es/switch";
import { useEffect } from "react";

export const ThemeSwitcher = () => {
  const theme = localStorage.getItem("theme");

  return <Switch size="small" defaultChecked={theme === Theme.Dark} />;
};
