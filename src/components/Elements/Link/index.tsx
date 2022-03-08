import clsx from "clsx";
import {
  Link as RouterLink,
  LinkProps,
  useResolvedPath,
  useMatch,
  useLocation,
} from "react-router-dom";
import style from "./style.module.scss";

export const Link = ({
  className: linkClassName,
  children,
  ...props
}: LinkProps) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const location = useLocation();

  const styleClassName = clsx({
    [style["link"]]: true,
    [style["link__active"]]: Boolean(match),
    [style["link__dark"]]: location.pathname === "/transactions",
    linkClassName,
  });

  return (
    <RouterLink className={styleClassName} {...props}>
      {children}
    </RouterLink>
  );
};
