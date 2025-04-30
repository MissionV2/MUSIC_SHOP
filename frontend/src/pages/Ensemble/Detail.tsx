import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEnsembleById } from "../../api/endpoints/ensembles";

interface Musician {
  id: number;
  full_name: string;
  birth_date: string;
  death_date: string;
  nationality: string;
  bio: string;
}

interface Composition {
  id: number;
  title: string;
}

export interface Ensemble {
  id: number;
  name: string;
  formation_date: string;
  description: string;
  musicians: Musician[];
  compositions?: Composition[]; // Добавьте это поле, если ансамбль возвращает свои композиции
}

const EnsembleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ensemble, setEnsemble] = useState<Ensemble | null>(null);

  useEffect(() => {
    if (id) {
      getEnsembleById(Number(id)).then((res: { data: Ensemble }) =>
        setEnsemble(res.data)
      );
    }
  }, [id]);

  if (!ensemble) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Название: {ensemble.name}</h2>
      <h2>Дата формирования: {ensemble.formation_date}</h2>
      <h2>Описание: {ensemble.description}</h2>

      <h3>Музыканты:</h3>
      <ul>
        {ensemble.musicians.map((m) => (
          <li key={m.id}>
            <Link to={`/musician/${m.id}`}>{m.full_name}</Link>
          </li>
        ))}
      </ul>

      {ensemble.compositions && (
        <>
          <h3>Композиции ансамбля:</h3>
          <ul>
            {ensemble.compositions.map((c) => (
              <li key={c.id}>
                <Link to={`/compositions/${c.id}`}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default EnsembleDetails;
