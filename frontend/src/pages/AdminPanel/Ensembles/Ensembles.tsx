import React, { useEffect, useState } from "react";
import { createEnsemble, updateEnsemble, deleteEnsemble, getAllEnsembles, Ensemble } from "../../../api/adminendpoints/ensembles";

export default function Ensembles() {
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [form, setForm] = useState<Omit<Ensemble, "id">>({ name: "", formation_date: "", description: "" });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    getAllEnsembles().then(setEnsembles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.formation_date) {
      alert("Выберите дату основания!");
      return;
    }
    if (editId) {
      await updateEnsemble(editId, form);
    } else {
      await createEnsemble(form);
    }
    setForm({ name: "", formation_date: "", description: "" });
    setEditId(null);
    getAllEnsembles().then(setEnsembles);
  };

  const handleEdit = (ensemble: Ensemble) => {
    setForm({
      name: ensemble.name,
      formation_date: ensemble.formation_date,
      description: ensemble.description,
    });
    setEditId(ensemble.id);
  };

  const handleDelete = async (id: number) => {
    await deleteEnsemble(id);
    getAllEnsembles().then(setEnsembles);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Ансамбли</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
        <h2>Название (name) — название ансамбля</h2>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Название" className="border px-2" />

        <h2>Дата основания (formation_date) — дата создания ансамбля</h2>
        <input
          value={form.formation_date}
          onChange={e => setForm({ ...form, formation_date: e.target.value })}
          placeholder="Дата основания"
          type="date"
          className="border px-2"
        />

        <h2>Описание (description) — краткое описание ансамбля</h2>
        <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Описание" className="border px-2" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{editId ? "Сохранить" : "Добавить"}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ name: "", formation_date: "", description: "" }); }}>Отмена</button>}
      </form>
      <ul>
        {ensembles.map(ensemble => (
          <li key={ensemble.id} className="flex gap-2 items-center mb-2">
            <span>{ensemble.name} ({ensemble.formation_date}) — {ensemble.description}</span>
            <button onClick={() => handleEdit(ensemble)} className="bg-yellow-500 px-2 rounded">Редактировать</button>
            <button onClick={() => handleDelete(ensemble.id)} className="bg-red-600 text-white px-2 rounded">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}