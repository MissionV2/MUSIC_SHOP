import { useEffect, useState } from "react";
import { getTopRecords } from "../../api/endpoints/analytics";

interface Record {
  id: number;
  title: string;
  catalog_number: string;
  sales_current_year: number;
  wholesale_price: number;
  retail_price: number;
}

export default function Dashboard() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopRecords(10)
      .then(res => setRecords(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Топ пластинок по продажам</h2>
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <ul>
          {records.map((rec, idx) => (
            <li key={rec.id} className="mb-2">
              <b>{idx + 1}. {rec.title}</b> ({rec.catalog_number}) — Продано: {rec.sales_current_year} шт.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}