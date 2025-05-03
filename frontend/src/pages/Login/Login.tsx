import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/endpoints/auth";
import { AxiosError } from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ username, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      setError("");
      navigate("/profile");
    } catch (e: unknown) {
      const err = e as AxiosError<{ detail?: string }>;
      setError(err.response?.data?.detail || "Ошибка входа");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
