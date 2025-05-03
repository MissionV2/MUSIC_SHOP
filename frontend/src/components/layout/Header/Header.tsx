import React from "react";
import { Link } from "react-router-dom";
const Header: React.FC = () => (
  <header className="h-20 flex items-center justify-between relative top-0 w-full px-5 bg-red-600">
    <h1 className="text-3xl text-white">MUSIC SHOP</h1>
    <div className="flex gap-2">
       <Link to={'/login'} className="px-5 py-2 bg-black text-white">
          Вход
       </Link>
       <Link to={'/registration'} className="px-5 py-2 bg-black text-white">
          Регисрация
       </Link>
    </div>
  </header>
);

export default Header;