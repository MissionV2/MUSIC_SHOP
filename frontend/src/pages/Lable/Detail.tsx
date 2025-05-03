import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLabelById } from "../../api/endpoints/labels";

interface Lable {
  id: number;
  name: string,
  address: string,
  is_wholesaler: boolean,
}

const LableDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lable, setLable] = useState<Lable | null>(null);

  useEffect(() => {
    if (id) {
      getLabelById(Number(id)).then((res: { data: Lable }) => setLable(res.data));
    }
  }, [id]);

  if (!lable) return <div>Загрузка...</div>;

  return (
    <div className="px-4 md:px-32 sm:px-4">
      <h2 className="w-full text-center text-3xl py-5">{lable.name}</h2>
      <div className="flex flex-col gap-2">
        <p><b>Адрес:</b> {lable.address}</p>
        <p><b>Оптовый продажник:</b> {lable.is_wholesaler === false ? "No" : "Yes"}</p>
      </div>
    </div>
  );
};

export default LableDetails;