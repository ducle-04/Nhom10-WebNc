import UserLayout from "../components/Layout/DefautLayout/UserLayout";

// User pages
import Home from "./User/Home";
import Register from "./User/Register";
import DestinationDetail from "./User/DestinationDetail";
import Blog from "./User/Blog";
import Tours from "./User/Tour";
import Destination from "./User/Destination";
import TourDetail from "./User/TourDetail";
import BookTour from "./User/BookTour";
import Contact from "./User/Contact";
import About from "./User/About";
import TourReview from "./User/TourReview";
import Login from "./Login";
import Profile from "./User/Profile";
import AdminDashboard from "./Admin/Dashboard";
import AdminLayout from "../components/Layout/DefautLayout/AdminLayout";
import TourManager from "./Admin/TourManager";
import BookingsManager from "./Admin/Bookings";
import CustomerManager from "./Admin/Customer";
import AdminReport from "./Admin/Report";
import PlacesManager from "./Admin/Places";
import PostManager from "./Admin/Post";
import BannerManager from "./Admin/Banner";
import StaffsManager from "./Admin/Staffs";
import ReviewManager from "./Admin/Review";
import SettingsPage from "./Admin/Settings";
import BookedTours from "./User/BookedTours";
const PublicPage = [
  { path: "/", component: Home, layout: UserLayout },
  { path: "/register", component: Register, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/profile", component: Profile, layout: null },
  { path: "/destination", component: Destination, layout: UserLayout },
  { path: "/destinations/:destinationId", component: DestinationDetail, layout: UserLayout },
  { path: "/blog", component: Blog, layout: UserLayout },
  { path: "/tours", component: Tours, layout: UserLayout },
  { path: "/tours/:id", component: TourDetail, layout: UserLayout },
  { path: "/tours/:id/book", component: BookTour, layout: UserLayout },
  { path: "/tours/:id/review", component: TourReview, layout: UserLayout },
  { path: "/contact", component: Contact, layout: UserLayout },
  { path: "/bookedtours", component: BookedTours, layout: UserLayout },
  { path: "/about", component: About, layout: UserLayout },
  { path: "/admin", component: AdminDashboard, layout: AdminLayout },
  { path: "/admin/tours", component: TourManager, layout: AdminLayout },
  { path: "/admin/bookings", component: BookingsManager, layout: AdminLayout },
  { path: "/admin/customers", component: CustomerManager, layout: AdminLayout },
  { path: "/admin/report", component: AdminReport, layout: AdminLayout },
  { path: "/admin/places", component: PlacesManager, layout: AdminLayout },
  { path: "/admin/posts", component: PostManager, layout: AdminLayout },
  { path: "/admin/banners", component: BannerManager, layout: AdminLayout },
  { path: "/admin/staffs", component: StaffsManager, layout: AdminLayout },
  { path: "/admin/feedbacks", component: ReviewManager, layout: AdminLayout },
  { path: "/admin/settings", component: SettingsPage, layout: AdminLayout }
];

const PrivatePage = [];

export { PublicPage, PrivatePage };
