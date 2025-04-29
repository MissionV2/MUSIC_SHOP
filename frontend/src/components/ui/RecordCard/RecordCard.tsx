import React from "react";

interface RecordCardProps {
  title: string;
  artist: string;
  coverUrl: string;
  price: number;
}

const RecordCard: React.FC<RecordCardProps> = ({ title, artist, coverUrl, price }) => (
  <div className="record-card">
    <img src={coverUrl} alt={title} />
    <h3>{title}</h3>
    <p>{artist}</p>
    <strong>{price} ₽</strong>
  </div>
);

export default RecordCard;