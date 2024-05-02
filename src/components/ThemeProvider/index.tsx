"use client";
import { ConfigProvider, ThemeConfig } from "antd";
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";

import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";

const ThemeContext = createContext<{}>({} as any);

export const useTheme = () => useContext(ThemeContext);

const theme: ThemeConfig = {
  token: {
    borderRadius: 16,
    fontFamily: "var(--font-mont)",
    fontSize: 16,
    colorPrimary: "#eab4f7",
    colorPrimaryHover: "#c78ed6",
    colorPrimaryActive: "#c78ed6",
    colorError:"#ef233c",
  },
  components: { Input: { paddingInline: 12, controlHeight: 40 }, Typography: { fontSize: 14 } },
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
    <StyleProvider cache={cache} hashPriority="high">
      <ConfigProvider theme={theme}>
        <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default ThemeProvider;
