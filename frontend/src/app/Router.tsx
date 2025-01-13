import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { RouteError } from "./pages/Error";
import { HomePage } from "./pages/Home";
import { CreateAccountPage } from "./pages/CreateAccount";
import { AccountPageData} from "./pages/AccountPageData";
import { AccountPageOrders} from "./pages/AccountPageOrders";
import { AccountPageReturns} from "./pages/AccountPageReturns";
import { AccountPagePoints} from "./pages/AccountPagePoints";
import { AccountPageFavBrands} from "./pages/AccountPageFavBrands";
import { LogInPage} from "./pages/LogIn";
import { OfferPage} from "./pages/Offer";
import { CartPage} from "./pages/Cart";
import { AdminPanelPage } from "./pages/AdminPanel";
import {AdminCouriers} from "./pages/AdminCouriers";
import {AdminOrders} from "./pages/AdminOrders";
import {AdminUsers} from "./pages/AdminUsers";
import { CourierPanelPage } from "./pages/CourierPanel";
import {AdminData} from "./pages/AdminData";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<RouteError />}>
      <Route index element={<HomePage />} />
      <Route path="create-account" element={<CreateAccountPage/>} />
      <Route path="account/data" element={<AccountPageData/>} />
      <Route path="account/orders" element={<AccountPageOrders/>} />
      <Route path="account/returns" element={<AccountPageReturns/>} />
      <Route path="account/points" element={<AccountPagePoints/>} />
      <Route path="account/favbrands" element={<AccountPageFavBrands/>} />
      <Route path="login" element={<LogInPage/>} />
      <Route path="cart" element={<CartPage/>} />
      <Route path="offer" element={<OfferPage/>} />
      <Route path="admin" element={<AdminPanelPage />} />
      <Route path="admin/couriers" element={<AdminCouriers />} />
      <Route path="admin/orders" element={<AdminOrders />} />
      <Route path="admin/users" element={<AdminUsers />} />
      <Route path="courier" element={<CourierPanelPage />} />
      <Route path="admin/data" element={<AdminData />} />
    </Route>
  )
);

export default routes;
