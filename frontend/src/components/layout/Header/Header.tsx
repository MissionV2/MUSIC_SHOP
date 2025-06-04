import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [user, setUser] = useState<{ username: string; email: string; is_admin?: boolean } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

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
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white bg-black rounded-full px-3 py-1 mr-2 hover:bg-gray-800"
          aria-label="Назад"
        >
          ←
        </button>
        <h1>MUSIC SHOP</h1>
        {user?.is_admin && (
          <Link to="/admin" className="ml-4 bg-black px-3 py-1 rounded text-xs">
            Админ-панель
          </Link>
        )}
      </div>
      <div>
        {user ? (
          <Link to={'/profile'}>
            <span>{user.username}</span>
          </Link>
        ) : (
          <div className="flex gap-2 items-center">
            <Link to="/login" className="px-4 py-3 bg-black">Вход</Link>
            <Link to="/registration" className="px-4 py-3 bg-black">Регистрация</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;