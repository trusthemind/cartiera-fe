import { usePathname, useRouter } from "next/navigation";

export const useCurrentPathEqual = (path:string) => {
  const pathname = usePathname();
  console.log(path)
  const isEqual = path === pathname;

  return { isEqual };
};
