import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { MenuWithSections } from "~/models/menu.server";
import {
  getMenuByName,
  updateMenu,
  createSection,
  updateSection,
  deleteSection,
  createItem,
  updateItem,
  deleteItem,
} from "~/models/menu.server";
import { requireUserId } from "~/session.server";
import {
  ItemInput,
  MenuTitleInput,
  MetaInput,
  SectionInput,
} from "~/components";

type LoaderData = {
  menu: NonNullable<MenuWithSections>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.menuName, "menuName not found");

  const menu = await getMenuByName({ userId, name: params.menuName });
  if (!menu) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ menu });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formAction = formData.get("_action");
  const model = formData.get("model");

  if (request.method === "DELETE") {
    const id = formData.get("id");
    if (typeof id === "string") {
      if (model === "section") {
        await deleteSection({ id });
      } else if (model === "item") {
        await deleteItem({ id });
      }
    }
  } else if (formAction === "create") {
    if (model === "section") {
      const menuId = formData.get("menuId");
      if (typeof menuId === "string") {
        await createSection({ menuId, title1: "", order: 0 });
      }
    } else if (model === "item") {
      const sectionId = formData.get("sectionId");
      if (typeof sectionId === "string") {
        await createItem({ sectionId, text1: "", price1: 0 });
      }
    }
  } else {
    if (model === "menu") {
      const id = formData.get("id");
      const title = formData.get("title");
      if (typeof id === "string" && typeof title === "string") {
        await updateMenu({ id, title });
      }
    } else if (model === "section") {
      const id = formData.get("id");
      const title1 = formData.get("title1");
      if (typeof id === "string" && typeof title1 === "string") {
        await updateSection({ id, title1 });
      }
    } else if (model === "item") {
      const id = formData.get("id");
      const text1 = formData.get("text1");
      const price1 = formData.get("price1");
      if (
        typeof id === "string" &&
        typeof text1 === "string" &&
        typeof price1 === "string"
      ) {
        await updateItem({ id, text1, price1: Number(price1) ?? undefined });
      }
    }
  }

  return json({});
};

export default function NoteDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="relative flex justify-center">
      <div className="w-full max-w-[500px] rounded-2xl bg-gray-900 p-4 text-gray-50">
        <MenuTitleInput className="mb-6" menu={data.menu} />

        <ul className="flex flex-col gap-6">
          {data.menu.sections.map((section) => (
            <li key={section.id}>
              <SectionInput
                className="mb-4 rounded-sm bg-white p-3 text-gray-900"
                section={section}
              />
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <ItemInput item={item} />
                  </li>
                ))}
                <li>
                  <Form method="post">
                    <MetaInput name="_action" value="create" />
                    <MetaInput name="model" value="item" />
                    <MetaInput name="sectionId" value={section.id} />
                    <button type="submit" className="ml-1 h-8 text-blue-200">
                      + Agregar nuevo
                    </button>
                  </Form>
                </li>
              </ul>
            </li>
          ))}
          <li>
            <Form method="post">
              <MetaInput name="_action" value="create" />
              <MetaInput name="model" value="section" />
              <MetaInput name="menuId" value={data.menu.id} />
              <button type="submit" className="ml-1 h-12 w-full text-blue-200">
                + Nueva categoría
              </button>
            </Form>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Menu no encontrado</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
