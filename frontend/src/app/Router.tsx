import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { RouteError } from "./pages/Error";
import { HomePage } from "./pages/Home";
//import Access from "./components/global/Access";

const routes = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>} errorElement={<RouteError />}>
        <Route index element={<HomePage/>} />
    </Route>
));

export default routes;