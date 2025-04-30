import React from "react";

interface Composition {
  id: number;
  title: string;
}

interface RecordCardProps {
  title: string;
  artist: string;
  coverUrl: string;
  price: number;
  compositions: Composition[];
}

const RecordCard: React.FC<RecordCardProps> = ({ title, artist, coverUrl, price }) => (
  <div className="border-2 border-black rounded-3xl p-4">
    <img src={coverUrl} alt={title} />
    <h3>{title}</h3>
    <p>{artist}</p>
    <strong>{price} ₽</strong>
  </div>
);

export default RecordCard;