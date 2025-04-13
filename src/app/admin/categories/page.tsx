"use client";

import { useEffect, useState } from "react";

export default function ManageCategories() {
  const [categories, setCategories] = useState<
    { id: string; name: string; slug: string }[]
  >([]);
  const [newCategory, setNewCategory] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return alert("نام دسته‌بندی را وارد کنید!");

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory, slug }),
    });

    if (response.ok) {
      const addedCategory = await response.json();
      setCategories([...categories, addedCategory]);
      setNewCategory("");
      setSlug("");
      alert("✅ دسته‌بندی جدید اضافه شد!");
    } else {
      alert("❌ خطا در اضافه کردن دسته‌بندی");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg space-y-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          📂 مدیریت دسته‌بندی‌ها
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          <input
            type="text"
            placeholder="نام دسته‌بندی جدید"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="اسلاگ (اختیاری)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            ➕ افزودن
          </button>
        </form>
        <ul className="mt-4 space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="border p-3 rounded-lg bg-gray-50 flex justify-between items-center shadow"
            >
              <span className="text-gray-800 font-medium">
                {category.name} ({category.slug})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
