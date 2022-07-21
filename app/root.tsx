import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./tailwind.css";
import { getUser } from "./session.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Easy Menu",
  viewport: "width=device-width,initial-scale=1",
  "apple-mobile-web-app-title": "Easy Menu",
  "application-name": "Easy Menu",
  "theme-color": "#ffffff",
  "msapplication-TileColor": "#2b5797",
});

export const links: LinksFunction = () => [
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicons/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicons/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicons/favicon-16x16.png",
  },
  {
    rel: "mask-icon",
    href: "/favicons/safari-pinned-tab.svg",
    color: "#3466ef",
  },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "icon", href: "/favicon.ico" },
  { rel: "stylesheet", href: tailwindStylesheetUrl },
];

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
