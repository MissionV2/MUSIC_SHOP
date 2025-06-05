import React, { useEffect, useState } from "react";
import { createRecord, updateRecord, deleteRecord, getAllRecords, RecordType } from "../../../api/adminendpoints/records";

export default function Records() {
  const [records, setRecords] = useState<RecordType[]>([]);
  const [form, setForm] = useState<Omit<RecordType, "id">>({
    catalog_number: "",
    title: "",
    release_date: "",
    wholesale_price: 0,
    retail_price: 0,
    stock_quantity: 0,
    sales_current_year: 0,
    sales_previous_year: 0,
    label_id: 1,
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    getAllRecords().then(setRecords);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateRecord(editId, form);
    } else {
      await createRecord(form);
    }
    setForm({
      catalog_number: "",
      title: "",
      release_date: "",
      wholesale_price: 0,
      retail_price: 0,
      stock_quantity: 0,
      sales_current_year: 0,
      sales_previous_year: 0,
      label_id: 1,
    });
    setEditId(null);
    getAllRecords().then(setRecords);
  };

  const handleEdit = (record: RecordType) => {
    setForm({ ...record });
    setEditId(record.id);
  };

  const handleDelete = async (id: number) => {
    await deleteRecord(id);
    getAllRecords().then(setRecords);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Пластинки</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-col">
        <h2>Каталожный номер (catalog_number) — уникальный номер пластинки</h2>
        <input value={form.catalog_number} onChange={e => setForm({ ...form, catalog_number: e.target.value })} placeholder="Каталожный номер" className="border px-2" />

        <h2>Название (title) — название пластинки</h2>
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Название" className="border px-2" />

        <h2>Дата выпуска (release_date) — дата выхода пластинки</h2>
        <input value={form.release_date} onChange={e => setForm({ ...form, release_date: e.target.value })} placeholder="Дата выпуска" type="date" className="border px-2" />

        <h2>Оптовая цена (wholesale_price) — цена для оптовых покупателей</h2>
        <input value={form.wholesale_price} onChange={e => setForm({ ...form, wholesale_price: +e.target.value })} placeholder="Оптовая цена" type="number" className="border px-2" />

        <h2>Розничная цена (retail_price) — цена для розничных покупателей</h2>
        <input value={form.retail_price} onChange={e => setForm({ ...form, retail_price: +e.target.value })} placeholder="Розничная цена" type="number" className="border px-2" />

        <h2>В наличии (stock_quantity) — количество пластинок на складе</h2>
        <input value={form.stock_quantity} onChange={e => setForm({ ...form, stock_quantity: +e.target.value })} placeholder="В наличии" type="number" className="border px-2" />

        <h2>Продано в этом году (sales_current_year) — количество продаж за текущий год</h2>
        <input value={form.sales_current_year} onChange={e => setForm({ ...form, sales_current_year: +e.target.value })} placeholder="Продано в этом году" type="number" className="border px-2" />

        <h2>Продано в прошлом году (sales_previous_year) — количество продаж за прошлый год</h2>
        <input value={form.sales_previous_year} onChange={e => setForm({ ...form, sales_previous_year: +e.target.value })} placeholder="Продано в прошлом году" type="number" className="border px-2" />

        <h2>ID лейбла (label_id) — идентификатор лейбла</h2>
        <input value={form.label_id} onChange={e => setForm({ ...form, label_id: +e.target.value })} placeholder="ID лейбла" type="number" className="border px-2" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{editId ? "Сохранить" : "Добавить"}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ ...form, catalog_number: "", title: "", release_date: "", wholesale_price: 0, retail_price: 0, stock_quantity: 0, sales_current_year: 0, sales_previous_year: 0, label_id: 1 }); }}>Отмена</button>}
      </form>
      <ul>
        {records.map(record => (
          <li key={record.id} className="flex gap-2 items-center mb-2">
            <span>{record.title} ({record.catalog_number})</span>
            <button onClick={() => handleEdit(record)} className="bg-yellow-500 px-2 rounded">Редактировать</button>
            <button onClick={() => handleDelete(record.id)} className="bg-red-600 text-white px-2 rounded">Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}