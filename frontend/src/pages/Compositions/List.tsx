import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCompositions } from "../../api/endpoints/compositions";

interface Composition {
  id: number;
  title: string;
  // другие поля
}

const CompositionsList: React.FC = () => {
  const [compositions, setCompositions] = useState<Composition[]>([]);

  useEffect(() => {
    getCompositions().then((res: { data: Composition[] }) => setCompositions(res.data));
  }, []);

  return (
    <div>
      <h2>Список композиций</h2>
      <ul>
        {compositions.map((composition) => (
          <li key={composition.id}>
            <Link to={`/compositions/${composition.id}`}>
              {composition.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompositionsList;