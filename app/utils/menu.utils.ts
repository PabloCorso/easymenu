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
        title1: "🍔 Hamburguesas",
        order: 0,
        items: [
          {
            text1: "Clásica con lechuga y tomate",
            price1: 190,
          },
          {
            text1: "Doble smash",
            price1: 220,
          },
          {
            text1: "Pulled pork",
            price1: 260,
          },
          {
            text1: "Hamburguesa vegana",
            price1: 260,
          },
        ],
      },
      {
        title1: "🍕 Pizzas",
        order: 1,
        items: [
          {
            text1: "Pizza con muzzarella",
            price1: 120,
          },
          {
            text1: "Pizza con champiñones",
            price1: 140,
          },
          {
            text1: "Pizza con peperoni",
            price1: 140,
          },
          {
            text1: "Pizza bacon & BBQ",
            price1: 160,
          },
        ],
      },
      {
        title1: "🍰 Postres",
        order: 2,
        items: [
          {
            text1: "Cheese cake",
            price1: 120,
          },
          {
            text1: "Carrot cake",
            price1: 150,
          },
          {
            text1: "Flan con dulce de leche",
            price1: 90,
          },
        ],
      },
    ],
  };
}
