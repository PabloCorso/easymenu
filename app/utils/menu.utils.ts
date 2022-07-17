import type { User } from "~/models/user.server";
import type { Menu } from "~/models/menu.server";

export function buildMenu({
  name,
  userId,
}: {
  name: Menu["name"];
  userId: User["id"];
}) {
  return {
    name,
    title: "Title",
    userId,
    sections: [
      {
        title1: "Entrantes",
        order: 0,
        items: [
          {
            text1: "Milanesas fileteadas",
            price1: 4,
          },
          {
            text1: "Papas fritas",
            price1: 3,
          },
        ],
      },
      {
        title1: "Carnes",
        order: 0,
        items: [
          {
            text1: "Entraña",
            price1: 15,
          },
          {
            text1: "Vacío",
            price1: 17,
          },
        ],
      },
    ],
  };
}
