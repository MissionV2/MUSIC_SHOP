import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import Layout from "../components/layout/Layout/Layout";

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        {routes.map(({ path, element }, idx) => (
          <Route key={idx} path={path} element={element} />
        ))}
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default AppRouter;