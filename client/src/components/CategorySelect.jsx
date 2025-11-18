import { useEffect, useState } from "react";
import { categoryService } from "../services/api";

export default function CategorySelect({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService.getAllCategories().then((data) => {
      setCategories(data.categories || data);
    });
  }, []);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select category</option>
      {categories.map((c) => (
        <option key={c._id} value={c._id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
