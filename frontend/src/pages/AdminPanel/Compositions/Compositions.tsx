import React, { useEffect, useState } from "react";
import { createComposition, updateComposition, deleteComposition, getAllCompositions, Composition } from "../../../api/adminendpoints/compositions";

export default function Compositions() {
  const [compositions, setCompositions] = useState<Composition[]>([]);
  const [form, setForm] = useState<Omit<Composition, "id">>({ title: "", year: 2020, genre: "", duration: 0, ensemble_id: 1 });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    getAllCompositions().then(setCompositions);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateComposition(editId, form);
    } else {
      await createComposition(form);
    }
    setForm({ title: "", year: 2020, genre: "", duration: 0, ensemble_id: 1 });
    setEditId(null);
    getAllCompositions().then(setCompositions);
  };

  const handleEdit = (composition: Composition) => {
    setForm(composition);
    setEditId(composition.id);
  };

  const handleDelete = async (id: number) => {
    await deleteComposition(id);
    getAllCompositions().then(setCompositions);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Композиции</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
        <h2>Название (title) — название композиции</h2>
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Название" className="border px-2" />

        <h2>Год (year) — год создания композиции</h2>
        <input value={form.year} onChange={e => setForm({ ...form, year: +e.target.value })} placeholder="Год" type="number" className="border px-2" />

        <h2>Жанр (genre) — музыкальный жанр композиции</h2>
        <input value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} placeholder="Жанр" className="border px-2" />

        <h2>Длительность (duration) — длительность композиции в секундах</h2>
        <input value={form.duration} onChange={e => setForm({ ...form, duration: +e.target.value })} placeholder="Длительность (сек)" type="number" className="border px-2" />

        <h2>ID ансамбля (ensemble_id) — идентификатор ансамбля</h2>
        <input value={form.ensemble_id} onChange={e => setForm({ ...form, ensemble_id: +e.target.value })} placeholder="ID ансамбля" type="number" className="border px-2" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{editId ? "Сохранить" : "Добавить"}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: "", year: 2020, genre: "", duration: 0, ensemble_id: 1 }); }}>Отмена</button>}
      </form>
      <ul>
        {compositions.map(composition => (
          <li key={composition.id} className="flex gap-2 items-center mb-2">
            <span>{composition.title} ({composition.year}, {composition.genre})</span>
            <button onClick={() => handleEdit(composition)} className="bg-yellow-500 px-2 rounded">Редактировать</button>
            <button onClick={() => handleDelete(composition.id)} className="bg-red-600 text-white px-2 rounded">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}