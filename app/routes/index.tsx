import { Link } from "@remix-run/react";
import { Paths } from "~/config/paths";

import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      {user ? (
        <div className="flex flex-col gap-2">
          <h1>Hi {user.email}</h1>
          <Link to={Paths.menu} className="btn btn-primary">
            View Menu
          </Link>
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
