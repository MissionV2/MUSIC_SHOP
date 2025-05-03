import React from "react";
import record from '../../../assets/Record.png'
interface Composition {
  id: number;
  title: string;
}

interface RecordCardProps {
  title: string;
  artist: string;
  coverUrl?: string;
  price: number;
  compositions: Composition[];
}

const RecordCard: React.FC<RecordCardProps> = ({ title, artist, price }) => (
  <div className="bg-[#3F3434] text-center">
    <img src={record} alt={title} className="w-full"/>
    <div className="p-4">
      <h3 className="text-2xl">{title}</h3>
      <p>{artist}</p>
      <p className="text-2xl">{price} ₽</p>
      <button className="px-5 py-2 text-sm bg-red-500 mt-2">ДОБАВИТЬ В КОРЗИНУ</button>
    </div>
  </div>
);

export default RecordCard;