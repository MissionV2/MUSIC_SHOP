import React from "react";
import record from '../../../assets/Record.png'
import { addToCart } from "../../../api/endpoints/cart";
import { useNavigate } from "react-router-dom";

interface Composition {
  id: number;
  title: string;
}

interface RecordCardProps {
  id: number;
  title: string;
  artist: string;
  coverUrl?: string;
  price: number;
  compositions: Composition[];
}

const RecordCard: React.FC<RecordCardProps> = ({ id, title, artist, price }) => {
  const navigate = useNavigate()
  const handleAddToCart = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("Сначала войдите в аккаунт!");
      return;
    }
    const user = JSON.parse(userData);
    try {
      console.log(id)
      console.log("user.id:", user.id, "record id:", id);
      await addToCart(user.id, id, 1);
      alert("Товар добавлен в корзину!");
      navigate('/cart')
    } catch (e) {
      alert(`Ошибка при добавлении в корзину ${e}`);
    }
  };

  return (
    <div className="bg-[#3F3434] text-center">
      <img src={record} alt={title} className="w-full"/>
      <div className="p-4">
        <h3 className="text-2xl">{title}</h3>
        <p>{artist}</p>
        <p className="text-2xl">{price} ₽</p>
        <button
          className="px-5 py-2 text-sm bg-red-500 mt-2"
          onClick={handleAddToCart}
        >
          ДОБАВИТЬ В КОРЗИНУ
        </button>
      </div>
    </div>
  );
};

export default RecordCard;