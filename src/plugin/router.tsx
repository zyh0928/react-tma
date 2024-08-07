import { isEmpty } from "lodash-es";
import { createBrowserRouter } from "react-router-dom";

import Layout from "@/pages";
import { list2tree } from "@/utils/tree";

import { getRoutes } from "$/user";
import NotFound from "%/error";

import type { ElementType } from "react";
import type { RouteObject } from "react-router-dom";

const modules: StrMap<ElementType> = import.meta.glob("%/**/*.tsx", {
  eager: !0,
  import: "default",
});

export const load = createBrowserRouter([
  {
    element: <div>Loading...</div>,
    path: "*",
  },
]);

const tree2routes = (tree: MenuType[]) => {
  const routes: RouteObject[] = [];

  tree.forEach(({ children, path, redirect, route }) => {
    const item: RouteObject = {};

    if (redirect) {
      item.path = route;
      item.element = <Navigate replace to={path ?? ""} />;
    } else {
      item.path = route;

      const Component = modules[`/src/pages/${path}.tsx`];

      if (Component) {
        item.element = <Component />;
      }
    }

    if (children?.length) {
      item.children = tree2routes(children);
    }

    if (isEmpty(item)) return;

    routes.push(item);
  });

  return routes;
};

export const getRouter = async () => {
  const routes = await getRoutes();

  const menus = list2tree<MenuType>(
    routes.filter(({ type }) => type !== "router"),
  );

  const tree = list2tree<MenuType>(
    routes.filter(({ type }) => type !== "menu"),
  );

  const children = tree2routes(tree);

  const router = createBrowserRouter(
    [
      {
        children: [
          {
            element: <NotFound />,
            path: "*",
          },
          ...children,
        ],
        element: <Layout />,
      },
    ],
    {
      basename: import.meta.env.BASE_URL,
    },
  );

  return {
    menus,
    router,
  };
};
