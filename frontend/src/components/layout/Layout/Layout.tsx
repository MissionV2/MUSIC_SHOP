// src/components/layout/Layout.tsx
import React from "react";
import Header from "../Header/Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);

export default Layout;