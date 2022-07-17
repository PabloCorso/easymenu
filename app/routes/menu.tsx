import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getMenuListItems } from "~/models/menu.server";

type LoaderData = {
  menuListItems: Awaited<ReturnType<typeof getMenuListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const menuListItems = await getMenuListItems({ userId });
  return json<LoaderData>({ menuListItems });
};

export default function MenuPage() {
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to="/">Easy Menu</Link>
        </h1>
        <p>{user.email}</p>
      </header>

      <main className="flex h-full bg-white">
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
