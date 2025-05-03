import { useState } from "react";
import { register, login } from "../../api/endpoints/auth";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register({ username, email, password });
      const res = await login({ username, password });
      // Сохраняем пользователя в localStorage (или в Context, если нужно)
      localStorage.setItem("user", JSON.stringify(res.data));
      setSuccess(true);
      setError("");
      navigate("/profile");
    } catch (e: unknown) {
      const err = e as AxiosError<{ detail?: string }>;
      setError(err.response?.data?.detail || "Ошибка регистрации");
      setSuccess(false);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Имя пользователя" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Зарегистрироваться</button>
      {error && <div style={{color: "red"}}>{error}</div>}
      {success && <div style={{color: "green"}}>Регистрация успешна!</div>}
    </div>
  );
}
