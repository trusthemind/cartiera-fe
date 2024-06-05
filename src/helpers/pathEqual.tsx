import { usePathname, useRouter } from "next/navigation";

export const useCurrentPathEqual = (path:string) => {
  const pathname = usePathname();
  const isEqual = path === pathname;

  return { isEqual };
};
