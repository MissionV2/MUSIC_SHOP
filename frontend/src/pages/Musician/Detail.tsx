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
    <div>
      <h2>Имя: {musician.full_name}</h2>
      <p><b>Дата рождения:</b> {musician.birth_date}</p>
      <p><b>Дата смерти:</b> {musician.death_date}</p>
      <p><b>Национальность:</b> {musician.nationality}</p>
      <p><b>Биография:</b> {musician.bio}</p>
    </div>
  );
};

export default MusicianDetails;