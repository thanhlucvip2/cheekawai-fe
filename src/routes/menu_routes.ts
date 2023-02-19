import { RoutesConst } from "@Constants/routes-const";
import { Routes } from "./routes";
export interface MenuRoutes {
  label: string;
  path: string;
  routesType: string;
  children?: {
    label: string;
    path: string;
    routesType: string;
  }[];
}
export const menuRoutes: MenuRoutes[] = [
  {
    label: "Trang chủ",
    path: Routes.home,
    routesType: RoutesConst.public,
  },
  {
    label: "Trang private",
    path: Routes.private,
    routesType: RoutesConst.user,
  },
  {
    label: "Trang admin",
    path: Routes.admin,
    routesType: RoutesConst.admin,
    children: [
      {
        label: "Tạo loại sản phẩm",
        path: Routes.createProduct,
        routesType: RoutesConst.admin,
      },
      {
        label: "Danh sách sản phẩm",
        path: Routes.listProduct,
        routesType: RoutesConst.admin,
      },
    ],
  },
];
