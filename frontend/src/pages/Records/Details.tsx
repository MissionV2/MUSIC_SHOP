import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecordById } from "../../api/endpoints/records";
import { Link } from "react-router-dom";

interface Label {
  id: number;
  name: string;
}

interface Composition {
  id: number;
  title: string;
}

interface Record {
  id: number;
  catalog_number: string;
  title: string;
  release_date: string;
  wholesale_price: number;
  retail_price: number;
  label: Label;
  compositions: Composition[];
  artist?: string;
  coverUrl?: string;
  price?: number;
}

const RecordDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [record, setRecord] = useState<Record | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getRecordById(Number(id))
        .then((res) => setRecord(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div>Загрузка...</div>;
  if (!record) return <div>Пластинка не найдена</div>;

  return (
    <div>
      <h2>{record.title}</h2>
      <p>
        <b>Каталожный номер:</b> {record.catalog_number}
      </p>
      <p>
        <b>Дата релиза:</b> {record.release_date}
      </p>
      <p>
        <Link to={`/label/${record.label.id}`}>
          <b>Лейбл:</b> {record.label?.name}
        </Link>
      </p>
      <p>
        <b>Цена:</b> {record.price ?? record.retail_price} ₽
      </p>
      <div>
        <b>Композиции:</b>
        <ul>
          {record.compositions.map((c) => (
            <li key={c.id}>
              <Link to={`/compositions/${c.id}`}>{c.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecordDetails;
