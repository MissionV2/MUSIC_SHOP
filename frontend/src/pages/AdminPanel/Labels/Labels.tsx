import React, { useEffect, useState } from "react";
import { createLabel, updateLabel, deleteLabel, getAllLabels, Label } from "../../../api/adminendpoints/labels";
export default function Labels() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [form, setForm] = useState<Omit<Label, "id">>({ name: "", address: "", is_wholesaler: false });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    getAllLabels().then(setLabels);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateLabel(editId, form);
    } else {
      await createLabel(form);
    }
    setForm({ name: "", address: "", is_wholesaler: false });
    setEditId(null);
    getAllLabels().then(setLabels);
  };

  const handleEdit = (label: Label) => {
    setForm(label);
    setEditId(label.id);
  };

  const handleDelete = async (id: number) => {
    await deleteLabel(id);
    getAllLabels().then(setLabels);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Лейблы</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-col">
        <h2>Название (name) — название лейбла</h2>
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Название"
          className="border px-2"
        />

        <h2>Адрес (address) — адрес лейбла</h2>
        <input
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          placeholder="Адрес"
          className="border px-2"
        />

        <h2>Оптовик (is_wholesaler) — является ли лейбл оптовиком</h2>
        <label>
          <input
            type="checkbox"
            checked={form.is_wholesaler}
            onChange={e => setForm({ ...form, is_wholesaler: e.target.checked })}
          /> Оптовик
        </label>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {editId ? "Сохранить" : "Добавить"}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ name: "", address: "", is_wholesaler: false }); }}>
            Отмена
          </button>
        )}
      </form>
      <ul>
        {labels.map(label => (
          <li key={label.id} className="flex gap-2 items-center mb-2">
            <span>{label.name} ({label.address}) {label.is_wholesaler ? "— оптовик" : ""}</span>
            <button onClick={() => handleEdit(label)} className="bg-yellow-500 px-2 rounded">Редактировать</button>
            <button onClick={() => handleDelete(label.id)} className="bg-red-600 text-white px-2 rounded">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}