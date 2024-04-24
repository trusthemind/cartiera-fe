"use client";
import { ConfigProvider, theme } from "antd";
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";

import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";

const ThemeContext = createContext<{}>({} as any);

export const useTheme = () => useContext(ThemeContext);

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
      <ConfigProvider>
        <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default ThemeProvider;
