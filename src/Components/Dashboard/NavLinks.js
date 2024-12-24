import {
  faBoxesStacked,
  faDolly,
  faSquarePlus,
  faTableCells,
  faUserEdit,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const NavLinks = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role: ["1995"],
  },
  {
    name: "Add User",
    path: "user/add",
    icon: faUserPlus,
    role: ["1995"],
  },
  {
    name: "Moderator",
    path: "moderator",
    icon: faUserEdit,
    role: ["1995", "1996"],
  },
  {
    name: "Categories",
    path: "categories",
    icon: faTableCells,
    role: ["1995", "1999"],
  },
  {
    name: "Add Category",
    path: "category/add",
    icon: faSquarePlus,
    role: ["1995", "1999"],
  },
  {
    name: "Products",
    path: "products",
    icon: faBoxesStacked,
    role: ["1995", "1999"],
  },
  {
    name: "Add Product",
    path: "product/add",
    icon: faDolly,
    role: ["1995", "1999"],
  },
];
