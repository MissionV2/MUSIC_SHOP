import React, { useEffect, useState } from "react";
import { createEnsemble, updateEnsemble, deleteEnsemble, getAllEnsembles, Ensemble } from "../../../api/adminendpoints/ensembles";

export default function Ensembles() {
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [form, setForm] = useState<Omit<Ensemble, "id">>({ name: "", city: "", foundation_year: 2020 });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    getAllEnsembles().then(setEnsembles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateEnsemble(editId, form);
    } else {
      await createEnsemble(form);
    }
    setForm({ name: "", city: "", foundation_year: 2020 });
    setEditId(null);
    getAllEnsembles().then(setEnsembles);
  };

  const handleEdit = (ensemble: Ensemble) => {
    setForm(ensemble);
    setEditId(ensemble.id);
  };

  const handleDelete = async (id: number) => {
    await deleteEnsemble(id);
    getAllEnsembles().then(setEnsembles);
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Ансамбли</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Название" className="border px-2" />
        <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Город" className="border px-2" />
        <input value={form.foundation_year} onChange={e => setForm({ ...form, foundation_year: +e.target.value })} placeholder="Год основания" type="number" className="border px-2" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{editId ? "Сохранить" : "Добавить"}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ name: "", city: "", foundation_year: 2020 }); }}>Отмена</button>}
      </form>
      <ul>
        {ensembles.map(ensemble => (
          <li key={ensemble.id} className="flex gap-2 items-center mb-2">
            <span>{ensemble.name} ({ensemble.city}, {ensemble.foundation_year})</span>
            <button onClick={() => handleEdit(ensemble)} className="bg-yellow-500 px-2 rounded">Редактировать</button>
            <button onClick={() => handleDelete(ensemble.id)} className="bg-red-600 text-white px-2 rounded">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}