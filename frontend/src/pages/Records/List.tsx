import React, { useEffect, useState } from "react";
import { getRecords } from "../../api/endpoints/records";
import RecordCard from "../../components/ui/RecordCard/RecordCard";
import { Link } from "react-router-dom";
import '../../index.css'

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
      <h2 className="w-full text-center py-6 text-3xl">КАТАЛОГ</h2>
      <div className="grid grid-cols-1 px-10 md:grid-cols-4 sm:grid-cols-2 gap-4 md:px-52 sm:px-5">
        {records.map((record) => (
          <Link
            key={record.id}
            to={`/records/${record.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <RecordCard
              id={record.id}
              title={record.title}
              artist={record.artist || record.label?.name || ""}
              coverUrl={record.coverUrl || ""}
              price={record.price ?? record.retail_price}
              compositions={record.compositions}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecordsList;