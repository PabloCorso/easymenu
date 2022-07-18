import type { User, Menu, Section, Item, Prisma } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Menu, Section, Item };
export type MenuWithSections = Prisma.PromiseReturnType<typeof getMenuByName>;

export function getUserMenu({ userId }: Pick<Menu, "userId">) {
  return prisma.menu.findFirst({
    where: {
      userId,
    },
  });
}

export function getMenuByName({
  name,
  userId,
}: Pick<Menu, "name"> & {
  userId: User["id"];
}) {
  return prisma.menu.findFirst({
    where: { name, userId },
    include: { sections: { include: { items: true } } },
  });
}

export function getMenuByUser(userId: User["id"]) {
  return prisma.menu.findFirst({
    where: { userId },
  });
}

export function getMenuListItems({ userId }: { userId: User["id"] }) {
  return prisma.menu.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createMenu({
  userId,
  sections,
  ...menu
}: Pick<Menu, "name" | "title"> & {
  userId: string;
  sections: Array<
    Pick<Section, "title1" | "order"> & {
      items: Array<Pick<Item, "text1" | "price1">>;
    }
  >;
}) {
  return prisma.menu.create({
    data: {
      ...menu,
      user: { connect: { id: userId } },
      sections: {
        create: sections.map(({ items, ...section }) => ({
          ...section,
          items: { create: items },
        })),
      },
    },
    include: { sections: { include: { items: true } } },
  });
}

export function updateMenu({ id, title }: Pick<Menu, "id" | "title">) {
  return prisma.menu.update({
    where: { id },
    data: {
      title,
    },
  });
}

export function createSection({
  menuId,
  title1,
  order,
}: Pick<Section, "menuId" | "title1" | "order">) {
  return prisma.section.create({
    data: {
      menuId,
      title1,
      order,
    },
  });
}

export function updateSection({ id, title1 }: Pick<Section, "id" | "title1">) {
  return prisma.section.update({
    where: { id },
    data: {
      title1,
    },
  });
}

export function createItem({
  sectionId,
  text1,
  price1,
}: Pick<Item, "sectionId" | "text1" | "price1">) {
  return prisma.item.create({
    data: {
      sectionId,
      text1,
      price1,
    },
  });
}

export function updateItem({
  id,
  text1,
  price1,
}: Pick<Item, "id" | "text1" | "price1">) {
  return prisma.item.update({
    where: { id },
    data: {
      text1,
      price1,
    },
  });
}

export async function deleteUserMenus({ userId }: { userId: User["id"] }) {
  await prisma.item.deleteMany({
    where: { section: { menu: { userId } } },
  });
  await prisma.section.deleteMany({
    where: { menu: { userId } },
  });
  return prisma.menu.deleteMany({
    where: { userId },
  });
}
