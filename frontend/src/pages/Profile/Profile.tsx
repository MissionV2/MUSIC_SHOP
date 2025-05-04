import { useEffect, useState } from "react";
import { getOrders } from "../../api/endpoints/order";

interface Record {
  id: number;
  title: string;
  catalog_number: string;
  wholesale_price: number;
}

interface OrderItem {
  record_id: number;
  quantity: number;
  record: Record;
}

interface Order {
  id: number;
  items: OrderItem[];
}

export default function Profile() {
  const [user, setUser] = useState<{ id: number; username: string; email: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      getOrders(parsed.id)
        .then(res => setOrders(res.data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (!user) return <div>Загрузка...</div>;
  if (loading) return <div>Загрузка заказов...</div>;

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <p><b>Имя:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
      <h3 className="mt-6 mb-2 text-xl">Ваши заказы:</h3>
      {orders.length === 0 ? (
        <div>У вас нет заказов.</div>
      ) : (
        <ul>
          {orders.map((order, idx) => (
            <li key={order.id} style={{ marginBottom: 24 }}>
              <b>Заказ №{idx + 1}</b>
              <ul>
                {order.items.map(item => (
                  <li key={item.record_id}>
                    {item.record.title} ({item.record.catalog_number}) — {item.quantity} шт. — {item.record.wholesale_price} ₽
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}