import { lazy } from "react";
const Default = lazy(() => import("pages/default"));
const Blogs = lazy(() => import("pages/blogs"));
const Youtube = lazy(() => import("pages/youtube"));
const Certificate = lazy(() => import("pages/certificate"));
const Partner = lazy(() => import("pages/partner"));
const Products = lazy(() => import("pages/products"));
const Gallery = lazy(() => import("pages/gallery"));
const User = lazy(() => import("pages/admin"));
const NotFound = lazy(() => import("pages/notFound"));
const LocalizationPanel = lazy(() => import("pages/localizationPanel"));
// const Login = lazy(() => import("pages/login"));

export interface IRoute {
  path: string;
  access?: string[] | "*";
  element: JSX.Element;
  inner?: IRoute[];
  index?: boolean;
  title: string;
}

const privateRoutes: IRoute[] = [
  {
    path: "/",
    access: ["admin", "user"],
    title: "Welcome",
    element: <Default />,
  },
  {
    path: "/profile",
    access: ["admin"],
    title: "Profile",
    element: <User />,
  },
  {
    path: "/blogs",
    access: ["admin"],
    title: "Bloglar",
    element: <Blogs />,
  },
  {
    path: "/youtubes",
    access: ["admin"],
    title: "YouTube",
    element: <Youtube />,
  },
  {
    path: "/galleries",
    access: ["admin"],
    title: "Gallereya",
    element: <Gallery />,
  },
  {
    path: "/products",
    access: ["admin"],
    title: "Mahsulotlar",
    element: <Products />,
  },
  {
    path: "/certificates",
    access: ["admin"],
    title: "Sertifikatlar",
    element: <Certificate />,
  },
  {
    path: "/partners",
    access: ["admin"],
    title: "Hamkorlar",
    element: <Partner />,
  },
  {
    path: "/translations",
    access: ["admin"],
    title: "Translations",
    element: <LocalizationPanel />,
  },
  {
    path: "*",
    access: ["admin"],
    title: "",
    element: <NotFound />,
  },
];

const publicRoutes: IRoute[] = [
  // {
  //   path: "/login",
  //   access: [],
  //   title: "Login",
  //   element: <Login />,
  // },
];

export { privateRoutes, publicRoutes };
