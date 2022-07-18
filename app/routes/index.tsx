import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Paths } from "~/config/paths";
import { buildMenu, useOptionalUser } from "~/utils";
import { createMenu, deleteUserMenus, getUserMenu } from "~/models/menu.server";
import { requireUserId } from "~/session.server";
import { MetaInput } from "~/components";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const menu = await getUserMenu({ userId });
  return json({ menu });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formAction = formData.get("_action");

  const userId = await requireUserId(request);
  if (formAction === "create") {
    const name = userId.slice(0, 8);
    const data = buildMenu({ name, userId });
    const newMenu = await createMenu(data);
    return redirect(Paths.menuName(newMenu.name));
  } else if (formAction === "delete") {
    await deleteUserMenus({ userId });
  }

  return json({});
};

export default function Index() {
  const data = useLoaderData();
  const user = useOptionalUser();

  const hasMenu = Boolean(data.menu);
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-white">
      {user ? (
        <div className="flex flex-col gap-2">
          <h1>Hi {user.email}</h1>
          {hasMenu ? (
            <Link to={Paths.menu} className="btn btn-primary w-full">
              Editar menu
            </Link>
          ) : (
            <Form method="post">
              <MetaInput name="_action" value="create" />
              <button className="btn btn-primary w-full">Crear menu</button>
            </Form>
          )}
          <Form method="post">
            <MetaInput name="_action" value="delete" />
            <button className="btn btn-outline w-full">Delete menu</button>
          </Form>
        </div>
      ) : (
        <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
          <Link to="/join" className="btn btn-outline btn-secondary">
            Sign up
          </Link>
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
        </div>
      )}
    </main>
  );
}
