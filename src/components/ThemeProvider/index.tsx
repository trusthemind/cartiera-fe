"use client";
import { ConfigProvider, ThemeConfig } from "antd";
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";

import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";
import StoreProvider from "@/src/redux/provider";

const ThemeContext = createContext<{}>({} as any);

export const useTheme = () => useContext(ThemeContext);

const theme: ThemeConfig = {
  token: {
    borderRadius: 16,
    fontFamily: "var(--font-mont)",
    fontSize: 16,
    colorPrimary: "#7e52ff",
    colorPrimaryHover: "#6545c3",
    colorPrimaryActive: "#4e3597",
    colorError: "#ef233c",
  },
  components: {
    Input: { paddingInline: 12 },
    Typography: { fontSize: 14 },
    Upload: {
      fontSize: 14,
    },
    Button:{
      colorText: "#4e3597",
    }
  },
};

//! optization for loading antd theme without broken styles first
const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cache] = useState(() => createCache());
  useServerInsertedHTML(() => {
    return (
      <style
        id="antd-style"
        dangerouslySetInnerHTML={{
          __html: extractStyle(cache, true),
        }}
      />
    );
  });

  return (
    <StoreProvider>
      <StyleProvider cache={cache} hashPriority="high">
        <ConfigProvider theme={theme}>
          <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>
        </ConfigProvider>
      </StyleProvider>
    </StoreProvider>
  );
};

export default ThemeProvider;
