import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { RouteError } from "./pages/Error";
import { HomePage } from "./pages/Home";
import { CreateAccountPage } from "./pages/CreateAccount";
import { AccountPage } from "./pages/AccountPage";
import { LogInPage} from "./pages/LogIn";
import { CartPage} from "./pages/Cart";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<RouteError />}>
      <Route index element={<HomePage />} />
      <Route path="create-account" element={<CreateAccountPage/>} />
      <Route path="account" element={<AccountPage/>} />
      <Route path="login" element={<LogInPage/>} />
      <Route path="cart" element={<CartPage/>} />

    </Route>
  )
);

export default routes;
