import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecordById } from "../../api/endpoints/records";
import { Link } from "react-router-dom";
import music from '../../assets/music.png'
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
  stock_quantity: number;
  sales_previous_year: number;
  sales_current_year: number;
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
    <div className="container mx-auto px-4 pt-5">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col gap-4 uppercase md:w-1/2">
          <h2 className="text-3xl text-left md:text-right">{record.title}</h2>
          <p>
            <b>Каталожный номер:</b> {record.catalog_number}
          </p>
          <p>
            <b>Дата релиза:</b> {record.release_date}
          </p>
          <p className="flex gap-3 items-center">
            <b>Лейбл:</b> {record.label?.name}
            <Link to={`/label/${record.label.id}`} className="px-4 py-1 bg-red-500">
               Подробнее
            </Link>
          </p>
          <p>
            <b>На складе:</b> {record.price ?? record.stock_quantity}
          </p>
          <p>
            <b>Продажи в прошлом году:</b> {record.price ?? record.sales_previous_year}
          </p>
          <p>
            <b>Продажи в этом году:</b> {record.price ?? record.sales_current_year}
          </p>
          <p>
            <b>Розничная цена:</b> {record.price ?? record.retail_price} ₽
          </p>
          <p>
            <b>Оптовая цена:</b> {record.price ?? record.wholesale_price} ₽
          </p>
        </div>
        <div className="flex flex-col md:w-1/2">
          <b>Композиции:</b>
          <ul className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-2 mt-2">
            {record.compositions.map((c) => (
              <li key={c.id} className="bg-[#3F3434] rounded-3xl overflow-hidden">
                <Link to={`/compositions/${c.id}`} className="uppercase block">
                    <img src={music} alt="song" className="w-full"/>
                    <p className="text-center py-2">{c.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;
