import React, { useEffect, useState } from "react";
import { createMusician, updateMusician, deleteMusician, getAllMusicians, Musician } from "../../../api/adminendpoints/musicians";

export default function Musicians() {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [form, setForm] = useState<Omit<Musician, "id">>({
    full_name: "",
    birth_date: "",
    death_date: "",
    nationality: "",
    bio: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    getAllMusicians().then(setMusicians);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateMusician(editId, form);
    } else {
      await createMusician(form);
    }
    setForm({
      full_name: "",
      birth_date: "",
      death_date: "",
      nationality: "",
      bio: "",
    });
    setEditId(null);
    getAllMusicians().then(setMusicians);
  };

  const handleEdit = (musician: Musician) => {
    setForm({
      full_name: musician.full_name,
      birth_date: musician.birth_date,
      death_date: musician.death_date,
      nationality: musician.nationality,
      bio: musician.bio,
    });
    setEditId(musician.id);
  };

  const handleDelete = async (id: number) => {
    await deleteMusician(id);
    getAllMusicians().then(setMusicians);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Музыканты</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-col">
        <h2>ФИО (full_name) — полное имя музыканта</h2>
        <input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} placeholder="ФИО" className="border px-2" />

        <h2>Дата рождения (birth_date) — дата рождения музыканта</h2>
        <input value={form.birth_date} onChange={e => setForm({ ...form, birth_date: e.target.value })} placeholder="Дата рождения" type="date" className="border px-2" />

        <h2>Дата смерти (death_date) — дата смерти музыканта (если применимо)</h2>
        <input value={form.death_date} onChange={e => setForm({ ...form, death_date: e.target.value })} placeholder="Дата смерти" type="date" className="border px-2" />

        <h2>Национальность (nationality) — страна или национальность музыканта</h2>
        <input value={form.nationality} onChange={e => setForm({ ...form, nationality: e.target.value })} placeholder="Национальность" className="border px-2" />

        <h2>Биография (bio) — краткая биография музыканта</h2>
        <input value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Биография" className="border px-2" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{editId ? "Сохранить" : "Добавить"}</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({
                full_name: "",
                birth_date: "",
                death_date: "",
                nationality: "",
                bio: "",
              });
            }}
          >
            Отмена
          </button>
        )}
      </form>
      <ul>
        {musicians.map(musician => (
          <li key={musician.id} className="flex gap-2 items-center mb-2">
            <span>
              {musician.full_name} | {musician.birth_date} - {musician.death_date} | {musician.nationality} | {musician.bio}
            </span>
            <button onClick={() => handleEdit(musician)} className="bg-yellow-500 px-2 rounded">Редактировать</button>
            <button onClick={() => handleDelete(musician.id)} className="bg-red-600 text-white px-2 rounded">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}