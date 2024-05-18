import { ReactNode, FC } from "react";

const CarsLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <main>{children}</main>;
};

export default CarsLayout;
