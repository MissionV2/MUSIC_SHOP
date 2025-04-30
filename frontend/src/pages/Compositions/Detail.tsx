import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompositionById } from "../../api/endpoints/compositions";
import type { Ensemble } from "../Ensemble/Detail";
import { Link } from "react-router-dom";
interface Composition {
  id: number;
  title: string;
  ensemble_id: number;
  year: number;
  ensemble: Ensemble;
}

const CompositionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [composition, setComposition] = useState<Composition | null>(null);

  useEffect(() => {
    if (id) {
      getCompositionById(Number(id)).then((res: { data: Composition }) =>
        setComposition(res.data)
      );
    }
  }, [id]);

  if (!composition) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Название: {composition.title}</h2>
      <h2>Год выпуска: {composition.year}</h2>
      {/* Если хотите показать музыкантов ансамбля: */}
      {composition.ensemble && composition.ensemble.musicians && (
        <h2>
          Ансамбль:{" "}
          {composition.ensemble ? (
            <Link to={`/ensemble/${composition.ensemble.id}`}>
              {composition.ensemble.name}
            </Link>
          ) : (
            "—"
          )}
        </h2>
      )}
    </div>
  );
};

export default CompositionDetails;
