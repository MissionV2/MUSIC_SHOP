import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMusicianById } from "../../api/endpoints/musicians";

interface Musician {
  id: number;
  full_name: string;
  birth_date: string;
  death_date: string;
  nationality: string;
  bio: string;
}

const MusicianDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [musician, setMusician] = useState<Musician | null>(null);

  useEffect(() => {
    if (id) {
      getMusicianById(Number(id)).then((res: { data: Musician }) => setMusician(res.data));
    }
  }, [id]);

  if (!musician) return <div>Загрузка...</div>;

  return (
    <div className="uppercase px-4 md:px-32 sm:px-5 flex flex-col gap-4 md:flex-row sm:felx-col justify-between pt-5">
      <div className="flex flex-col gap-2">
        <h2 className="w-full text-center text-3xl pb-5">{musician.full_name}</h2>
        <p><b>Дата рождения:</b> {musician.birth_date}</p>
        <p><b>Дата смерти:</b> {musician.death_date}</p>
        <p><b>Национальность:</b> {musician.nationality}</p>
      </div>
      <div className="">
        <p><b>Биография:</b></p>
        <p>{musician.bio}</p>
      </div>
    </div>
  );
};

export default MusicianDetails;