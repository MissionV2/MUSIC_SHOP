import React, { useEffect, useState } from "react";
import { getRecords } from "../../api/endpoints/records";

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
}

const RecordsList: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecords()
      .then((res) => setRecords(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Список пластинок</h2>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            <strong>{record.title}</strong> ({record.catalog_number})<br />
            Лейбл: {record.label?.name}<br />
            Композиции:{" "}
            {record.compositions.map((c) => c.title).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordsList;