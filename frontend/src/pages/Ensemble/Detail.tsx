import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEnsembleById } from "../../api/endpoints/ensembles";
import person from '../../assets/person-placeholder 1.png'
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
    <div className="uppercase flex justify-between flex-col gap-4 md:flex-row sm:flex-col sm:gap-4 px-4 md:px-32 sm:px-5 pt-5">
      <div className="flex flex-col gap-2">
          <h2 className="w-full text-center text-3xl pb-5">{ensemble.name}</h2>
          <h2>Дата формирования: {ensemble.formation_date}</h2>
          <h2>Описание: {ensemble.description}</h2>
      </div>
      <div>
          <h3>Музыканты:</h3>
          <ul className="grid grid-cols-2 gap-2">
            {ensemble.musicians.map((m) => (
              <li key={m.id} className="bg-[#3F3434] pb-3">
                <Link to={`/musician/${m.id}`}>
                    <img src={person} alt="" />
                    <p className="w-full text-center pt-3">{m.full_name}</p>
                </Link>
              </li>
            ))}
          </ul>
      </div>

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
