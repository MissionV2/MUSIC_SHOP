import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, [location]); // обновлять при переходах

  return (
    <header className="flex justify-between items-center p-4 bg-red-600 text-white">
      <h1>MUSIC SHOP</h1>
      <div>
        {user ? (
          <Link to={'/profile'}>
                <span>{user.username}</span>
          </Link>
        ) : (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/registration">Регистрация</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;