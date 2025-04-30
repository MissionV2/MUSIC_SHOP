import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompositionById } from "../../api/endpoints/compositions";

interface Composition {
  id: number;
  title: string;
  ensemble_id: number;
  year: number;
}

const CompositionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [composition, setComposition] = useState<Composition | null>(null);

  useEffect(() => {
    if (id) {
      getCompositionById(Number(id)).then((res: { data: Composition }) => setComposition(res.data));
    }
  }, [id]);

  if (!composition) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Название: {composition.title}</h2>
      <h2>Ансамбль:{composition.ensemble_id}</h2>
      <h2>Год Выпуска: {composition.year}</h2>
    </div>
  );
};

export default CompositionDetails;