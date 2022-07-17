import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useCatch, useLoaderData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";
import type {
  Item,
  Menu,
  MenuWithSections,
  Section,
} from "~/models/menu.server";
import {
  getMenuByName,
  updateMenu,
  createSection,
  updateSection,
  createItem,
  updateItem,
} from "~/models/menu.server";
import { requireUserId } from "~/session.server";
import { AutoSubmitForm } from "~/components";

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

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const formAction = formData.get("_action");
  const model = formData.get("model");

  if (formAction === "create") {
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
      if (typeof id === "string" && typeof text1 === "string") {
        await updateItem({ id, text1 });
      }
    }
  }

  return json({});
};

export default function NoteDetailsPage() {
  const data = useLoaderData() as LoaderData;
  const transition = useTransition();

  return (
    <div>
      <MenuTitleInput menu={data.menu} />

      <ul>
        {data.menu.sections.map((section) => (
          <li key={section.id}>
            <SectionInput section={section} menuId={data.menu.id} />
            <ul>
              {section.items.map((item) => (
                <li key={item.id}>
                  <ItemInput item={item} sectionId={section.id} />
                </li>
              ))}
              <li>
                <Form method="post">
                  <input name="_action" value="create" readOnly hidden />
                  <input name="model" value="item" readOnly hidden />
                  <button type="submit">Agregar item</button>
                </Form>
              </li>
            </ul>
          </li>
        ))}
        <li>
          <Form method="post">
            <input name="_action" value="create" readOnly hidden />
            <input name="model" value="section" readOnly hidden />
            <button type="submit">Agregar seccion</button>
          </Form>
        </li>
      </ul>
      {transition.state === "submitting" ? <p>Saving...</p> : null}
    </div>
  );
}

function MenuTitleInput({ menu }: { menu: Menu }) {
  return (
    <AutoSubmitForm>
      <input name="model" value="menu" readOnly hidden />
      <input name="id" value={menu.id} readOnly hidden />
      <input
        className="text-2xl font-bold"
        name="title"
        defaultValue={menu.title || ""}
        placeholder="Mi Menu"
      />
      <button type="submit" hidden />
    </AutoSubmitForm>
  );
}

function SectionInput({
  section,
  menuId,
}: {
  section: Section;
  menuId: Menu["id"];
}) {
  return (
    <AutoSubmitForm>
      <input name="model" value="section" readOnly hidden />
      <input name="id" value={section.id} readOnly hidden />
      <input name="menuId" value={menuId} readOnly hidden />
      <input
        name="title1"
        className="text-xl font-bold"
        defaultValue={section.title1 || ""}
        placeholder="Carnes..."
      />
      <button type="submit" hidden />
    </AutoSubmitForm>
  );
}

function ItemInput({
  item,
  sectionId,
}: {
  item: Item;
  sectionId: Section["id"];
}) {
  return (
    <AutoSubmitForm>
      <input name="model" value="item" readOnly hidden />
      <input name="id" value={item.id} readOnly hidden />
      <input name="sectionId" value={sectionId} readOnly hidden />
      <input
        name="title1"
        className="text-lg font-bold"
        defaultValue={item.text1 || ""}
        placeholder="Pollo a las brasas..."
      />
      <button type="submit" hidden />
    </AutoSubmitForm>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
