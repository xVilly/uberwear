import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { RouteError } from "./pages/Error";
import { HomePage } from "./pages/Home";
import { CreateAccountPage } from "./pages/CreateAccount";
import  AccountPageOrders from "./pages/AccountPageOrders";
import { AccountPageReturns} from "./pages/AccountPageReturns";
import { AccountPagePoints} from "./pages/AccountPagePoints";
import { AccountPageFavBrands} from "./pages/AccountPageFavBrands";
import { OfferPage} from "./pages/Offer";
import { CartPage} from "./pages/Cart";
import AdminCouriers from "./pages/admin/AdminCouriers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminClients from "./pages/admin/AdminClients";
import {FashionBout} from "./pages/ShopFashionBout";
import {NYClothes} from "./pages/ShopNyClothes";
import { NYHoodies } from "./pages/NYClothesHoodies";
import { NYSweatPants } from "./pages/NYClothesSweatPants";
import { NYTees } from "./pages/NYClothesTees";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { RegisterShopPage } from "./pages/RegisterShopPage";
import { CourierPanelPage } from "./pages/CourierPanel";
import { PurchasePageNYH} from './pages/NYHoodiePurchasePage';
import { PurchasePageNYSw} from './pages/NYSweatPantsPurchasePage';
import { PurchasePageTee } from './pages/NYTeePurchasePage';
import { AddressFillingPage } from "./pages/AddressFillPage";
import LogInPage from "./pages/LogIn";
import AdminData from "./pages/admin/AdminData";
import AccountPageData from "./pages/AccountPageData";
import OrderDetails from "./pages/admin/OrderDetails";
import CourierDetails from "./pages/admin/CourierDetails";
import ClientDetails from "./pages/admin/ClientDetails";

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

      <Route path="create-account" element={<CreateAccountPage/>} />
      <Route path="account/data" element={<AccountPageData/>} />
      <Route path="account/orders" element={<AccountPageOrders/>} />
      <Route path="account/returns" element={<AccountPageReturns/>} />
      <Route path="account/points" element={<AccountPagePoints/>} />
      <Route path="account/favbrands" element={<AccountPageFavBrands/>} />
      <Route path="login" element={<LogInPage/>} />
      <Route path="cart" element={<CartPage/>} />
      <Route path="offer" element={<OfferPage/>} />
      <Route path="courier" element={<CourierPanelPage />} />
      <Route path="admin/data" element={<AdminData />} />
      <Route path="offer/fashionbout" element={<FashionBout />} />
      <Route path="offer/nyclothes" element={<NYClothes />} />
      <Route path="offer/nyclothes/hoodies" element={<NYHoodies />} />
      <Route path="offer/nyclothes/sweatpants" element={<NYSweatPants />} />
      <Route path="offer/nyclothes/tees" element={<NYTees />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="register-shop" element={<RegisterShopPage />} />
      <Route path="/purchase/hoodie/:color" element={<PurchasePageNYH />} />
      <Route path="/purchase/sweatpants/:color" element={<PurchasePageNYSw />} />
      <Route path="/purchase/tees/:color" element={<PurchasePageTee />} />
      <Route path="/purchase/filladdress" element={<AddressFillingPage />} />
    </Route>
  )
);

export default routes;
