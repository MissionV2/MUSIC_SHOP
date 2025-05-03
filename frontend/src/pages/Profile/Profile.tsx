import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <p><b>Имя:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
}