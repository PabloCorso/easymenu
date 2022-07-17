import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Paths } from "~/config/paths";

import { getMenuByUser } from "~/models/menu.server";
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);

  const menu = await getMenuByUser(userId);
  if (menu) {
    return redirect(Paths.menuName(menu.name));
  }

  return json({});
};

export default function NoteIndexPage() {
  return (
    <p>
      No menu selected. Select a menu on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new menu.
      </Link>
    </p>
  );
}
