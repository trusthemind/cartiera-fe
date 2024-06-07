import { NavigationList } from "@/src/constants/constants";
import s from "./style.module.scss";
import cn from "classnames";
import Link from "next/link";

export const AppFoooter = () => {
  return (
    <footer className={s.footerContainer}>
      <h1 className={cn(s.textLogo, { [s.textDarkLogo]: false })}>Cartiera Sales</h1>
      <ul className={s.navigationListRow}>
        {NavigationList.map((item, index) => (
          <li key={index}>
            <Link href={item.ref}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};
