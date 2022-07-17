import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { Paths } from "~/config/paths";
import { useOptionalUser } from "~/utils";
import { deleteUserMenus } from "~/models/menu.server";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  await deleteUserMenus({ userId });
  return json({});
};

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-white">
      {user ? (
        <div className="flex flex-col gap-2">
          <h1>Hi {user.email}</h1>
          <Link to={Paths.menu} className="btn btn-primary w-full">
            View Menu
          </Link>
          <Form method="post">
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
