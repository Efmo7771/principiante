import React from "react";
import { EVENTS } from "./constantes";
import { useState, useEffect, Children } from "react";
import { Page404 } from "./pages/Page404";
import { match } from "path-to-regexp";

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = Page404,
}) {
  const [actualPath, setActPath] = useState(window.location.pathname);
  useEffect(() => {
    const onlocationChange = () => {
      setActPath(window.location.pathname);
    };

    window.addEventListener(EVENTS.PUSHSTATE, onlocationChange);
    window.addEventListener(EVENTS.POPSTATE, onlocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onlocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onlocationChange);
    };
  }, []);

  let routeParams = {};

  const rutasHijas = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === "Route";
    return isRoute ? props : null;
  });

  const routesToUse = routes.concat(rutasHijas).filter(Boolean);
  console.log(rutasHijas);
  const Page = routesToUse.find(({ path }) => {
    if (path === actualPath) return true;
    const matchearUrl = match(path, { decode: decodeURIComponent });
    const matched = matchearUrl(actualPath);
    if (!matched) return false;
    routeParams = matched.params;
    return true;
  })?.Component;
  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}
