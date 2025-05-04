import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../../api/endpoints/cart"; // импортируем функцию
import { createOrder } from "../../api/endpoints/order";
import record from '../../assets/Record.png'
interface CartItem {
  id: number;
  record_id: number;
  quantity: number;
  record: Record;
}

interface Record {
  id: number;
  catalog_number: string;
  title: string;
  release_date: string;
  wholesale_price: number;
  retail_price: number;
  artist?: string;
  coverUrl?: string;
  price?: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;
    const user = JSON.parse(userData);
    getCart(user.id)
      .then((res) => {
        console.log(res.data);
        setCart(res.data);
      })
      .catch((err) => {
        console.error("Ошибка при получении корзины:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (record_id: number) => {
    const userData = localStorage.getItem("user");
    if (!userData) return;
    const user = JSON.parse(userData);
    try {
      await removeFromCart(user.id, record_id);
      setCart(cart.filter((item) => item.record_id !== record_id));
    } catch (e) {
      alert(`Ошибка при удалении из корзины ${e}`);
    }
  };

  const handleOrder = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) return;
    const user = JSON.parse(userData);
    try {
      await createOrder(user.id);
      setCart([]); // Очистить корзину на фронте
      alert("Заказ успешно оформлен!");
    } catch (e) {
      alert(`Ошибка при оформлении заказа ${e}`);
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h2 className="w-full text-3xl text-center uppercase py-4">Корзина</h2>
      {cart.length === 0 ? (
        <div>Корзина пуста</div>
      ) : (
        <ul className="px-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="h-20 flex items-center justify-between bg-[#BB6666] pr-3"
            >
              <img src={record} alt="" className="h-full" />
              <div className="">
                <p>{item.record.title}</p>
                <p>{item.record.catalog_number}</p>
              </div>
              <div>
                <h2>{item.record.wholesale_price}</h2>
                <button
                  className="px-2 py-1 bg-black uppercase"
                  onClick={() => handleRemove(item.record_id)}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="absolute bottom-0">
        <button
          onClick={handleOrder}
          className="fixed bottom-0 w-full py-5 bg-red-600"
        >
          Сделать заказ
        </button>
      </div>
    </div>
  );
}
