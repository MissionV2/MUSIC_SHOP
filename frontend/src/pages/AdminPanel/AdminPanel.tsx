import { Link } from "react-router-dom";

export default function AdminPanel() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-2xl font-bold mb-4">Админ-панель</h2>
      <Link to="/admin/labels" className="bg-black text-white px-4 py-2 rounded">Лейблы</Link>
      <Link to="/admin/musicians" className="bg-black text-white px-4 py-2 rounded">Музыканты</Link>
      <Link to="/admin/compositions" className="bg-black text-white px-4 py-2 rounded">Композиции</Link>
      <Link to="/admin/ensembles" className="bg-black text-white px-4 py-2 rounded">Ансамбли</Link>
      <Link to="/admin/records" className="bg-black text-white px-4 py-2 rounded">Пластинки</Link>
    </div>
  );
}