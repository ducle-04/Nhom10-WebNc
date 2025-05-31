import UserLayout from "../components/Layout/DefautLayout/UserLayout";

// User pages
import Home from "./User/Home";
import Register from "./User/Register";
import DestinationDetail from "./User/DestinationDetail";
import Blog from "./User/Blog";
import Tours from "./User/Tour";
import TourDetail from "./User/TourDetail";
import BookTour from "./User/BookTour";
import Contact from "./User/Contact";
import About from "./User/About";
import TourReview from "./User/TourReview";
const PublicPage = [
  { path: "/", component: Home, layout: UserLayout },
  { path: "/register", component: Register, layout: UserLayout },
  { path: "/destinations/:destinationId", component: DestinationDetail, layout: UserLayout },
  { path: "/blog", component: Blog, layout: UserLayout },
  { path: "/tours", component: Tours, layout: UserLayout },
  { path: "/tours/:id", component: TourDetail, layout: UserLayout },
  { path: "/tours/:id/book", component: BookTour, layout: UserLayout },
  { path: "/tours/:id/review", component: TourReview, layout: UserLayout },
  { path: "/contact", component: Contact, layout: UserLayout },
  { path: "/about", component: About, layout: UserLayout },
];

const PrivatePage = [];

export { PublicPage, PrivatePage };
