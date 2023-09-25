import { PATH } from "./path";

interface MenuItem {
  index: string;
  icon?: string;
  label: string;
  children?: MenuItem[];
}

export const MENU_SIDEBAR: MenuItem[] = [
  {
    index: PATH.Account.Product,
    icon: "fa-solid fa-list-check",
    label: "Product",
  },
  {
    index: PATH.Account.User,
    icon: "fa-solid fa-users",
    label: "User",
  },
  {
    index: PATH.Account.Wishlist,
    icon: "fa-solid fa-heart",
    label: "Wishlist",
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
