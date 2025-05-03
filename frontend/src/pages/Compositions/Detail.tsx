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
    <div className="px-5 uppercase md:px-32 sm:px-5">
      <h2 className="w-full text-center text-3xl uppercase py-5">{composition.title}</h2>
      <h2 className="mt-2">Год выпуска: {composition.year}</h2>
      {/* Если хотите показать музыкантов ансамбля: */}
      {composition.ensemble && composition.ensemble.musicians && (
        <h2 className="flex gap-2 items-center mt-2">
          Ансамбль:{" "}
          {composition.ensemble ? (
            <Link to={`/ensemble/${composition.ensemble.id}`} className="flex gap-5 items-center">
              {composition.ensemble.name}
              <Link to={`/ensemble/${composition.ensemble.id}`} className="px-5 py-1 bg-red-500">
                  Подробнее
              </Link>
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
