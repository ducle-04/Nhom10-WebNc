import UserLayout from "../components/Layout/DefautLayout/UserLayout";

// User pages
import Home from "./User/Home";
import Register from "./User/Register";

const PublicPage = [
  { path: "/", component: Home, layout: UserLayout },
  { path: "/register", component: Register, layout: UserLayout },
];

const PrivatePage = []; // Add private pages here if needed

export { PublicPage, PrivatePage };
