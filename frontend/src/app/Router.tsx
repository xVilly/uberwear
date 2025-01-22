import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { RouteError } from "./pages/Error";
import { HomePage } from "./pages/Home";
import { CreateAccountPage } from "./pages/CreateAccount";
import  AccountPageOrders from "./pages/AccountPageOrders";
import { AccountPageReturns} from "./pages/AccountPageReturns";
import { AccountPagePoints} from "./pages/AccountPagePoints";
import { AccountPageFavBrands} from "./pages/AccountPageFavBrands";
import { CartPage} from "./pages/Cart";
import AdminCouriers from "./pages/admin/AdminCouriers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminClients from "./pages/admin/AdminClients";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { RegisterShopPage } from "./pages/RegisterShopPage";
import { CourierPanelPage } from "./pages/CourierPanel";
import { AddressFillingPage } from "./pages/AddressFillPage";
import { PaymentPage } from "./pages/PaymentPage";
import { DeliveryPage } from "./pages/DeliveryPage";
import LogInPage from "./pages/LogIn";
import AdminData from "./pages/admin/AdminData";
import AccountPageData from "./pages/AccountPageData";
import OrderDetails from "./pages/admin/OrderDetails";
import CourierDetails from "./pages/admin/CourierDetails";
import ClientDetails from "./pages/admin/ClientDetails";
import { isMapIterator } from "util/types";
import { ShopPage } from "./pages/shops/ShopPage";
import { OfferPage } from "./pages/shops/Offer";
import { CategoryPage } from "./pages/shops/CategoryPage";
import { ProductPage } from "./pages/shops/ProductPage";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<RouteError />}>
      <Route index element={<HomePage />} />
      <Route path="admin">
        <Route index element={<AdminData />} />
        <Route path="clients">
          <Route index element={<AdminClients />} />
          <Route path=":clientId" element={<ClientDetails />} />
        </Route>
        <Route path="orders">
          <Route index element={<AdminOrders />} />
          <Route path=":orderId" element={<OrderDetails />} />          
        </Route>
        <Route path="couriers">
          <Route index element={<AdminCouriers />} />
          <Route path=":courierId" element={<CourierDetails />} />
        </Route>
      </Route>
      <Route path="offer">
        <Route index element={<OfferPage />} />
        <Route path=":shopId" element={<ShopPage />} />
        <Route path=":shopId/category/:category" element={<CategoryPage />} />
        <Route path=":shopId/category/:category/color/:color/purchase" element={<ProductPage />} />
      </Route>

      <Route path="create-account" element={<CreateAccountPage/>} />
      <Route path="account/data" element={<AccountPageData/>} />
      <Route path="account/orders" element={<AccountPageOrders/>} />
      <Route path="account/returns" element={<AccountPageReturns/>} />
      <Route path="account/points" element={<AccountPagePoints/>} />
      <Route path="account/favbrands" element={<AccountPageFavBrands/>} />
      <Route path="login" element={<LogInPage/>} />
      <Route path="cart" element={<CartPage/>} />
      <Route path="courier" element={<CourierPanelPage />} />
      <Route path="admin/data" element={<AdminData />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="register-shop" element={<RegisterShopPage />} />
      <Route path="/purchase/filladdress" element={<AddressFillingPage />} />
      <Route path="/purchase/payment" element={<PaymentPage />} />
      <Route path="/purchase/delivery" element={<DeliveryPage />} />
    </Route>
  )
);

export default routes;
