import { PATH } from "./path";

export interface MenuSidebarItem {
  index: string;
  icon?: string;
  label: string;
  children?: MenuSidebarItem[];
}

export const MENU_SIDEBAR_ADMIN: MenuSidebarItem[] = [
  {
    index: PATH.Account.Profile,
    icon: "fa-solid fa-id-badge",
    label: "Profile",
  },
  {
    index: PATH.Account.Wishlist,
    icon: "fa-solid fa-heart",
    label: "Wishlist",
  },
  {
    index: PATH.Account.Product,
    icon: "fa-brands fa-product-hunt",
    label: "Products",
  },
  {
    index: PATH.Account.User,
    icon: "fa-solid fa-users",
    label: "Users",
  },
  {
    index: PATH.Account.Brand,
    icon: "fa-solid fa-bars-progress",
    label: "Brands",
  },
  {
    index: PATH.Account.Role,
    icon: "fa-solid fa-sliders",
    label: "Roles",
  },
  {
    index: PATH.Account.Permission,
    icon: "fa-solid fa-sitemap",
    label: "Permissions",
  },
  {
    index: PATH.Account.Orders,
    icon: "fa-solid fa-clipboard-list",
    label: "Orders",
  },
  // {
  //   index: "/more",
  //   icon: "fa-solid fa-sliders",
  //   label: "More",
  //   children: [
  //     {
  //       index: "/account/sub1",
  //       icon: "fa-solid fa-gears",
  //       label: "Navigator One",
  //     },
  //   ],
  // },
];

export const MENU_SIDEBAR_USER: MenuSidebarItem[] = [
  {
    index: PATH.Account.Profile,
    icon: "fa-solid fa-id-badge",
    label: "Profile",
  },
  {
    index: PATH.Account.Wishlist,
    icon: "fa-solid fa-heart",
    label: "Wishlist",
  },
];
