import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Layout from "../components/layout/Layout/Layout";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import Labels from "../pages/AdminPanel/Labels/Labels";
import AdminRoute from "./AdminRoute";
import Musicians from "../pages/AdminPanel/Musicians/Musicians";
import Compositions from "../pages/AdminPanel/Compositions/Compositions";
import Ensembles from "../pages/AdminPanel/Ensembles/Ensembles";
import Records from "../pages/AdminPanel/Records/Records";

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        {routes.map(({ path, element }, idx) => (
          <Route key={idx} path={path} element={element} />
        ))}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/labels"
          element={
            <AdminRoute>
              <Labels />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/musicians"
          element={
            <AdminRoute>
              <Musicians />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/compositions"
          element={
            <AdminRoute>
              <Compositions />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/ensembles"
          element={
            <AdminRoute>
              <Ensembles />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/records"
          element={
            <AdminRoute>
              <Records />
            </AdminRoute>
          }
        />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default AppRouter;