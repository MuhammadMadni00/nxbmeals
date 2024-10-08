import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginCard from "./auth/LoginCard";
import Dashboard from "./Dashboard";
import ForgotPassword from "./auth/ForgotPassword";
import PrivateRoute from "./auth/PrivateRoute";
import PrivateLogin from "./auth/PrivateLogin";
import Users from "./users";
import Menu from "./menu";
import Catalogue from "./Catalogue";
import Invoicing from "./Invoicing";
import MealsHistory from "./mealshistory";
import Verification from "./verification";
import AddCatalogueForm from "./Catalogue/addCatalogueForm";
import EditCatalogueForm from "./Catalogue/editCatalogueForm";
import AddMeal from "./menu/new";
const routes = [
  { path: "/login", element: LoginCard, isPrivate: false, isLogin: true },
  { path: "/", element: Dashboard, isPrivate: true },
  { path: "/forgotpassword", element: ForgotPassword, isPrivate: false },
  { path: "/Users", element: Users, isPrivate: false },
  { path: "/Menu", element: Menu, isPrivate: false },
  { path: "/Catalogue", element: Catalogue, isPrivate: false },
  { path: "/Invoicing", element: Invoicing, isPrivate: false },
  { path: "/meal-history", element: MealsHistory, isPrivate: false },
  { path: "/verification", element: Verification, isPrivate: false },
  { path: "/add-catalogue", element: AddCatalogueForm, isPrivate: false },
  { path: "/edit-catalogue/:id", element: EditCatalogueForm, isPrivate: false },
  { path: "/add-meal/:date", element: AddMeal, isPrivate: false },
];
function AppRoutes() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          if (route.isPrivate) {
            return (
              <Route
                key={index}
                path={route.path}
                element={<PrivateRoute element={route.element} />}
              />
            );
          } else if (route.isLogin) {
            return (
              <Route
                key={index}
                path={route.path}
                element={<PrivateLogin element={route.element} />}
              />
            );
          } else {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            );
          }
        })}
      </Routes>
    </Router>
  );
}
export default AppRoutes;
